import Link from 'next/link'

export default function AboutPage() {
  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="about-hero-grid">
          <div className="about-hero-copy">
            <span className="about-badge">UGA Hacks 11</span>
            <h1>Arcane Fleet</h1>
            <p>
              Built at UGA Hacks 11 for the Cox Challenge, Arcane Fleet turns recycling
              into an enchanted command center. We surface hidden material impact and
              guide users to smarter, greener choices in seconds.
            </p>
            <div className="about-hero-actions">
              <Link href="/signup" className="btn btn-primary btn-large">
                Join The Guild
              </Link>
              <Link href="/" className="btn btn-secondary btn-large">
                Back To Home
              </Link>
            </div>
          </div>
          <div className="about-hero-mascot">
            <div className="mascot-card">
              <div className="mascot-glow" />
              <img
                src="/Gemini_Generated_Image_6en1yi6en1yi6en1.png"
                alt="Magic mascot waving a wand"
                className="mascot-figure"
              />
              <div className="mascot-sparkle" />
            </div>
          </div>
        </div>
      </section>

      <section className="about-section about-brief">
        <div className="about-container">
          <div className="about-brief-grid">
            <div className="about-brief-card">
              <span>Project</span>
              <h3>Brief Introduction</h3>
              <p>
                Our hackathon project blends AI-assisted sorting with magical storytelling
                to make sustainability feel personal, fast, and fun.
              </p>
            </div>
            <div className="about-brief-card">
              <span>Team</span>
              <h3>Meet The Builders</h3>
              <p>Diego Sanchez-Carapia</p>
              <p>Vi Tran</p>
            </div>
          </div>
        </div>
      </section>

      <section className="about-section about-cta">
        <div className="about-container about-cta-inner">
          <div>
            <h2>Thanks For Visiting</h2>
            <p>Ready to explore the magic of circular impact?</p>
          </div>
          <Link href="/signup" className="btn btn-primary btn-large">
            Cast Your First Spell
          </Link>
        </div>
      </section>
    </div>
  )
}
