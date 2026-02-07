'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSidebar } from '@/context/SidebarContext'

export default function Sidebar() {
  const pathname = usePathname()
  const { sidebarOpen, closeSidebar } = useSidebar()
  const [openMenus, setOpenMenus] = useState(['projects'])

  const toggleMenu = (menu) => {
    setOpenMenus(prev =>
      prev.includes(menu)
        ? prev.filter(m => m !== menu)
        : [...prev, menu]
    )
  }

  const isActive = (path) => pathname === path

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: '🏠',
      path: '/dashboard'
    },
    {
      id: 'projects',
      label: 'Projects',
      icon: '📁',
      children: [
        { label: 'All Projects', path: '/projects' },
        { label: 'Active', path: '/projects/active' },
        { label: 'Archived', path: '/projects/archived' },
      ]
    },
    {
      id: 'tasks',
      label: 'Tasks',
      icon: '✓',
      children: [
        { label: 'My Tasks', path: '/tasks' },
        { label: 'Assigned', path: '/tasks/assigned' },
        { label: 'Completed', path: '/tasks/completed' },
      ]
    },
    {
      id: 'team',
      label: 'Team',
      icon: '👥',
      children: [
        { label: 'Members', path: '/team' },
        { label: 'Invite', path: '/team/invite' },
      ]
    },
    {
      id: 'messages',
      label: 'Messages',
      icon: '💬',
      path: '/messages',
      badge: 3
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: '📊',
      path: '/analytics'
    },
    {
      id: 'files',
      label: 'Files',
      icon: '📄',
      path: '/files'
    },
  ]

  return (
    <>
      {sidebarOpen && <div className="sidebar-overlay" onClick={closeSidebar} />}
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-content">
        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <div key={item.id} className="nav-item-wrapper">
              {item.children ? (
                <>
                  <button
                    className={`nav-item nav-item-toggle ${openMenus.includes(item.id) ? 'open' : ''}`}
                    onClick={() => toggleMenu(item.id)}
                  >
                    <span className="nav-icon">{item.icon}</span>
                    <span className="nav-label">{item.label}</span>
                    <span className={`nav-arrow ${openMenus.includes(item.id) ? 'open' : ''}`}>
                      ▶
                    </span>
                  </button>
                  <div className={`nav-submenu ${openMenus.includes(item.id) ? 'open' : ''}`}>
                    {item.children.map((child) => (
                      <Link
                        key={child.path}
                        href={child.path}
                        className={`nav-subitem ${isActive(child.path) ? 'active' : ''}`}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </>
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
    </aside>
    </>
  )
}
