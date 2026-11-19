import { useState, useEffect } from 'react'
import { useLanguage } from '../context/LanguageContext'

function Quiz() {
  const { t } = useLanguage()
  const questions = t.quiz.questions

  const [current, setCurrent] = useState(() => {
    const saved = localStorage.getItem('slavianski-bazar-quiz-current')
    return saved ? Number(saved) : 0
  })
  const [selected, setSelected] = useState(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(() => {
    const saved = localStorage.getItem('slavianski-bazar-quiz-score')
    return saved ? Number(saved) : 0
  })
  const [finished, setFinished] = useState(false)

  useEffect(() => {
    localStorage.setItem('slavianski-bazar-quiz-current', current)
    localStorage.setItem('slavianski-bazar-quiz-score', score)
  }, [current, score])

  const handleAnswer = (index) => {
    if (selected !== null) return
    setSelected(index)
    if (index === questions[current].correct) {
      setScore((s) => s + 1)
    }
    setShowResult(true)
  }

  const nextQuestion = () => {
    if (current + 1 < questions.length) {
      setCurrent((c) => c + 1)
      setSelected(null)
      setShowResult(false)
    } else {
      setFinished(true)
    }
  }

  const restart = () => {
    setCurrent(0)
    setSelected(null)
    setShowResult(false)
    setScore(0)
    setFinished(false)
    localStorage.removeItem('slavianski-bazar-quiz-current')
    localStorage.removeItem('slavianski-bazar-quiz-score')
  }

  const progress = questions.length > 0 ? ((finished ? questions.length : current) / questions.length) * 100 : 0

  if (finished) {
    return (
      <section className="section" id="quiz" style={{ background: 'var(--bg-light)' }}>
        <div className="quiz-container">
          <h2>{t.quiz.result}</h2>
          <p className="quiz-score">
            {score} {t.quiz.correct} {questions.length}
          </p>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: '100%' }} />
          </div>
          <button className="btn btn-primary" onClick={restart}>
            {t.quiz.restart}
          </button>
        </div>
      </section>
    )
  }

  const q = questions[current]

  return (
    <section className="section" id="quiz" style={{ background: 'var(--bg-light)' }}>
      <div className="section-title">
        <h2>{t.quiz.title}</h2>
        <p>{t.quiz.subtitle}</p>
      </div>
      <div className="quiz-container">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>
          {t.quiz.progress}: {current + 1}/{questions.length}
        </p>
        <div className="quiz-question">{q.q}</div>
        <div className="quiz-options">
          {q.a.map((option, index) => (
            <button
              key={index}
              className={`quiz-option ${
                showResult
                  ? index === q.correct
                    ? 'correct'
                    : index === selected
                      ? 'wrong'
                      : ''
                  : ''
              }`}
              onClick={() => handleAnswer(index)}
            >
              {option}
            </button>
          ))}
        </div>
        {showResult && (
          <button className="btn btn-primary" onClick={nextQuestion} style={{ marginTop: '1.5rem' }}>
            {current + 1 < questions.length ? t.quiz.next : t.quiz.finish}
          </button>
        )}
      </div>
    </section>
  )
}

export default Quiz
