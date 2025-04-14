export const alignmentMap = {
  left: 'justify-start',
  center: 'justify-center',
  right: 'justify-end'
}

export function getGridTemplateColumns(
  columns: { width?: number }[],
  selectable?: boolean
) {
  let templateColumns = []
  if (selectable) {
    templateColumns.push('min-content')
  }
  templateColumns.push(
    ...columns.map((col) => (col.width ? `${col.width}px` : '1fr'))
  )
  return templateColumns.join(' ')
}

export function useDebounceFn<T extends (...args: any[]) => any>(
  fn: T,
  delay: number
) {
  let timeoutId: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn(...args), delay)
  }
}
