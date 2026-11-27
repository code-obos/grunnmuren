import { GrunnmurenProvider } from '@obosbbl/grunnmuren-react';
import type { ReactNode } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { expect, test } from 'vitest';

import { createGrunnmurenFormHook } from '../create-grunnmuren-form-hook';
import { Checkbox, ComboboxItem, Radio, SelectItem } from '../index';
import type { Locale } from '../locale';
import { TextInput } from './text-field';

const hook = createGrunnmurenFormHook();

type FieldName = 'phone' | 'email' | 'first' | 'last' | 'id' | 'birth';

function renderDomain(locale: Locale | null, name: FieldName) {
  const { useAppForm } = hook;
  function Test() {
    const form = useAppForm({
      defaultValues: { phone: '', email: '', first: '', last: '', id: '', birth: '' },
    });
    return (
      <form.AppForm>
        <form.Form>
          <form.Field name={name}>
            {(field) => {
              switch (name) {
                case 'phone':
                  return <field.PhoneField />;
                case 'email':
                  return <field.EmailField />;
                case 'first':
                  return <field.FirstNameField />;
                case 'last':
                  return <field.LastNameField />;
                case 'id':
                  return <field.NationalIdNumberField />;
                case 'birth':
                  return <field.BirthDateField />;
              }
            }}
          </form.Field>
        </form.Form>
      </form.AppForm>
    );
  }
  return renderToStaticMarkup(locale ? withLocale(locale, <Test />) : <Test />);
}

function withLocale(locale: Locale, children: ReactNode) {
  return <GrunnmurenProvider locale={locale}>{children}</GrunnmurenProvider>;
}

test.each([
  ['nb', 'Mobil'],
  ['en', 'Mobile number'],
] as const)('PhoneField %s: label, +47 addon, tel attributes', (locale, label) => {
  const html = renderDomain(locale, 'phone');
  expect(html).toContain(label);
  expect(html).toContain('+47');
  expect(html).toContain('type="tel"');
  expect(html).toContain('inputMode="tel"');
  expect(html).toContain('autoComplete="tel-national"');
  expect(html).toContain('size="11"');
  expect(html).toContain('name="phone"');
});

test('PhoneField sv: Mobilnummer and no addon', () => {
  const html = renderDomain('sv', 'phone');
  expect(html).toContain('Mobilnummer');
  expect(html).not.toContain('+47');
});

test.each([
  ['nb', 'email', 'E-post', 'type="email"', 'autoComplete="email"'],
  ['sv', 'email', 'E-post', 'type="email"', 'autoComplete="email"'],
  ['en', 'email', 'E-mail', 'type="email"', 'autoComplete="email"'],
  ['nb', 'first', 'Fornavn og mellomnavn', '', 'autoComplete="given-name"'],
  ['sv', 'first', 'Förnamn', '', 'autoComplete="given-name"'],
  ['en', 'first', 'First and middle name', '', 'autoComplete="given-name"'],
  ['nb', 'last', 'Etternavn', '', 'autoComplete="family-name"'],
  ['sv', 'last', 'Efternamn', '', 'autoComplete="family-name"'],
  ['en', 'last', 'Last name', '', 'autoComplete="family-name"'],
  ['nb', 'birth', 'Fødselsdato', 'type="date"', 'autoComplete="bday"'],
  ['sv', 'birth', 'Födelsedatum', 'type="date"', 'autoComplete="bday"'],
  ['en', 'birth', 'Date of birth', 'type="date"', 'autoComplete="bday"'],
] as const)(
  '%s %s field renders label and attributes',
  (locale, name, label, type, autoComplete) => {
    const html = renderDomain(locale, name);
    expect(html).toContain(label);
    expect(html).toContain(type);
    expect(html).toContain(autoComplete);
  },
);

test.each([
  ['nb', 'Fødsels- og personnummer', '11 siffer'],
  ['en', 'National identity number', '11 digits'],
] as const)('NationalIdNumberField %s: Norwegian rules, numeric', (locale, label, description) => {
  const html = renderDomain(locale, 'id');
  expect(html).toContain(label);
  expect(html).toContain(description);
  expect(html).toContain('inputMode="numeric"');
  expect(html).toContain('size="12"');
  expect(html).toContain('autoComplete="off"');
});

test('NationalIdNumberField sv: Personnummer, format hint, no numeric mode', () => {
  const html = renderDomain('sv', 'id');
  expect(html).toContain('Personnummer');
  expect(html).toContain('ÅÅÅÅMMDD-XXXX');
  expect(html).not.toContain('inputMode');
  expect(html).toContain('size="13"');
});

test.each([
  ['nb', 'Datovelger'],
  ['sv', 'Datumväljare'],
  ['en', 'Date picker'],
] as const)('BirthDateField %s: sr-only hint linked with aria-describedby', (locale, hint) => {
  const html = renderDomain(locale, 'birth');
  const hintId = html.match(/<span id="([^"]+)" class="sr-only">/)?.[1];
  expect(hintId).toBeTruthy();
  expect(html).toContain(hint);
  expect(html).toContain(`>${hint}</span>`);
  expect(html).toMatch(new RegExp(`aria-describedby="[^"]*${hintId}`));
  expect(html).toContain('size="10"');
  expect(html).toContain('min-w-32');
});

test.each([
  ['nb', 'Fornavn og mellomnavn', 'Etternavn'],
  ['sv', 'Förnamn', 'Efternamn'],
  ['en', 'First and middle name', 'Last name'],
] as const)('NameFields %s: both inputs bound to the given paths', (locale, first, last) => {
  const { useAppForm, NameFields } = hook;
  function Test() {
    const form = useAppForm({ defaultValues: { guardian: { given: 'Ola', family: '' } } });
    return (
      <NameFields
        form={form}
        fields={{ firstName: 'guardian.given', lastName: 'guardian.family' }}
      />
    );
  }
  const html = renderToStaticMarkup(withLocale(locale, <Test />));
  expect(html).toContain(first);
  expect(html).toContain(last);
  expect(html).toContain('name="guardian.given"');
  expect(html).toContain('name="guardian.family"');
  expect(html).toContain('value="Ola"');
  expect(html).toContain('autoComplete="given-name"');
  expect(html).toContain('autoComplete="family-name"');
  expect(html).toContain('required');
});

test('NameFields: autoComplete opt-out and optional', () => {
  const { useAppForm, NameFields } = hook;
  function Test() {
    const form = useAppForm({ defaultValues: { firstName: '', lastName: '' } });
    return <NameFields form={form} autoComplete={false} isRequired={false} />;
  }
  const html = renderToStaticMarkup(withLocale('nb', <Test />));
  expect(html).not.toContain('autoComplete');
  expect(html).not.toContain('aria-required');
});

test.each([
  ['nb', 'Vedlegg', 'Last opp'],
  ['sv', 'Bilagor', 'Ladda upp'],
  ['en', 'Attachments', 'Upload'],
] as const)('FileField %s: default label and button text', (locale, label, button) => {
  const { useAppForm } = hook;
  function Test() {
    const form = useAppForm({ defaultValues: { files: [] as File[] } });
    return (
      <form.Field name="files">
        {(f) => <f.FileField acceptedFileTypes={['application/pdf']} allowsMultiple />}
      </form.Field>
    );
  }
  const html = renderToStaticMarkup(withLocale(locale, <Test />));
  expect(html).toContain(label);
  expect(html).toContain(button);
  expect(html).toContain('type="file"');
  expect(html).toContain('accept="application/pdf"');
  expect(html).toContain('multiple');
  expect(html).toContain('name="files"');
});

test('FileField: label, description and button text are overridable', () => {
  const { useAppForm } = hook;
  function Test() {
    const form = useAppForm({ defaultValues: { files: [] as File[] } });
    return (
      <form.Field name="files">
        {(f) => <f.FileField label="Legitimasjon" description="Maks 5 MB" buttonText="Velg fil" />}
      </form.Field>
    );
  }
  const html = renderToStaticMarkup(withLocale('nb', <Test />));
  expect(html).toContain('Legitimasjon');
  expect(html).toContain('Maks 5 MB');
  expect(html).toContain('Velg fil');
});

test('generic fields render for every value kind', () => {
  const { useAppForm } = hook;
  function Test() {
    const form = useAppForm({
      defaultValues: {
        text: 'hei',
        area: 'lang tekst',
        count: null as number | null,
        agree: true,
        tags: ['a'],
        choice: 'b',
        pick: '',
        search: '',
        date: '2020-01-02',
      },
    });
    return (
      <form.AppForm>
        <form.Field name="text">{(f) => <f.TextField label="Tekst" />}</form.Field>
        <form.Field name="area">{(f) => <f.TextAreaField label="Område" />}</form.Field>
        <form.Field name="count">{(f) => <f.NumberField label="Antall" />}</form.Field>
        <form.Field name="agree">{(f) => <f.CheckboxField>Godtar</f.CheckboxField>}</form.Field>
        <form.Field name="tags">
          {(f) => (
            <f.CheckboxGroupField label="Tagger">
              <Checkbox value="a">A</Checkbox>
            </f.CheckboxGroupField>
          )}
        </form.Field>
        <form.Field name="choice">
          {(f) => (
            <f.RadioGroupField label="Valg">
              <Radio value="a">A</Radio>
              <Radio value="b">B</Radio>
            </f.RadioGroupField>
          )}
        </form.Field>
        <form.Field name="pick">
          {(f) => (
            <f.SelectField label="Velg">
              <SelectItem id="x">X</SelectItem>
            </f.SelectField>
          )}
        </form.Field>
        <form.Field name="search">
          {(f) => (
            <f.ComboboxField label="Søk">
              <ComboboxItem id="x">X</ComboboxItem>
            </f.ComboboxField>
          )}
        </form.Field>
        <form.Field name="date">{(f) => <f.DateField label="Dato" />}</form.Field>
        <form.SubmitButton>Send</form.SubmitButton>
      </form.AppForm>
    );
  }
  const html = renderToStaticMarkup(withLocale('nb', <Test />));
  expect(html).toContain('value="hei"');
  expect(html).toContain('lang tekst');
  expect(html).toContain('Antall');
  expect(html).toContain('Godtar');
  expect(html).toContain('name="tags"');
  expect(html).toContain('name="choice"');
  expect(html).toContain('Velg');
  expect(html).toContain('Søk');
  expect(html).toContain('value="2020-01-02"');
  expect(html).toContain('type="submit"');
  expect(html).toContain('Send');
});

test('consumer overrides a field component and a form component', () => {
  const { useAppForm } = createGrunnmurenFormHook({
    fieldComponents: {
      PhoneField: () => <span>custom phone</span>,
      ExtraField: () => <span>extra</span>,
    },
    formComponents: {
      Form: ({ children }: { children: React.ReactNode }) => (
        <section data-custom-form>{children}</section>
      ),
    },
  });
  function Test() {
    const form = useAppForm({ defaultValues: { phone: '' } });
    return (
      <form.AppForm>
        <form.Form>
          <form.Field name="phone">{(f) => <f.PhoneField />}</form.Field>
        </form.Form>
      </form.AppForm>
    );
  }
  const html = renderToStaticMarkup(<Test />);
  expect(html).toContain('custom phone');
  expect(html).toContain('data-custom-form');
  expect(html).not.toContain('<form');
});

test('field components are matched to the value type', () => {
  const { useAppForm } = hook;
  function Test() {
    const form = useAppForm({ defaultValues: { agree: false } });
    return (
      <form.Field name="agree">
        {(f) => (
          <>
            {/* @ts-expect-error PhoneField only exists on string fields */}
            <f.PhoneField />
            <f.CheckboxField>ok</f.CheckboxField>
          </>
        )}
      </form.Field>
    );
  }
  expect(Test).toBeTypeOf('function');
});

test('TextField: consumer onChange and onBlur run after the form handlers', () => {
  const calls: string[] = [];
  const field = {
    name: 'name',
    value: '',
    errors: [],
    handleChange: (value: string) => calls.push(`form change ${value}`),
    handleBlur: () => calls.push('form blur'),
  } as unknown as Parameters<typeof TextInput>[0]['field'];
  const element = TextInput({
    field,
    label: 'Navn',
    onChange: (value) => calls.push(`consumer change ${value}`),
    onBlur: () => calls.push('consumer blur'),
  });
  element.props.onChange('a');
  element.props.onBlur({});
  expect(calls).toEqual(['form change a', 'consumer change a', 'form blur', 'consumer blur']);
});

test('event props are accepted on every field', () => {
  const { useAppForm } = hook;
  function Test() {
    const form = useAppForm({
      defaultValues: { text: '', num: null as number | null, on: false, many: [] as string[] },
    });
    return (
      <>
        <form.Field name="text">
          {(f) => (
            <>
              <f.TextField label="a" onChange={(v: string) => v} onBlur={() => {}} />
              <f.TextAreaField label="a" onChange={(v: string) => v} onBlur={() => {}} />
              <f.RadioGroupField label="a" onChange={(v: string) => v} onBlur={() => {}}>
                <Radio value="a">A</Radio>
              </f.RadioGroupField>
              <f.PhoneField onChange={(v: string) => v} onBlur={() => {}} />
              <f.SelectField label="a" onSelectionChange={() => {}} onBlur={() => {}}>
                <SelectItem id="a">A</SelectItem>
              </f.SelectField>
              <f.ComboboxField label="a" onSelectionChange={() => {}} onBlur={() => {}}>
                <ComboboxItem id="a">A</ComboboxItem>
              </f.ComboboxField>
            </>
          )}
        </form.Field>
        <form.Field name="num">
          {(f) => <f.NumberField label="a" onChange={(v: number) => v} onBlur={() => {}} />}
        </form.Field>
        <form.Field name="on">
          {(f) => (
            <f.CheckboxField onChange={(v: boolean) => v} onBlur={() => {}}>
              ok
            </f.CheckboxField>
          )}
        </form.Field>
        <form.Field name="many">
          {(f) => (
            <f.CheckboxGroupField label="a" onChange={(v: string[]) => v}>
              <Checkbox value="a">A</Checkbox>
            </f.CheckboxGroupField>
          )}
        </form.Field>
      </>
    );
  }
  expect(Test).toBeTypeOf('function');
});

test('validationBehavior is owned by the form', () => {
  const { useAppForm } = hook;
  function Test() {
    const form = useAppForm({ defaultValues: { text: '' } });
    return (
      <form.Field name="text">
        {(f) => (
          <>
            {/* @ts-expect-error validationBehavior is forced to "aria" */}
            <f.TextField label="a" validationBehavior="native" />
            {/* @ts-expect-error validationBehavior is forced to "aria" */}
            <f.PhoneField validationBehavior="native" />
          </>
        )}
      </form.Field>
    );
  }
  expect(Test).toBeTypeOf('function');
});

test('FileField: other FileUpload props pass through', () => {
  const { useAppForm } = hook;
  function Test() {
    const form = useAppForm({ defaultValues: { files: [] as File[] } });
    return (
      <form.Field name="files">
        {(f) => <f.FileField title="Last opp vedlegg" onChange={() => {}} />}
      </form.Field>
    );
  }
  expect(renderToStaticMarkup(withLocale('nb', <Test />))).toContain('title="Last opp vedlegg"');
});

test('BirthDateField: merges consumer aria-describedby with the hint id', () => {
  const { useAppForm } = hook;
  function Test() {
    const form = useAppForm({ defaultValues: { birth: '' } });
    return (
      <form.Field name="birth">
        {(f) => <f.BirthDateField aria-describedby="extra-id" />}
      </form.Field>
    );
  }
  const html = renderToStaticMarkup(withLocale('nb', <Test />));
  const hintId = html.match(/<span id="([^"]+)" class="sr-only">/)?.[1];
  expect(html).toContain(`${hintId} extra-id"`);
});

test('Form: passes <form> attributes and chains onSubmit', () => {
  const { useAppForm } = hook;
  function Test() {
    const form = useAppForm({ defaultValues: { text: '' } });
    return (
      <form.AppForm>
        <form.Form aria-label="Skjema" id="f" onSubmit={() => {}} className="grid gap-2">
          x
        </form.Form>
      </form.AppForm>
    );
  }
  const html = renderToStaticMarkup(<Test />);
  expect(html).toContain('<form aria-label="Skjema" id="f" noValidate=""');
  expect(html).toContain('<div class="grid gap-2">');
});
