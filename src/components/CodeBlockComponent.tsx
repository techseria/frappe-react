import React from 'react';

interface CodeBlockComponentProps {
  code: string;
  language?: string; // Optional language for styling/highlighting
}

const CodeBlockComponent: React.FC<CodeBlockComponentProps> = ({ code, language }) => {
  const langClass = language ? `language-${language}` : '';

  return (
    <pre className={`bg-gray-100 p-3 rounded overflow-auto text-sm ${langClass}`}>
      <code>
        {code}
      </code>
    </pre>
  );
};

export default CodeBlockComponent;
