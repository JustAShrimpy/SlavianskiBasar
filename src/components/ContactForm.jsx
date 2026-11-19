import { useState } from 'react'
import { useLanguage } from '../context/LanguageContext'

function ContactForm() {
  const { lang } = useLanguage()
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState({})

  const validate = () => {
    const newErrors = {}
    if (!formData.name.trim()) {
      newErrors.name = lang === 'by' ? 'Імя абавязкова' : 'Имя обязательно'
    }
    if (!formData.email.trim()) {
      newErrors.email = lang === 'by' ? 'Email абавязковы' : 'Email обязателен'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = lang === 'by' ? 'Няправільны фармат email' : 'Неверный формат email'
    }
    if (!formData.message.trim()) {
      newErrors.message = lang === 'by' ? 'Паведамленне абавязкова' : 'Сообщение обязательно'
    }
    return newErrors
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = validate()
    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) return

    const subject = encodeURIComponent('Обратная связь с сайта Славянский базар в Витебске')
    const body = encodeURIComponent(`Имя: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`)
    window.location.href = `mailto:justalilshrimp@gmail.com?subject=${subject}&body=${body}`
  }

  const texts = {
    ru: {
      title: 'Обратная связь',
      subtitle: 'Есть вопросы или предложения? Напиши нам',
      name: 'Имя',
      email: 'Email',
      message: 'Сообщение',
      submit: 'Отправить',
    },
    by: {
      title: 'Зваротная сувязь',
      subtitle: 'Есці пытанні ці прапановы? Напішы нам',
      name: 'Імя',
      email: 'Email',
      message: 'Паведамленне',
      submit: 'Адправіць',
    },
  }
  const t = texts[lang]

  return (
    <section className="section" id="contact" style={{ background: 'var(--bg-light)' }}>
      <div className="section-title">
        <h2>{t.title}</h2>
        <p>{t.subtitle}</p>
      </div>
      <form className="contact-form" onSubmit={handleSubmit} noValidate>
        <label htmlFor="name">{t.name}</label>
        <input id="name" type="text" name="name" value={formData.name} onChange={handleChange} aria-invalid={!!errors.name} />
        {errors.name && <span className="error">{errors.name}</span>}

        <label htmlFor="email">{t.email}</label>
        <input id="email" type="email" name="email" value={formData.email} onChange={handleChange} aria-invalid={!!errors.email} />
        {errors.email && <span className="error">{errors.email}</span>}

        <label htmlFor="message">{t.message}</label>
        <textarea id="message" name="message" rows="4" value={formData.message} onChange={handleChange} aria-invalid={!!errors.message} />
        {errors.message && <span className="error">{errors.message}</span>}

        <button type="submit" className="btn btn-primary">{t.submit}</button>
      </form>
    </section>
  )
}

export default ContactForm
