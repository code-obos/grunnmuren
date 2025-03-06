import type { Meta, StoryObj } from '@storybook/react';
import { UNSAFE_FileUpload as FileUpload } from './file-upload';
import { Button } from '../button';
import { Description } from '../label';
import { useState } from 'react';

const meta: Meta<typeof FileUpload> = {
  title: 'FileUpload',
  component: FileUpload,
  parameters: {
    // disable built in padding in story, because we provide our own
    layout: 'fullscreen',
  },
  render: () => {
    return (
      <div className="p-4">
        <FileUpload label="Last opp fil">
          <Description>
            Du kan laste opp filer på opptil 10 mB. Du kan laste opp så mange
            filer du vil.
          </Description>
          <Button className="w-fit">Velg filer</Button>
        </FileUpload>
      </div>
    );
  },
};

export default meta;

type Story = StoryObj<typeof FileUpload>;

export const FileUploadStory: Story = {
  args: {},
};

export const AllowsMultiple: Story = {
  render: () => {
    return (
      <div className="p-4">
        <FileUpload label="Last opp fil" allowsMultiple>
          <Description>Du kan velge flere filer samtidig.</Description>
          <Button className="w-fit">Velg filer</Button>
        </FileUpload>
      </div>
    );
  },
};

export const LimitFileTypes: Story = {
  render: () => {
    return (
      <div className="p-4">
        <FileUpload label="Last opp fil" acceptedFileTypes={['.pdf']}>
          <Description>Du kan kun laste opp PDF-er.</Description>
          <Button className="w-fit">Velg PDF</Button>
        </FileUpload>
      </div>
    );
  },
};

export const AcceptDirectory: Story = {
  render: () => {
    return (
      <div className="p-4">
        <FileUpload label="Last opp filer" acceptDirectory>
          <Description>Du kan laste opp en mappe.</Description>
          <Button className="w-fit">Velg mappe</Button>
        </FileUpload>
      </div>
    );
  },
};

export const Controlled: Story = {
  render: () => {
    const [files, setFiles] = useState<File[]>([]);
    return (
      <div className="p-4">
        <FileUpload label="Last opp filer" files={files} onChange={setFiles}>
          <Description>Du kan laste opp en mappe.</Description>
          <Button className="w-fit">Velg mappe</Button>
        </FileUpload>
        Filer: {files?.map((file) => file.name).join(', ')}
      </div>
    );
  },
};

export const Required: Story = {
  render: () => {
    return (
      <form className="flex flex-col items-start gap-4 p-4">
        <FileUpload label="Last ned medlemsbevis" isRequired>
          <Description>Du må laste opp medlemsbevis.</Description>
          <Button className="w-fit" variant="secondary">
            Velg fil
          </Button>
        </FileUpload>
        <Button type="submit">Send inn</Button>
      </form>
    );
  },
};

export const Validation: Story = {
  render: () => {
    return (
      <div className="p-4">
        <FileUpload
          label="Last opp filer"
          validation={(file) => file.size < 1000000 || 'Filen er for stor'}
        >
          <Description>Du kan laste opp en mappe.</Description>
          <Button className="w-fit">Velg mappe</Button>
        </FileUpload>
      </div>
    );
  },
};
