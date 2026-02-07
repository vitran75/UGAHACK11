'use client'

import Link from 'next/link'

export default function AboutPage() {
  const teamMembers = [
    { name: 'Diego Sanchez-Carapia', role: 'Developer', avatar: '👨‍💻' },
    { name: 'Vi Tran', role: 'Developer', avatar: '👩‍💻' },
  ]

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero-content">
          <span className="about-badge">UGA Hacks 11</span>
          <h1>About Us</h1>
          <p>Built with passion at UGA Hacks 11 for the Cox Challenge</p>
        </div>
      </section>

      {/* Project Info */}
      <section className="about-section">
        <div className="about-container">
          <div className="about-grid">
            <div className="about-card">
              <div className="about-card-icon">🏆</div>
              <h3>The Challenge</h3>
              <p>Cox Communications Challenge at UGA Hacks 11</p>
            </div>
            <div className="about-card">
              <div className="about-card-icon">🎯</div>
              <h3>The Hackathon</h3>
              <p>UGA Hacks 11 - University of Georgia's Premier Hackathon</p>
            </div>
            <div className="about-card">
              <div className="about-card-icon">⚡</div>
              <h3>Built In</h3>
              <p>36 hours of coding, collaboration, and creativity</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Project */}
      <section className="about-section about-project">
        <div className="about-container">
          <h2>Our Project</h2>
          <p className="about-description">
            This project was created during UGA Hacks 11 as part of the Cox Challenge.
            We built a modern, user-friendly platform that showcases innovative solutions
            and demonstrates the power of collaborative development.
          </p>
          <div className="tech-stack">
            <span className="tech-tag">Next.js</span>
            <span className="tech-tag">React</span>
            <span className="tech-tag">CSS</span>
            <span className="tech-tag">JavaScript</span>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="about-section about-team">
        <div className="about-container">
          <h2>Meet The Team</h2>
          <div className="team-grid">
            {teamMembers.map((member, index) => (
              <div key={index} className="team-card">
                <div className="team-avatar">{member.avatar}</div>
                <h3>{member.name}</h3>
                <p>{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta">
        <h2>Ready to get started?</h2>
        <p>Join us and explore what we've built!</p>
        <div className="about-cta-buttons">
          <Link href="/signup" className="btn btn-primary btn-large">
            Get Started
          </Link>
          <Link href="/" className="btn btn-secondary btn-large">
            Back to Home
          </Link>
        </div>
      </section>
    </div>
  )
}
