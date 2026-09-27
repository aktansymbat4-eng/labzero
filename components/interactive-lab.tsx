'use client'

import { useMemo, useState } from 'react'
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { ArrowRight, FlaskConical, Leaf, LockKeyhole, Play, RotateCcw, Sparkles } from 'lucide-react'

type ExperimentKey = 'biology' | 'chemistry' | 'math' | 'engineering'
type Copy = { experiment: string; finish: string }

const presets = {
  biology: { title: 'Интенсивность света', unit: '%', color: 'green', metric: 'Скорость фотосинтеза', min: 0, max: 100, initial: 65, icon: Leaf, formula: 'O₂ = свет × 0.1', helper: 'CO₂ 400 ppm · 25°C' },
  chemistry: { title: 'Температура реакции', unit: '°C', color: 'orange', metric: 'Скорость реакции', min: 10, max: 60, initial: 25, icon: FlaskConical, formula: 'v = e^(T / 20)', helper: 'A = 50% · B = 50%' },
  math: { title: 'Коэффициент наклона k', unit: '', color: 'violet', metric: 'Значение функции', min: 1, max: 8, initial: 2, icon: Sparkles, formula: 'y = kx + 2', helper: 'x ∈ [0, 10]' },
  engineering: { title: 'Нагрузка на мост', unit: ' кг', color: 'pink', metric: 'Деформация', min: 0, max: 800, initial: 300, icon: LockKeyhole, formula: 'σ = F / A', helper: '3 опоры · треугольная ферма' },
} as const

export default function InteractiveLab({ experiment, t, onFinish }: { experiment: ExperimentKey; t: Copy; onFinish: () => void }) {
  const config = presets[experiment] ?? presets.engineering
  const [value, setValue] = useState(config.initial)
  const [running, setRunning] = useState(false)
  const Icon = config.icon
  const metricValue = experiment === 'biology' ? value * 0.1 : experiment === 'chemistry' ? Math.exp(value / 20) : experiment === 'math' ? value * 10 + 2 : value < 600 ? value / 42 : 14 + (value - 600) / 8
  const data = useMemo(() => Array.from({ length: 9 }, (_, index) => { const x = config.min + ((config.max - config.min) * index) / 8; return { x: Number(x.toFixed(1)), y: Number((experiment === 'biology' ? x * .1 : experiment === 'chemistry' ? Math.exp(x / 20) : experiment === 'math' ? x * 10 + 2 : x < 600 ? x / 42 : 14 + (x - 600) / 8).toFixed(2)) } }), [config, experiment])
  return <section className="lab-screen generic-lab">
    <div className={`experiment-label ${config.color}`}><Icon /> {t.experiment} / {experiment}</div>
    <div className="lab-title-row"><div><h1>{config.title}</h1><p>{config.helper} · виртуальная модель обновляется в реальном времени</p></div><span className="live-pill"><span /> LIVE</span></div>
    <div className="generic-grid">
      <div className={`simulation-stage ${config.color} ${running ? 'is-running' : ''}`}>
        <div className="sim-orbit" /><div className="sim-object"><Icon /><small>{running ? 'RUNNING' : 'READY'}</small></div>
        {experiment === 'biology' && <div className="plant-growth" style={{ transform: `scaleY(${0.55 + value / 180})` }}><Leaf /></div>}
        {experiment === 'engineering' && <div className="bridge-model" style={{ transform: `skewY(${Math.min(4, value / 180)}deg)` }}><i /><i /><i /></div>}
        {experiment === 'chemistry' && <div className="bubbles">{Array.from({ length: Math.min(10, Math.round(value / 7)) }, (_, i) => <b key={i} style={{ animationDelay: `${i * .12}s` }} />)}</div>}
        {experiment === 'math' && <div className="math-line" style={{ transform: `rotate(${value * 5 - 12}deg)` }} />}
        <div className="sim-bars"><i style={{ height: `${Math.max(16, Math.min(100, metricValue * 3))}%` }} /><i style={{ height: `${Math.max(15, Math.min(100, metricValue * 2.2))}%` }} /><i style={{ height: `${Math.max(12, Math.min(100, metricValue * 1.4))}%` }} /></div>
      </div>
      <div className="controls-panel"><div className="control-title"><span>{config.title}</span><strong>{value}{config.unit}</strong></div><input aria-label={config.title} type="range" min={config.min} max={config.max} step={experiment === 'math' ? .1 : 1} value={value} onChange={(event) => setValue(Number(event.target.value))} /><div className="range-labels"><span>{config.min}{config.unit}</span><span>{config.max}{config.unit}</span></div><div className="formula-box"><span>MODEL</span><strong>{config.formula}</strong><small>{config.metric}: {metricValue.toFixed(1)} {experiment === 'biology' ? 'ед./мин' : experiment === 'engineering' ? 'мм' : 'ед.'}</small></div><button className="primary-button" onClick={() => setRunning(!running)}>{running ? <RotateCcw data-icon="inline-start" /> : <Play data-icon="inline-start" />}{running ? 'Пауза' : 'Запустить'} </button><button className="text-button" onClick={onFinish}>Завершить эксперимент <ArrowRight data-icon="inline-end" /></button></div>
    </div>
    <div className="chart-panel"><div className="chart-heading"><div><span className="section-kicker">OBSERVATION</span><h2>{config.metric} / параметр</h2></div><span className="chart-legend"><i /> LIVE DATA</span></div><div className="chart-wrap"><ResponsiveContainer width="100%" height={250}><AreaChart data={data} margin={{ top: 10, right: 5, left: -18, bottom: 0 }}><defs><linearGradient id={`gradient-${experiment}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="currentColor" stopOpacity={.3} /><stop offset="100%" stopColor="currentColor" stopOpacity={0} /></linearGradient></defs><CartesianGrid stroke="#263442" strokeDasharray="3 6" vertical={false} /><XAxis dataKey="x" stroke="#718092" fontSize={10} /><YAxis stroke="#718092" fontSize={10} /><Tooltip contentStyle={{ background: '#131a22', border: '1px solid #263442', borderRadius: 6, color: '#f5f7fa' }} /><Area type="monotone" dataKey="y" stroke="currentColor" fill={`url(#gradient-${experiment})`} strokeWidth={2} /></AreaChart></ResponsiveContainer></div></div>
  </section>
}
