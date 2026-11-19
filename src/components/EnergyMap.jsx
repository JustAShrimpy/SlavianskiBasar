import { useState } from 'react'
import { useLanguage } from '../context/LanguageContext'

export default function EnergyMap() {
  const { t } = useLanguage()
  const m = t.energyMap
  const [activeId, setActiveId] = useState(m.regions[0]?.id)

  const active = m.regions.find((r) => r.id === activeId) || m.regions[0]

  return (
    <section className="section" id="map" style={{ background: 'var(--bg-light)' }}>
      <div className="section-title">
        <h2>{m.title}</h2>
        <p>{m.subtitle}</p>
      </div>

      <div className="venues-layout">
        <div className="venues-tabs" role="tablist" aria-label={m.title}>
          {m.regions.map((region) => (
            <button
              key={region.id}
              type="button"
              role="tab"
              className={`venue-tab ${region.id === activeId ? 'active' : ''}`}
              onClick={() => setActiveId(region.id)}
              aria-selected={region.id === activeId}
            >
              {region.name}
            </button>
          ))}
        </div>

        <div className="venues-detail">
          <h3>{active.name}</h3>
          <ul className="station-list">
            {active.stations.map((station) => (
              <li className="station-item" key={station.name}>
                <span className="venue-type">{station.type}</span>
                <div className="station-info">
                  <strong>{station.name}</strong>
                  <span className="station-desc">{m.types[station.type]}</span>
                </div>
                <span className="station-power">{station.power}</span>
              </li>
            ))}
          </ul>
          <p className="map-hint">{m.hint}</p>
          <p className="map-note">{m.note}</p>
        </div>
      </div>
    </section>
  )
}
