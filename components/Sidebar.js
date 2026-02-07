'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSidebar } from '@/context/SidebarContext'

export default function Sidebar() {
  const pathname = usePathname()
  const { sidebarOpen, closeSidebar } = useSidebar()
  const [width, setWidth] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('sidebar-width')
      return saved ? Number(saved) : 220
    }
    return 220
  })
  const isResizing = useRef(false)

  const handleMouseDown = useCallback((e) => {
    e.preventDefault()
    isResizing.current = true
    document.body.style.cursor = 'col-resize'
    document.body.style.userSelect = 'none'
  }, [])

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isResizing.current) return
      const newWidth = Math.min(Math.max(e.clientX, 140), 400)
      setWidth(newWidth)
    }

    const handleMouseUp = () => {
      if (isResizing.current) {
        isResizing.current = false
        document.body.style.cursor = ''
        document.body.style.userSelect = ''
        localStorage.setItem('sidebar-width', String(width))
      }
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [width])

  const isActive = (path) => pathname === path

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '🏠', path: '/dashboard' },
    { id: 'nearby', label: 'Fleet Map', icon: '📍', path: '/nearby' },
    { id: 'dispatch', label: 'Dispatch', icon: '🚛', path: '/dispatch' },
    { id: 'projects', label: 'Projects', icon: '📁', disabled: true },
    { id: 'tasks', label: 'Tasks', icon: '✓', disabled: true },
    { id: 'team', label: 'Team', icon: '👥', disabled: true },
    { id: 'messages', label: 'Messages', icon: '💬', disabled: true },
    { id: 'analytics', label: 'Analytics', icon: '📊', disabled: true },
    { id: 'files', label: 'Files', icon: '📄', disabled: true },
  ]

  return (
    <>
      {sidebarOpen && <div className="sidebar-overlay" onClick={closeSidebar} />}
      <aside
        className={`sidebar ${sidebarOpen ? 'open' : ''}`}
        style={{ width: `${width}px` }}
      >
        <div className="sidebar-content">
          <nav className="sidebar-nav">
            {menuItems.map((item) => (
              <div key={item.id} className="nav-item-wrapper">
                {item.disabled ? (
                  <div className="nav-item nav-item-disabled">
                    <span className="nav-icon">{item.icon}</span>
                    <span className="nav-label">{item.label}</span>
                  </div>
                ) : (
                  <Link
                    href={item.path}
                    className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
                  >
                    <span className="nav-icon">{item.icon}</span>
                    <span className="nav-label">{item.label}</span>
                    {item.badge && <span className="nav-badge">{item.badge}</span>}
                  </Link>
                )}
              </div>
            ))}
          </nav>
        </div>
        <div className="sidebar-resize-handle" onMouseDown={handleMouseDown} />
      </aside>
    </>
  )
}
