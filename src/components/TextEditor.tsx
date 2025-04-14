import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import TextAlign from '@tiptap/extension-text-align'
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import Link from '@tiptap/extension-link'
import Typography from '@tiptap/extension-typography'
import TextStyle from '@tiptap/extension-text-style'
import Highlight from '@tiptap/extension-highlight'
import { Color } from '@tiptap/extension-color'
import { createLowlight } from 'lowlight'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { common } from 'lowlight'
import { useEffect, useMemo } from 'react'

const lowlight = createLowlight(common)

interface TextEditorProps {
  content?: string | null
  placeholder?: string | (() => string)
  editorClass?: string
  editable?: boolean
  extensions?: any[]
  starterkitOptions?: Record<string, any>
  onChange?: (html: string) => void
  onFocus?: (event: FocusEvent) => void
  onBlur?: (event: FocusEvent) => void
}

export default function TextEditor({
  content = null,
  placeholder = '',
  editorClass = '',
  editable = true,
  extensions = [],
  starterkitOptions = {},
  onChange,
  onFocus,
  onBlur,
}: TextEditorProps) {
  const editor = useEditor({
    content,
    editable,
    extensions: [
      StarterKit.configure({
        ...starterkitOptions,
        codeBlock: false,
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      Typography,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      TextStyle,
      Color,
      Highlight.configure({ multicolor: true }),
      CodeBlockLowlight.configure({ lowlight }),
      Link.configure({
        openOnClick: false,
      }),
      Placeholder.configure({
        showOnlyWhenEditable: false,
        placeholder: typeof placeholder === 'function' 
          ? placeholder 
          : () => placeholder,
      }),
      ...extensions,
    ],
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML())
    },
    onFocus: ({ event }) => {
      onFocus?.(event)
    },
    onBlur: ({ event }) => {
      onBlur?.(event)
    },
  })

  useEffect(() => {
    if (!editor) return
    const currentHTML = editor.getHTML()
    if (currentHTML !== content) {
      editor.commands.setContent(content || '')
    }
  }, [content, editor])

  useEffect(() => {
    if (!editor) return
    editor.setEditable(editable)
  }, [editable, editor])

  const editorProps = useMemo(() => ({
    attributes: {
      class: [
        'prose prose-table:table-fixed prose-td:p-2 prose-th:p-2 prose-td:border prose-th:border prose-td:border-outline-gray-2 prose-th:border-outline-gray-2 prose-td:relative prose-th:relative prose-th:bg-surface-gray-2',
        editorClass,
      ].join(' '),
    },
  }), [editorClass])

  if (!editor) {
    return null
  }

  return (
    <div className="relative w-full">
      <EditorContent 
        editor={editor}
        {...editorProps}
      />
    </div>
  )
}
