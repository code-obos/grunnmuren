import type { Meta } from '@storybook/react-vite';
import { useState } from 'react';
import { Button } from '../button';
import { Description, Label } from '../label';
import { UNSAFE_FileUpload as FileUpload } from './file-upload';

const meta = {
  title: 'FileUpload',
  component: FileUpload,
  parameters: {
    // disable built in padding in story, because we provide our own
    layout: 'fullscreen',
  },
  render: () => {
    return (
      <div className="container p-4">
        <FileUpload>
          <Label>Last opp fil</Label>
          <Description>Du kan laste opp én fil.</Description>
          <Button>Velg fil</Button>
        </FileUpload>
      </div>
    );
  },
} satisfies Meta<typeof FileUpload>;

export default meta;

export const FileUploadStory = {};

export const AllowsMultiple = {
  render: () => {
    return (
      <div className="container p-4">
        <FileUpload allowsMultiple>
          <Label>Last opp filer</Label>
          <Description>
            Du kan laste opp flere filer. Du kan laste de opp samtidig.
          </Description>
          <Button>Velg filer</Button>
        </FileUpload>
      </div>
    );
  },
};

export const LimitFileTypes = {
  render: () => {
    return (
      <div className="w-72 max-w-full p-4">
        <FileUpload acceptedFileTypes={['.pdf']}>
          <Label>Last opp PDF</Label>
          <Description>Du kan kun laste opp én PDF.</Description>
          <Button>Velg PDF</Button>
        </FileUpload>
      </div>
    );
  },
};

export const AcceptDirectory = {
  render: () => {
    return (
      <div className="w-72 max-w-full p-4">
        <FileUpload acceptDirectory>
          <Label>Last opp mappe</Label>
          <Description>Du kan laste opp en mappe.</Description>
          <Button>Velg mappe</Button>
        </FileUpload>
      </div>
    );
  },
};

export const Controlled = {
  render: () => {
    const [files, setFiles] = useState<File[]>([]);
    return (
      <div className="w-72 max-w-full p-4">
        <FileUpload files={files} onChange={setFiles} allowsMultiple>
          <Label>Last opp filer</Label>
          <Description>Du kan laste opp flere filer.</Description>
          <Button>Velg filer</Button>
        </FileUpload>
        Filer: {files?.map((file) => file.name).join(', ')}
      </div>
    );
  },
};

export const Required = {
  render: () => {
    return (
      <form
        encType="multipart/form-data"
        className="flex w-72 max-w-full flex-col items-start gap-4 p-4"
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target as HTMLFormElement);
          const files = formData
            .getAll('files')
            .filter(
              (file) => file instanceof File && file.size > 0 && file.name,
            );

          alert(
            `Lastet opp ${files.map((file) => (file as File).name).join(', ')}`,
          );
        }}
      >
        <FileUpload isRequired name="file">
          <Label>Last opp medlemsbevis</Label>
          <Description>Du må laste opp medlemsbevis.</Description>
          <Button variant="secondary">Velg fil</Button>
        </FileUpload>
        <Button type="submit">Send inn</Button>
      </form>
    );
  },
};

export const Validation = {
  render: () => {
    return (
      <div className="w-72 max-w-full p-4">
        <FileUpload
          validate={(file) => file.size < 1000000 || 'Filen er for stor'}
        >
          <Label>Last opp fil</Label>
          <Description>Du kan laste opp en fil på maksimalt 1 MB.</Description>
          <Button>Velg fil</Button>
        </FileUpload>
      </div>
    );
  },
};

export const InForm = () => (
  <form
    className="flex w-72 max-w-full flex-col items-start gap-4 p-4"
    encType="multipart/form-data"
    onSubmit={(e) => {
      e.preventDefault();
      const formData = new FormData(e.target as HTMLFormElement);
      const files = formData
        .getAll('files')
        .filter((file) => file instanceof File && file.size > 0 && file.name);

      alert(
        `Lastet opp ${files.map((file) => (file as File).name).join(', ')}`,
      );
    }}
  >
    <FileUpload
      validate={(file) => file.size < 1000000 || 'Filen er for stor'}
      allowsMultiple
      name="files"
    >
      <Label>Last opp filer</Label>
      <Description>
        Du må laste opp minst én fil, du kan laste opp flere. Filene kan ikke
        være større enn 1 MB.
      </Description>
      <Button variant="secondary">Velg fil</Button>
    </FileUpload>
    <Button type="submit">Send inn</Button>
  </form>
);
