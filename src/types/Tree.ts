export interface TreeNode {
  label: string
  children?: TreeNode[]
  [key: string]: any
}

export interface TreeOptions {
  rowHeight?: string
  indentWidth?: string
  showIndentationGuides?: boolean
}
