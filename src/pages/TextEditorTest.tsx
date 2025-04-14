import TextEditor from '../components/TextEditor'

export default function TextEditorTest() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Text Editor Test</h1>
      <TextEditor 
        content="<p>Hello <strong>World</strong></p>"
        placeholder="Start typing here..."
        onChange={(html) => console.log('Content changed:', html)}
      />
    </div>
  )
}
