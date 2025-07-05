import dynamic from 'next/dynamic';
import React from 'react';

// Dynamically import MDEditor to avoid SSR issues
const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false });

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  editable?: boolean;
}

export default function MarkdownEditor({ value, onChange, editable = true }: MarkdownEditorProps) {
  return (
    <div className="min-h-[200px]">
      <MDEditor
        value={value}
        onChange={v => onChange(v || '')}
        height={300}
        preview={editable ? 'edit' : 'preview'}
        visibleDragbar={false}
        textareaProps={{
          placeholder: 'Start writing your blog content...'
        }}
      />
    </div>
  );
} 