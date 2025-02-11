import React, { useCallback } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Color from '@tiptap/extension-color';
import TextStyle from '@tiptap/extension-text-style';
import Underline from '@tiptap/extension-underline';
import Italic from '@tiptap/extension-italic';
import Code from '@tiptap/extension-code';
import CodeBlock from '@tiptap/extension-code-block';
import { Save } from 'lucide-react';

interface MenuBarProps {
  editor: any;
  onSave: () => void;
}

const MenuBar = ({ editor, onSave }: MenuBarProps) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2 mb-4 p-2 bg-black/20 rounded-lg items-center">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`px-3 py-1 rounded ${editor.isActive('bold') ? 'bg-[#ff6b00]' : 'bg-white/10'}`}
      >
        بولد
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`px-3 py-1 rounded ${editor.isActive('italic') ? 'bg-[#ff6b00]' : 'bg-white/10'}`}
      >
        ایتالیک
      </button>
      <button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={`px-3 py-1 rounded ${editor.isActive('underline') ? 'bg-[#ff6b00]' : 'bg-white/10'}`}
      >
        زیرخط
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        className={`px-3 py-1 rounded ${editor.isActive('code') ? 'bg-[#ff6b00]' : 'bg-white/10'}`}
      >
        کد
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={`px-3 py-1 rounded ${editor.isActive('codeBlock') ? 'bg-[#ff6b00]' : 'bg-white/10'}`}
      >
        Code Block
      </button>
      <input
        type="color"
        onInput={event => {
          editor.chain().focus().setColor((event.target as HTMLInputElement).value).run()
        }}
        className="w-8 h-8 p-0 border-0 rounded cursor-pointer"
        value={editor.getAttributes('textStyle').color}
      />
      <button
        onClick={onSave}
        className="px-3 py-1 rounded bg-green-600 hover:bg-green-700 transition-colors mr-auto flex items-center gap-2"
      >
        <Save size={16} />
        ذخیره
      </button>
    </div>
  );
};

interface EditorProps {
  content: string;
  onChange: (html: string) => void;
  onSave: () => void;
}

const Editor = ({ content, onChange, onSave }: EditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle,
      Color,
      Underline,
      Italic,
      Code,
      CodeBlock,
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  const handleSaveClick = useCallback(() => {
    if (editor) {
      onSave();
    }
  }, [editor, onSave]);

  return (
    <div className="border border-white/20 rounded-lg p-4">
      <MenuBar editor={editor} onSave={handleSaveClick} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default Editor;
