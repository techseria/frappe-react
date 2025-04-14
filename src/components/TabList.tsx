import { TabList as HeadlessTabList, Tab } from '@headlessui/react'
import { useRef, useEffect, useState, RefCallback } from 'react'
import { useTabs } from './Tabs'

interface TabListProps {
  children?: React.ReactNode
  className?: string
}

export function TabList({ children, className = '' }: TabListProps) {
  const { tabIndex, tabs, vertical } = useTabs()
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([])
  const indicatorRef = useRef<HTMLDivElement>(null)
  const [transitionClass, setTransitionClass] = useState('')

  useEffect(() => {
    const moveIndicator = (index: number) => {
      if (index >= tabs.length) {
        index = tabs.length - 1
      }
      const selectedTab = tabRefs.current[index]
      if (!selectedTab || !indicatorRef.current) return

      if (vertical) {
        indicatorRef.current.style.height = `${selectedTab.offsetHeight}px`
        indicatorRef.current.style.top = `${selectedTab.offsetTop}px`
      } else {
        indicatorRef.current.style.width = `${selectedTab.offsetWidth}px`
        indicatorRef.current.style.left = `${selectedTab.offsetLeft}px`
      }
    }

    setTransitionClass('transition-all duration-300 ease-in-out')
    moveIndicator(tabIndex)

    // Fix for indicator not moving on initial load
    const timer = setTimeout(() => moveIndicator(tabIndex), 100)
    return () => clearTimeout(timer)
  }, [tabIndex, tabs.length, vertical])

  return (
    <HeadlessTabList
      className={`relative flex ${className} ${
        vertical
          ? 'flex-col border-r overflow-y-auto'
          : 'gap-7.5 border-b overflow-x-auto items-center px-5'
      }`}
    >
      {children ??
        tabs.map((tab, i) => (
          <Tab key={i} as="template">
            {({ selected }) => (
              <button
                ref={(el: HTMLButtonElement | null) => {
                  tabRefs.current[i] = el
                }}
                className={`flex items-center gap-1.5 text-base text-ink-gray-5 duration-300 ease-in-out hover:text-ink-gray-9 ${
                  selected ? 'text-ink-gray-9' : ''
                } ${
                  vertical
                    ? 'py-2.5 px-4 border-r border-transparent hover:border-outline-gray-3'
                    : 'py-3 border-b border-transparent hover:border-outline-gray-3'
                }`}
              >
                {tab.icon && <tab.icon className="size-4" />}
                {tab.label}
              </button>
            )}
          </Tab>
        ))}
      <div
        ref={indicatorRef}
        className={`tab-indicator absolute bg-surface-gray-7 ${
          vertical ? 'right-0 w-px' : 'bottom-0 h-px'
        } ${transitionClass}`}
      />
    </HeadlessTabList>
  )
}
