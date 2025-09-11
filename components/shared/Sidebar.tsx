import { cn } from '@/lib/utils'
import React from 'react'

interface Props {
    children: React.ReactNode
    className?: string
}

export default function Sidebar({children,className}: Props) {
  return (
    <aside className={cn("flex flex-col gap-3", className)}>
        {children}
    </aside>
  )
}
