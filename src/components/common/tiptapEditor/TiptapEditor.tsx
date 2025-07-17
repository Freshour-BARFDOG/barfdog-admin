import * as styles from "./TiptapEditor.css";
import { useState, useCallback } from "react";
import { useEditor, EditorContent, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import { TextStyleKit } from "@tiptap/extension-text-style";
import { Dropcursor } from "@tiptap/extensions";
import MenuBar from "@/components/common/tiptapEditor/menuBar/MenuBar";
import Divider from "@/components/common/divider/Divider";

export interface TiptapEditorProps {
  content: string;
  onUpdate: (html: string) => void;
  onImageUpload: (file: File) => Promise<string | undefined>;
}

export default function TiptapEditor({
  content,
  onUpdate,
  onImageUpload,
}: TiptapEditorProps) {
  const [initialContent] = useState(content); // content 초기 1회만 사용

  const handleUpdate = useCallback(
    ({ editor }: { editor: Editor }) => {
      const html = editor.getHTML();
      onUpdate(html);
    },
    [onUpdate]
  );

  const editor = useEditor({
    extensions: [
      StarterKit,
      Dropcursor,
      TextStyleKit,
      Image.configure({ inline: false }),
    ],
    content: initialContent,
    onUpdate: handleUpdate,
    editorProps: {
      attributes: {
        class: styles.tiptapEditor,
      },
    },
    immediatelyRender: false,
  });

  return (
    editor && (
      <div className={styles.tiptapEditorContainer}>
        <MenuBar editor={editor} onImageUpload={onImageUpload} />
        <Divider thickness={2} color="gray200" />
        <EditorContent editor={editor} className={styles.tiptapEditor} />
      </div>
    )
  );
}
