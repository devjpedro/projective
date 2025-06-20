'use client'

import { useTheme } from 'next-themes'
import React from 'react'

import { DropdownMenuItem } from '../ui/dropdown-menu'

export default function ThemeDropdownItem() {
  const { resolvedTheme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
  }

  return (
    <DropdownMenuItem className="block sm:hidden" onClick={toggleTheme}>
      {resolvedTheme === 'dark' ? 'Light' : 'Dark'} Mode
    </DropdownMenuItem>
  )
}
