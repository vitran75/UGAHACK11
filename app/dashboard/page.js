'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'
import DashboardLayout from '@/components/DashboardLayout'

function DashboardContent() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('overview')

  const stats = [
    { label: 'Projects', value: '12', icon: '📁', change: '+2 this week' },
    { label: 'Tasks', value: '48', icon: '✓', change: '8 pending' },
    { label: 'Messages', value: '24', icon: '💬', change: '3 unread' },
    { label: 'Storage', value: '2.4 GB', icon: '💾', change: 'of 10 GB' },
  ]

  const recentActivity = [
    { id: 1, action: 'Created new project', item: 'Website Redesign', time: '2 hours ago', icon: '📁' },
    { id: 2, action: 'Completed task', item: 'Update documentation', time: '4 hours ago', icon: '✓' },
    { id: 3, action: 'Uploaded file', item: 'design-v2.fig', time: 'Yesterday', icon: '📄' },
    { id: 4, action: 'Added comment', item: 'Mobile App Project', time: 'Yesterday', icon: '💬' },
    { id: 5, action: 'Invited team member', item: 'alex@email.com', time: '2 days ago', icon: '👤' },
  ]

  const quickActions = [
    { label: 'New Project', icon: '➕', color: '#0070f3' },
    { label: 'Add Task', icon: '📝', color: '#10b981' },
    { label: 'Upload File', icon: '📤', color: '#8b5cf6' },
    { label: 'Invite Team', icon: '👥', color: '#f59e0b' },
  ]

  const projects = [
    { id: 1, name: 'Website Redesign', progress: 75, status: 'active', members: 4 },
    { id: 2, name: 'Mobile App', progress: 45, status: 'active', members: 6 },
    { id: 3, name: 'Marketing Campaign', progress: 90, status: 'review', members: 3 },
    { id: 4, name: 'API Integration', progress: 30, status: 'active', members: 2 },
  ]

  return (
    <div className="dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <div>
          <h1>Welcome back, {user?.name}!</h1>
          <p>Here's what's happening with your projects today.</p>
        </div>
        <div className="dashboard-header-actions">
          <button className="btn btn-primary">
            <span>➕</span> New Project
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-content">
              <span className="stat-value">{stat.value}</span>
              <span className="stat-label">{stat.label}</span>
              <span className="stat-change">{stat.change}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="quick-actions-grid">
          {quickActions.map((action, index) => (
            <button key={index} className="quick-action-btn">
              <span className="quick-action-icon" style={{ background: action.color }}>
                {action.icon}
              </span>
              <span>{action.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="dashboard-grid">
        {/* Projects Section */}
        <div className="dashboard-card projects-card">
          <div className="card-header">
            <h2>Active Projects</h2>
            <Link href="#" className="view-all">View All</Link>
          </div>
          <div className="projects-list">
            {projects.map((project) => (
              <div key={project.id} className="project-item">
                <div className="project-info">
                  <h3>{project.name}</h3>
                  <div className="project-meta">
                    <span className={`status-badge ${project.status}`}>
                      {project.status}
                    </span>
                    <span className="members">👥 {project.members}</span>
                  </div>
                </div>
                <div className="project-progress">
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                  <span className="progress-text">{project.progress}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Activity Section */}
        <div className="dashboard-card activity-card">
          <div className="card-header">
            <h2>Recent Activity</h2>
            <Link href="#" className="view-all">View All</Link>
          </div>
          <div className="activity-list">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="activity-item">
                <div className="activity-icon">{activity.icon}</div>
                <div className="activity-content">
                  <p>
                    <strong>{activity.action}</strong>
                    <span className="activity-item-name">{activity.item}</span>
                  </p>
                  <span className="activity-time">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="dashboard-bottom">
        <div className="dashboard-card tips-card">
          <div className="tips-content">
            <span className="tips-icon">💡</span>
            <div>
              <h3>Pro Tip</h3>
              <p>Use keyboard shortcuts to navigate faster. Press <kbd>?</kbd> to see all shortcuts.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <DashboardContent />
    </DashboardLayout>
  )
}
