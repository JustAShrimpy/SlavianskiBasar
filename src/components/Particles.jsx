import { useEffect, useRef } from 'react'

function Particles() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let animationId
    let particles = []
    let dpr = Math.min(window.devicePixelRatio || 1, 2)
    let width = window.innerWidth
    let height = window.innerHeight
    let resizeTimeout

    const resize = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    class Particle {
      constructor() {
        this.reset()
      }

      reset() {
        this.x = Math.random() * width
        this.y = Math.random() * height
        this.size = Math.random() * 2 + 0.8
        this.baseX = this.x
        this.baseY = this.y
        this.speedX = (Math.random() - 0.5) * 0.35
        this.speedY = (Math.random() - 0.5) * 0.35
        this.opacity = Math.random() * 0.35 + 0.15
        this.angle = Math.random() * Math.PI * 2
        this.angleSpeed = (Math.random() - 0.5) * 0.01
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY
        this.angle += this.angleSpeed

        if (this.x < -50) this.x = width + 50
        if (this.x > width + 50) this.x = -50
        if (this.y < -50) this.y = height + 50
        if (this.y > height + 50) this.y = -50
      }

      draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 152, 0, ${this.opacity})`
        ctx.fill()
      }
    }

    const drawTriangle = (p1, p2, p3, alpha) => {
      const gradient = ctx.createLinearGradient(p1.x, p1.y, p3.x, p3.y)
      gradient.addColorStop(0, `rgba(255, 152, 0, ${alpha * 0.35})`)
      gradient.addColorStop(1, `rgba(255, 202, 40, ${alpha * 0.25})`)

      ctx.beginPath()
      ctx.moveTo(p1.x, p1.y)
      ctx.lineTo(p2.x, p2.y)
      ctx.lineTo(p3.x, p3.y)
      ctx.closePath()
      ctx.fillStyle = gradient
      ctx.fill()
    }

    const init = () => {
      particles = []
      const isMobile = width < 768
      const areaFactor = (width * height) / (1920 * 1080)
      const baseCount = isMobile ? 40 : 90
      const count = Math.min(Math.max(baseCount, Math.floor(baseCount * areaFactor)), isMobile ? 60 : 130)
      for (let i = 0; i < count; i++) {
        particles.push(new Particle())
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height)

      particles.forEach((particle) => {
        particle.update()
      })

      const maxDist = width < 768 ? 110 : 140
      const maxConnections = 3

      for (let i = 0; i < particles.length; i++) {
        let connections = 0
        for (let j = i + 1; j < particles.length && connections < maxConnections; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < maxDist) {
            const opacity = 0.12 * (1 - distance / maxDist)
            ctx.beginPath()
            ctx.strokeStyle = `rgba(255, 152, 0, ${opacity})`
            ctx.lineWidth = 0.6
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
            connections++
          }
        }
      }

      for (let i = 0; i < particles.length; i++) {
        const neighbors = []
        for (let j = 0; j < particles.length; j++) {
          if (i === j) continue
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)
          if (distance < maxDist * 0.85) {
            neighbors.push({ p: particles[j], d: distance })
          }
        }

        if (neighbors.length >= 2) {
          neighbors.sort((a, b) => a.d - b.d)
          drawTriangle(particles[i], neighbors[0].p, neighbors[1].p, 0.08)
        }
      }

      particles.forEach((particle) => {
        particle.draw()
      })

      animationId = requestAnimationFrame(animate)
    }

    const isMobileRef = { current: width < 768 }

    resize()
    init()
    animate()

    const handleResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(() => {
        dpr = Math.min(window.devicePixelRatio || 1, 2)
        isMobileRef.current = window.innerWidth < 768
        resize()
        init()
      }, 150)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', handleResize)
      clearTimeout(resizeTimeout)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.55,
      }}
      aria-hidden="true"
    />
  )
}

export default Particles
