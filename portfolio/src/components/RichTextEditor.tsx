import React, { useState, useCallback } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Underline from '@tiptap/extension-underline';
import Image from '@tiptap/extension-image';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import Blockquote from '@tiptap/extension-blockquote';
import ListItem from '@tiptap/extension-list-item';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import Heading from '@tiptap/extension-heading';
import { createLowlight, common } from 'lowlight';
import { Markdown } from 'tiptap-markdown';
import { supabase } from '@/lib/supabase';
import ReactMarkdown from 'react-markdown';

interface RichTextEditorProps {
  value: string;
  onChange: (markdown: string) => void;
  editable?: boolean;
}

const toolbarButtons = [
  { cmd: 'bold', icon: 'B', label: 'Bold' },
  { cmd: 'italic', icon: 'I', label: 'Italic' },
  { cmd: 'underline', icon: 'U', label: 'Underline' },
  { cmd: 'heading', icon: 'H', label: 'Heading' },
  { cmd: 'link', icon: '🔗', label: 'Link' },
  { cmd: 'bulletList', icon: '•', label: 'Bullet List' },
  { cmd: 'orderedList', icon: '1.', label: 'Numbered List' },
  { cmd: 'blockquote', icon: '❝', label: 'Blockquote' },
  { cmd: 'codeBlock', icon: '</>', label: 'Code Block' },
  { cmd: 'image', icon: '🖼️', label: 'Image' },
  { cmd: 'undo', icon: '↺', label: 'Undo' },
  { cmd: 'redo', icon: '↻', label: 'Redo' },
];

function getExtensions() {
  const lowlight = createLowlight(common);
  return [
    StarterKit.configure({}),
    Link.configure({ openOnClick: false }),
    Underline.configure({}),
    Image.configure({}),
    CodeBlockLowlight.configure({ lowlight }),
    Blockquote.configure({}),
    ListItem.configure({}),
    BulletList.configure({}),
    OrderedList.configure({}),
    Heading.configure({ levels: [1, 2, 3] }),
    Markdown.configure({}),
  ];
}

export default function RichTextEditor({ value, onChange, editable = true }: RichTextEditorProps) {
  const [tab, setTab] = useState<'edit' | 'preview'>('edit');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const editor = useEditor({
    extensions: getExtensions(),
    content: value,
    editable,
    onUpdate: ({ editor }) => {
      const markdown = editor.storage.markdown.getMarkdown();
      onChange(markdown);
    },
  });

  // Set initial value if changed externally
  React.useEffect(() => {
    if (editor && value !== editor.storage.markdown.getMarkdown()) {
      editor.commands.setContent(value, false);
    }
  }, [value, editor]);

  const handleImageUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError('');
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const { data, error: uploadError } = await supabase.storage.from('blog-images').upload(fileName, file, {
        cacheControl: '3600',
        upsert: false,
      });
      if (uploadError) throw uploadError;
      const { data: urlData } = supabase.storage.from('blog-images').getPublicUrl(fileName);
      if (!urlData?.publicUrl) throw new Error('Failed to get image URL');
      editor?.chain().focus().setImage({ src: urlData.publicUrl }).run();
    } catch (err: any) {
      setError(err.message || 'Image upload failed');
    } finally {
      setUploading(false);
    }
  }, [editor]);

  const runCmd = (cmd: string) => {
    if (!editor) return;
    switch (cmd) {
      case 'bold': editor.chain().focus().toggleBold().run(); break;
      case 'italic': editor.chain().focus().toggleItalic().run(); break;
      case 'underline': editor.chain().focus().toggleUnderline().run(); break;
      case 'heading': editor.chain().focus().toggleHeading({ level: 2 }).run(); break;
      case 'link': {
        const url = window.prompt('Enter URL');
        if (url) editor.chain().focus().setLink({ href: url }).run();
        break;
      }
      case 'bulletList': editor.chain().focus().toggleBulletList().run(); break;
      case 'orderedList': editor.chain().focus().toggleOrderedList().run(); break;
      case 'blockquote': editor.chain().focus().toggleBlockquote().run(); break;
      case 'codeBlock': editor.chain().focus().toggleCodeBlock().run(); break;
      case 'image': {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = handleImageUpload as any;
        input.click();
        break;
      }
      case 'undo': editor.chain().focus().undo().run(); break;
      case 'redo': editor.chain().focus().redo().run(); break;
      default: break;
    }
  };

  return (
    <div>
      {/* Toolbar */}
      {editable && (
        <div className="flex flex-wrap gap-2 mb-2 border-b pb-2">
          {toolbarButtons.map(btn => (
            <button
              key={btn.cmd}
              type="button"
              className="px-2 py-1 rounded hover:bg-gray-200 text-gray-700 text-lg font-semibold"
              title={btn.label}
              onClick={() => runCmd(btn.cmd)}
              disabled={uploading && btn.cmd === 'image'}
            >
              {btn.icon}
            </button>
          ))}
          {uploading && <span className="ml-2 text-blue-600 text-sm">Uploading...</span>}
        </div>
      )}
      {/* Edit/Preview Tabs */}
      <div className="flex gap-2 mb-2">
        <button
          type="button"
          className={`px-3 py-1 rounded-t ${tab === 'edit' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => setTab('edit')}
        >
          Edit
        </button>
        <button
          type="button"
          className={`px-3 py-1 rounded-t ${tab === 'preview' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => setTab('preview')}
        >
          Preview
        </button>
      </div>
      {/* Editor/Preview */}
      <div className="border rounded-b bg-white min-h-[200px] relative">
        {tab === 'edit' ? (
          <div className="relative min-h-[200px] text-gray-900">
            <EditorContent editor={editor} className="min-h-[200px] text-gray-900" />
            {editor && editor.isEmpty && !editor.isFocused && (
              <div className="absolute left-4 top-4 text-gray-400 pointer-events-none select-none z-0">
                Start writing your blog content...
              </div>
            )}
          </div>
        ) : (
          (() => {
            const markdown = editor?.storage.markdown.getMarkdown() || '';
            console.log('Markdown preview value:', markdown);
            return (
              <div className="prose max-w-none text-gray-900 bg-white min-h-[200px] p-2">
                <ReactMarkdown>{markdown}</ReactMarkdown>
              </div>
            );
          })()
        )}
      </div>
      {error && <div className="text-red-600 text-sm mt-2">{error}</div>}
    </div>
  );
} 