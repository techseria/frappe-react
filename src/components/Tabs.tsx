import { TabGroup } from '@headlessui/react'
import { createContext, useContext, useState } from 'react'

interface TabsContextType {
  tabIndex: number
  setTabIndex: (index: number) => void
  tabs: any[]
  vertical: boolean
}

const TabsContext = createContext<TabsContextType | null>(null)

export function useTabs() {
  const context = useContext(TabsContext)
  if (!context) {
    throw new Error('useTabs must be used within a Tabs provider')
  }
  return context
}

interface TabsProps {
  as?: React.ElementType
  tabs: any[]
  vertical?: boolean
  defaultIndex?: number
  children?: React.ReactNode
}

export function Tabs({
  as = 'div',
  tabs,
  vertical = false,
  defaultIndex = 0,
  children,
}: TabsProps) {
  const [tabIndex, setTabIndex] = useState(defaultIndex)

  return (
    <TabsContext.Provider value={{ tabIndex, setTabIndex, tabs, vertical }}>
      <TabGroup
        as={as}
        defaultIndex={defaultIndex}
        selectedIndex={tabIndex}
        onChange={setTabIndex}
        className={`flex flex-1 overflow-hidden ${vertical ? '' : 'flex-col'}`}
      >
        {children}
      </TabGroup>
    </TabsContext.Provider>
  )
}
