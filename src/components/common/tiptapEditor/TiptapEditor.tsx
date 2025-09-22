import * as styles from "./TiptapEditor.css";
import { useState, useCallback } from "react";
import { useEditor, EditorContent, Editor, mergeAttributes } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit"; 
import TextAlign from "@tiptap/extension-text-align";
import Image from "@tiptap/extension-image";
import { TextStyleKit } from "@tiptap/extension-text-style";
import { Dropcursor } from "@tiptap/extensions";
import MenuBar from "@/components/common/tiptapEditor/menuBar/MenuBar";
import Divider from "@/components/common/divider/Divider";
import Link from "@tiptap/extension-link";

export const CustomImage = Image.extend({
  defaultOptions: {
    ...Image.options,
    sizes: ["inline", "block", "left", "right"]
  },
  renderHTML({ HTMLAttributes }: { HTMLAttributes: Record<string, any> }) {
    const { style } = HTMLAttributes;
    return [
      "figure",
      { style },
      ["img", mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)]
    ];
  }
});

export const CustomLink = Link.configure({
  openOnClick: false,
  autolink: true,
  defaultProtocol: 'https',
  protocols: ['http', 'https'],
  isAllowedUri: (url, ctx) => {
    try {
      // construct URL
      const parsedUrl = url.includes(':') ? new URL(url) : new URL(`${ctx.defaultProtocol}://${url}`)

      // use default validation
      if (!ctx.defaultValidate(parsedUrl.href)) {
        return false
      }

      // disallowed protocols
      const disallowedProtocols = ['ftp', 'file', 'mailto']
      const protocol = parsedUrl.protocol.replace(':', '')

      if (disallowedProtocols.includes(protocol)) {
        return false
      }

      // only allow protocols specified in ctx.protocols
      const allowedProtocols = ctx.protocols.map(p => (typeof p === 'string' ? p : p.scheme))

      if (!allowedProtocols.includes(protocol)) {
        return false
      }

      // disallowed domains
      const disallowedDomains = ['example-phishing.com', 'malicious-site.net']
      const domain = parsedUrl.hostname

      if (disallowedDomains.includes(domain)) {
        return false
      }

      return true
    } catch {
      return false
    }
  },
  shouldAutoLink: url => {
    try {
      const parsedUrl = url.includes(':') ? new URL(url) : new URL(`https://${url}`)

      const disallowedDomains = ['example-no-autolink.com', 'another-no-autolink.com']
      const domain = parsedUrl.hostname

      return !disallowedDomains.includes(domain)
    } catch {
      return false
    }
  },
});


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
      TextAlign.configure({
        types: ["heading", "paragraph", "image"],
      }),
      CustomImage,
      CustomLink
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
