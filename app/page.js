'use client'

import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'

export default function LandingPage() {
  const { isAuthenticated } = useAuth()

  return (
    <div className="landing">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Build Something
            <span className="hero-highlight"> Amazing</span>
          </h1>
          <p className="hero-subtitle">
            The all-in-one platform to bring your ideas to life.
            Start building today with powerful tools and seamless experience.
          </p>
          <div className="hero-buttons">
            {isAuthenticated ? (
              <Link href="/dashboard" className="btn btn-primary btn-large">
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link href="/signup" className="btn btn-primary btn-large">
                  Get Started
                </Link>
                <Link href="/login" className="btn btn-secondary btn-large">
                  Sign In
                </Link>
              </>
            )}
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-shape"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2 className="section-title">Why Choose Us</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Lightning Fast</h3>
            <p>Optimized for speed and performance. Your experience will be seamless.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3>Secure</h3>
            <p>Enterprise-grade security to keep your data safe and protected.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🎨</div>
            <h3>Beautiful Design</h3>
            <p>Modern and intuitive interface that's a pleasure to use.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🚀</div>
            <h3>Scalable</h3>
            <p>Grows with your needs. From prototype to production.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <h2>Ready to get started?</h2>
        <p>Join thousands of users who are already building amazing things.</p>
        {!isAuthenticated && (
          <Link href="/signup" className="btn btn-primary btn-large">
            Get Started Free
          </Link>
        )}
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2025 MyApp. All rights reserved.</p>
      </footer>
    </div>
  )
}
