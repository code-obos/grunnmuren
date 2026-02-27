import { useState } from 'react';
import reactElementToJSXString from 'react-element-to-jsx-string';
import { Code } from './code-legacy';

type ComponentPreviewProps = {
  /** @alpha - Passing a React.ReactNode is currently not compatible with React 19, pass a string to make it work with React 19 until react-element-to-jsx-string supports React 19  */
  code: React.ReactNode | string;
  caption: string;
};

export const ComponentPreview = ({ code, caption }: ComponentPreviewProps) => {
  // Keep of the code string in state to sync editing, copying and render preview
  const [codeString, setCodeString] = useState(
    typeof code === 'string' ? code : reactElementToJSXString(code),
  );

  return (
    <Code
      value={codeString}
      setValue={setCodeString}
      caption={caption}
      withLivePreview
      isEditable
    />
  );
};
