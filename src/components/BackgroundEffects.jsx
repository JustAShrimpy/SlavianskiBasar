import { useEffect, useRef } from 'react'

function BackgroundEffects() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isMobile = window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768
    const isLowPower = isMobile || prefersReduced

    if (prefersReduced) {
      return
    }

    let width = window.innerWidth
    let height = window.innerHeight
    let dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1 : 2)
    let animationId
    let stars = []
    let rings = []
    let frameCount = 0

    const resize = () => {
      width = window.innerWidth
      height = window.innerHeight
      dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1 : 2)
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      init()
    }

    const init = () => {
      stars = []
      const starCount = isMobile
        ? 45
        : Math.min(Math.floor((width * height) / 18000), 120)
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 1.8 + 0.5,
          opacity: Math.random() * 0.6 + 0.2,
          speed: Math.random() * 0.25 + 0.05,
          twinkleSpeed: Math.random() * 0.02 + 0.005,
          offset: Math.random() * Math.PI * 2,
        })
      }

      rings = []
      const ringCount = isLowPower ? 3 : 6
      for (let i = 0; i < ringCount; i++) {
        rings.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 100 + 60,
          maxRadius: Math.random() * 250 + 180,
          speed: Math.random() * 0.6 + 0.2,
          opacity: Math.random() * 0.15 + 0.05,
        })
      }
    }

    const drawStars = () => {
      stars.forEach((star) => {
        star.opacity += Math.sin(Date.now() * star.twinkleSpeed + star.offset) * 0.005
        star.opacity = Math.max(0.1, Math.min(0.8, star.opacity))
        star.y += star.speed
        if (star.y > height + 10) star.y = -10

        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 152, 0, ${star.opacity})`
        ctx.shadowBlur = isMobile ? 4 : 8
        ctx.shadowColor = 'rgba(255, 152, 0, 0.5)'
        ctx.fill()
        ctx.shadowBlur = 0
      })
    }

    const drawShootingStar = () => {
      if (isMobile || Math.random() > 0.015) return
      const x = Math.random() * width
      const y = Math.random() * (height * 0.3)
      const length = Math.random() * 100 + 60
      const angle = Math.PI / 4
      const gradient = ctx.createLinearGradient(x, y, x - length * Math.cos(angle), y + length * Math.sin(angle))
      gradient.addColorStop(0, 'rgba(255, 152, 0, 0)')
      gradient.addColorStop(0.5, 'rgba(255, 152, 0, 0.6)')
      gradient.addColorStop(1, 'rgba(255, 152, 0, 0)')

      ctx.beginPath()
      ctx.moveTo(x, y)
      ctx.lineTo(x - length * Math.cos(angle), y + length * Math.sin(angle))
      ctx.strokeStyle = gradient
      ctx.lineWidth = 1.5
      ctx.stroke()
    }

    const drawRings = () => {
      rings.forEach((ring) => {
        ring.radius += ring.speed
        if (ring.radius > ring.maxRadius) {
          ring.radius = 0
          ring.x = Math.random() * width
          ring.y = Math.random() * height
        }

        ctx.beginPath()
        ctx.arc(ring.x, ring.y, ring.radius, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(255, 152, 0, ${ring.opacity * (1 - ring.radius / ring.maxRadius)})`
        ctx.lineWidth = 1
        ctx.stroke()
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height)
      drawStars()
      drawRings()
      if (frameCount % 120 === 0) drawShootingStar()
      frameCount++
      animationId = requestAnimationFrame(animate)
    }

    let resizeTimeout
    const handleResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(resize, 150)
    }

    resize()
    animate()

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
        opacity: 0.7,
        mixBlendMode: 'screen',
      }}
      aria-hidden="true"
    />
  )
}

export default BackgroundEffects
