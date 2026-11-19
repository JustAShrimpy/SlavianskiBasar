import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../context/LanguageContext'

function CountUp({ end, duration = 2000, prefix = '', suffix = '' }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const startTime = performance.now()
          const animate = (currentTime) => {
            const elapsed = currentTime - startTime
            const progress = Math.min(elapsed / duration, 1)
            const ease = 1 - Math.pow(1 - progress, 3)
            setCount(end * ease)
            if (progress < 1) requestAnimationFrame(animate)
          }
          requestAnimationFrame(animate)
          observer.disconnect()
        }
      },
      { threshold: 0.5 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [end, duration])

  return (
    <span ref={ref}>
      {prefix}
      {Math.round(count)}
      {suffix}
    </span>
  )
}

function Hero() {
  const { t } = useLanguage()
  const [main, ...restParts] = t.hero.title.split(':')
  const accent = restParts.join(':').trim()

  return (
    <section className="hero" id="hero">
      <div className="hero-content">
        <span className="hero-badge animate-fade-in">{t.hero.badge}</span>
        <h1 className="animate-fade-in">
          {main} <br />
          {accent && <span>{accent}</span>}
        </h1>
        <p className="animate-fade-in">{t.hero.subtitle}</p>
        <p className="hero-mission animate-fade-in">{t.hero.mission}</p>
        <div className="hero-buttons animate-fade-in">
          <a href="#data" className="btn btn-primary">
            {t.hero.more}
          </a>
          <a href="#tips" className="btn btn-secondary">
            {t.hero.tips}
          </a>
        </div>

        <div className="hero-stats">
          <div className="hero-stat">
            <div className="hero-stat-number">
              <CountUp end={35} suffix="+" />
            </div>
            <div className="hero-stat-label">{t.hero.stat1}</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-number">
              <CountUp end={30} suffix="+" />
            </div>
            <div className="hero-stat-label">{t.hero.stat2}</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-number">
              <CountUp end={100} suffix="K+" />
            </div>
            <div className="hero-stat-label">{t.hero.stat3}</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
