import { ComponentProps } from 'react'
import feather from 'feather-icons'

const validIcons = Object.keys(feather.icons) as Array<keyof typeof feather.icons>

export type FeatherIconName = keyof typeof feather.icons

export interface FeatherIconProps extends ComponentProps<'svg'> {
  name: FeatherIconName
  color?: string
  strokeWidth?: number
}

export function FeatherIcon({
  name,
  color,
  strokeWidth = 1.5,
  className = '',
  ...props
}: FeatherIconProps) {
  if (!validIcons.includes(name)) {
    console.groupCollapsed(
      '[frappe-ui] name property for feather-icon must be one of ',
    )
    console.dir(validIcons)
    console.groupEnd()
    name = 'circle'
  }

  const icon = feather.icons[name]
  const attrs = icon.attrs || {}

  return (
    <svg
      {...attrs}
      {...props}
      fill="none"
      stroke="currentColor"
      color={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
      width={undefined}
      height={undefined}
      className={`shrink-0 ${className}`}
      dangerouslySetInnerHTML={{ __html: icon.contents }}
    />
  )
}
