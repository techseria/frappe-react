import { TabPanels, TabPanel as HeadlessTabPanel } from '@headlessui/react'
import { useTabs } from './Tabs'

interface TabPanelProps {
  children?: React.ReactNode | ((tab: any) => React.ReactNode)
  className?: string
}

export function TabPanel({ children, className = '' }: TabPanelProps) {
  const { tabs } = useTabs()

  return (
    <TabPanels className={`flex flex-1 overflow-hidden ${className}`}>
      {tabs.map((tab, i) => (
        <HeadlessTabPanel
          key={i}
          className="flex flex-1 flex-col overflow-y-auto focus:outline-none"
        >
          {typeof children === 'function' ? children(tab) : children}
        </HeadlessTabPanel>
      ))}
    </TabPanels>
  )
}
