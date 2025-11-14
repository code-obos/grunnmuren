import type { Meta } from '@storybook/react-vite';
import {
  UNSAFE_LinkList as LinkList,
  UNSAFE_LinkListContainer as LinkListContainer,
  UNSAFE_LinkListItem as LinkListItem,
} from './link-list';

const meta: Meta<typeof LinkList> = {
  title: 'LinkList',
  component: LinkList,

  tags: ['autodocs'],
};

export default meta;

export const Default = () => (
  <LinkList>
    <LinkListItem href="/bolig">Bolig</LinkListItem>
    <LinkListItem href="/bank">Bank</LinkListItem>
    <LinkListItem href="/medlem">Medlem</LinkListItem>
  </LinkList>
);

export const Download = () => (
  <LinkList>
    <LinkListItem download href="/">
      Medlemsvilkår
    </LinkListItem>
    <LinkListItem download href="/about">
      Samtykke
    </LinkListItem>
  </LinkList>
);
export const ExternalLinkListItems = () => (
  <LinkList>
    <LinkListItem href="/forsikring">Forsikring</LinkListItem>
    <LinkListItem
      href="https://www.tryg.no/forsikringer/fordeler-hos-tryg/bruk-medlemsfordelene-dine/obos/index.html?cmpid=obos_tryggjennomlivet"
      isExternal
      target="_blank"
    >
      Les mer om trygg forsikring
    </LinkListItem>
  </LinkList>
);

export const AutoResponsive = () => (
  <div className="grid gap-y-8">
    <LinkListContainer>
      <LinkList>
        <LinkListItem download href="/">
          Medlemsvilkår
        </LinkListItem>
        <LinkListItem download href="/about">
          Samtykke
        </LinkListItem>
      </LinkList>
    </LinkListContainer>
    <LinkListContainer>
      <LinkList>
        <LinkListItem href="/bolig">Bolig</LinkListItem>
        <LinkListItem href="/bank">Bank</LinkListItem>
        <LinkListItem href="/medlem">Medlem</LinkListItem>
      </LinkList>
    </LinkListContainer>
    <LinkListContainer>
      <LinkList>
        <LinkListItem href="/konsernledelsen">Konsernledelsen</LinkListItem>
        <LinkListItem href="/styret">Styret</LinkListItem>
        <LinkListItem href="/representantskapet">
          Representantskapet
        </LinkListItem>
        <LinkListItem href="/boligpriser-og-statistikk">
          Boligpriser og statistikk
        </LinkListItem>
        <LinkListItem href="/investor-relations">
          Investor Relations
        </LinkListItem>
      </LinkList>
    </LinkListContainer>
    <LinkListContainer>
      <LinkList>
        <LinkListItem href="/konsernledelsen">Konsernledelsen</LinkListItem>
        <LinkListItem href="/styret">Styret</LinkListItem>
        <LinkListItem href="/representantskapet">
          Representantskapet
        </LinkListItem>
        <LinkListItem href="/boligpriser-og-statistikk">
          Boligpriser og statistikk
        </LinkListItem>
        <LinkListItem href="/investor-relations">
          Investor Relations
        </LinkListItem>
        <LinkListItem href="/digital-arsrapport">
          Digital årsrapport
        </LinkListItem>
      </LinkList>
    </LinkListContainer>
    <LinkListContainer>
      <LinkList>
        <LinkListItem href="/konsernledelsen">Konsernledelsen</LinkListItem>
        <LinkListItem href="/styret">Styret</LinkListItem>
        <LinkListItem href="/representantskapet">
          Representantskapet
        </LinkListItem>
        <LinkListItem href="/boligpriser-og-statistikk">
          Boligpriser og statistikk
        </LinkListItem>
        <LinkListItem href="/investor-relations">
          Investor Relations
        </LinkListItem>
        <LinkListItem href="/digital-arsrapport">
          Digital årsrapport
        </LinkListItem>
        <LinkListItem href="/jobb-i-obos">Jobb i OBOS</LinkListItem>
      </LinkList>
    </LinkListContainer>
    <LinkListContainer>
      <LinkList>
        <LinkListItem href="/konsernledelsen">Konsernledelsen</LinkListItem>
        <LinkListItem href="/styret">Styret</LinkListItem>
        <LinkListItem href="/representantskapet">
          Representantskapet
        </LinkListItem>
        <LinkListItem href="/boligpriser-og-statistikk">
          Boligpriser og statistikk
        </LinkListItem>
        <LinkListItem href="/investor-relations">
          Investor Relations
        </LinkListItem>
        <LinkListItem href="/digital-arsrapport">
          Digital årsrapport
        </LinkListItem>
        <LinkListItem href="/jobb-i-obos">Jobb i OBOS</LinkListItem>
        <LinkListItem href="/presse">Presse</LinkListItem>
        <LinkListItem href="/logoer">Logoer</LinkListItem>
      </LinkList>
    </LinkListContainer>
    <LinkListContainer>
      <LinkList>
        <LinkListItem href="/konsernledelsen">Konsernledelsen</LinkListItem>
        <LinkListItem href="/styret">Styret</LinkListItem>
        <LinkListItem href="/representantskapet">
          Representantskapet
        </LinkListItem>
        <LinkListItem href="/boligpriser-og-statistikk">
          Boligpriser og statistikk
        </LinkListItem>
        <LinkListItem href="/investor-relations">
          Investor Relations
        </LinkListItem>
        <LinkListItem href="/digital-arsrapport">
          Digital årsrapport
        </LinkListItem>
        <LinkListItem href="/jobb-i-obos">Jobb i OBOS</LinkListItem>
        <LinkListItem href="/presse">Presse</LinkListItem>
        <LinkListItem href="/logoer">Logoer</LinkListItem>
        <LinkListItem href="/obos-boligkonferanse">
          OBOS Boligkonferanse
        </LinkListItem>
      </LinkList>
    </LinkListContainer>
    <LinkListContainer>
      <LinkList>
        <LinkListItem href="/konsernledelsen">Konsernledelsen</LinkListItem>
        <LinkListItem href="/styret">Styret</LinkListItem>
        <LinkListItem href="/representantskapet">
          Representantskapet
        </LinkListItem>
        <LinkListItem href="/boligpriser-og-statistikk">
          Boligpriser og statistikk
        </LinkListItem>
        <LinkListItem href="/investor-relations">
          Investor Relations
        </LinkListItem>
        <LinkListItem href="/digital-arsrapport">
          Digital årsrapport
        </LinkListItem>
        <LinkListItem href="/jobb-i-obos">Jobb i OBOS</LinkListItem>
        <LinkListItem href="/presse">Presse</LinkListItem>
        <LinkListItem href="/logoer">Logoer</LinkListItem>
        <LinkListItem href="/obos-boligkonferanse">
          OBOS Boligkonferanse
        </LinkListItem>
        <LinkListItem href="/obos-ligaen">OBOS-ligaen</LinkListItem>
        <LinkListItem href="/datterselskaper">Datterselskaper</LinkListItem>
        <LinkListItem href="/vedtekter">Vedtekter</LinkListItem>
        <LinkListItem href="/generalforsamlingen-i-obos">
          Generalforsamlingen i OBOS
        </LinkListItem>
        <LinkListItem href="/strategi-og-styrende-dokumenter">
          Strategi og styrende dokumenter
        </LinkListItem>
      </LinkList>
    </LinkListContainer>
  </div>
);
