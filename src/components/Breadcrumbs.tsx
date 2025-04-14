import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Dropdown } from './Dropdown'
import { Button } from './Button/Button'

interface BreadcrumbItem {
  label: string
  route?: string
  onClick?: () => void
  [key: string]: any
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
}

export function Breadcrumbs({ items = [] }: BreadcrumbsProps) {
  const navigate = useNavigate()
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const filteredItems = items.filter(Boolean)

  const dropdownItems = windowWidth <= 640 
    ? filteredItems.slice(0, -2).map(item => ({
        ...item,
        icon: undefined,
        label: item.label,
        onClick: () => {
          if (item.route) {
            navigate(item.route)
          } else if (item.onClick) {
            item.onClick()
          }
        }
      }))
    : []

  const crumbs = windowWidth <= 640 
    ? filteredItems.slice(-2) 
    : filteredItems

  return (
    <div className="flex min-w-0 items-center">
      {dropdownItems.length > 0 && (
        <>
          <Dropdown className="h-7" options={dropdownItems}>
            <Button variant="ghost">
              <div className="w-4 text-ink-gray-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="1" />
                  <circle cx="19" cy="12" r="1" />
                  <circle cx="5" cy="12" r="1" />
                </svg>
              </div>
            </Button>
          </Dropdown>
          <span className="ml-1 mr-0.5 text-base text-ink-gray-4" aria-hidden="true">
            /
          </span>
        </>
      )}
      <div className="flex min-w-0 items-center overflow-hidden text-ellipsis whitespace-nowrap">
        {crumbs.map((item, i) => (
          <div key={item.label} className="flex items-center">
            {item.route ? (
              <a
                href={item.route}
                className={`flex items-center rounded px-0.5 py-1 text-lg font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-outline-gray-3 ${
                  i === crumbs.length - 1 
                    ? 'text-ink-gray-9' 
                    : 'text-ink-gray-5 hover:text-ink-gray-7'
                }`}
                onClick={(e) => {
                  e.preventDefault()
                  navigate(item.route!)
                }}
              >
                {item.label}
              </a>
            ) : (
              <button
                className={`flex items-center rounded px-0.5 py-1 text-lg font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-outline-gray-3 ${
                  i === crumbs.length - 1 
                    ? 'text-ink-gray-9' 
                    : 'text-ink-gray-5 hover:text-ink-gray-7'
                }`}
                onClick={item.onClick}
              >
                {item.label}
              </button>
            )}
            {i !== crumbs.length - 1 && (
              <span className="mx-0.5 text-base text-ink-gray-4" aria-hidden="true">
                /
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
