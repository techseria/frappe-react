import { useState, useRef, useEffect } from 'react'
import FeatherIcon from './FeatherIcon'
import { TreeNode, TreeOptions } from '../types/Tree'

interface TreeProps {
  node: TreeNode
  nodeKey: string
  options?: TreeOptions
  children?: React.ReactNode
}

export default function Tree({
  node,
  nodeKey,
  options = {
    rowHeight: '25px',
    indentWidth: '20px',
    showIndentationGuides: true,
  },
  children,
}: TreeProps) {
  const [isCollapsed, setIsCollapsed] = useState(true)
  const [linePadding, setLinePadding] = useState('')
  const iconRef = useRef<HTMLDivElement>(null)

  const hasChildren = Boolean(node.children?.length)

  useEffect(() => {
    if (iconRef.current?.clientWidth) {
      setLinePadding(`${iconRef.current.clientWidth / 2}px`)
    }
  }, [])

  const toggleCollapsed = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (hasChildren) setIsCollapsed(!isCollapsed)
  }

  return (
    <>
      {/* Current Tree Node */}
      {children ? (
        children
      ) : (
        <div
          className="flex items-center cursor-pointer gap-1"
          style={{ height: options.rowHeight }}
          onClick={toggleCollapsed}
        >
          <div ref={iconRef}>
            {hasChildren && node.children && !isCollapsed && (
              <FeatherIcon name="chevron-down" className="h-3.5" />
            )}
            {hasChildren && isCollapsed && (
              <FeatherIcon name="chevron-right" className="h-3.5" />
            )}
          </div>
          <div className={`text-base truncate ${hasChildren ? '' : 'pl-3.5'}`}>
            {node.label}
          </div>
        </div>
      )}

      {/* Recursively render the children */}
      {hasChildren && !isCollapsed && (
        <div className="flex">
          {options.showIndentationGuides && (
            <div
              style={{ paddingLeft: linePadding }}
              className="border-r"
            />
          )}
          <ul className="w-full" style={{ paddingLeft: options.indentWidth }}>
            {node.children?.map((child) => (
              <li key={child[nodeKey] as string}>
                <Tree node={child} nodeKey={nodeKey} options={options}>
                  {children}
                </Tree>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  )
}
