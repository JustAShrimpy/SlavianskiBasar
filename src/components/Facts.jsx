import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../context/LanguageContext'

function AnimatedNumber({ value, suffix }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const startTime = performance.now()
          const animate = (currentTime) => {
            const elapsed = currentTime - startTime
            const progress = Math.min(elapsed / 1500, 1)
            const ease = 1 - Math.pow(1 - progress, 3)
            setCount(Number((value * ease).toFixed(1)))
            if (progress < 1) requestAnimationFrame(animate)
          }
          requestAnimationFrame(animate)
          observer.disconnect()
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [value])

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  )
}

function Facts() {
  const { t } = useLanguage()
  const facts = [t.facts.fact1, t.facts.fact2, t.facts.fact3, t.facts.fact4, t.facts.fact5, t.facts.fact6]

  return (
    <section className="section" id="facts">
      <div className="section-title">
        <h2>{t.facts.title}</h2>
        <p>{t.facts.subtitle}</p>
      </div>
      <div className="facts-grid">
        {facts.map((fact, index) => (
          <div className="fact-card" key={index}>
            <div className="fact-number">
              <AnimatedNumber value={fact.value} suffix={fact.suffix} />
            </div>
            <div className="fact-label">{fact.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Facts
