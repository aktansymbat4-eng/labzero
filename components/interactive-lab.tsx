'use client'

import { useMemo, useState } from 'react'
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { ArrowRight, Beaker, FlaskConical, Gauge, Leaf, LockKeyhole, Play, RotateCcw, Sparkles, Sun, Wind } from 'lucide-react'

type ExperimentKey = 'biology' | 'chemistry' | 'math' | 'engineering'
type Copy = { experiment: string; finish: string }

const presets = {
  biology: { title: 'Интенсивность света', unit: '%', color: 'green', metric: 'Скорость фотосинтеза', min: 0, max: 100, initial: 65, icon: Leaf, formula: 'O₂ = свет × эффективность', helper: 'CO₂ 400 ppm · 25°C' },
  chemistry: { title: 'Температура реакции', unit: '°C', color: 'orange', metric: 'Скорость реакции', min: 10, max: 60, initial: 25, icon: FlaskConical, formula: 'v = k · e^(T / 20)', helper: 'A = 50% · B = 50%' },
  math: { title: 'Коэффициент наклона k', unit: '', color: 'violet', metric: 'Значение функции', min: 1, max: 8, initial: 2, icon: Sparkles, formula: 'y = kx + 2', helper: 'x ∈ [0, 10]' },
  engineering: { title: 'Нагрузка на мост', unit: ' кг', color: 'pink', metric: 'Деформация', min: 0, max: 800, initial: 300, icon: LockKeyhole, formula: 'σ = F / A', helper: '3 опоры · треугольная ферма' },
} as const

export default function InteractiveLab({ experiment, t, onFinish }: { experiment: ExperimentKey; t: Copy; onFinish: () => void }) {
  const config = presets[experiment]
  const [value, setValue] = useState(config.initial)
  const [running, setRunning] = useState(false)
  const [runs, setRuns] = useState<number[]>([])
  const Icon = config.icon
  const photosynthesis = Math.min(10, value < 70 ? value * 0.1 : 7 + (value - 70) * 0.03)
  const reactionRate = Math.exp((value - 10) / 25)
  const metricValue = experiment === 'biology' ? photosynthesis : experiment === 'chemistry' ? reactionRate : experiment === 'math' ? value * 10 + 2 : value < 600 ? value / 42 : 14 + (value - 600) / 8
  const data = useMemo(() => Array.from({ length: 11 }, (_, index) => { const x = config.min + ((config.max - config.min) * index) / 10; const y = experiment === 'biology' ? Math.min(10, x < 70 ? x * .1 : 7 + (x - 70) * .03) : experiment === 'chemistry' ? Math.exp((x - 10) / 25) : experiment === 'math' ? x * 10 + 2 : x < 600 ? x / 42 : 14 + (x - 600) / 8; return { x: Number(x.toFixed(1)), y: Number(y.toFixed(2)) } }), [config, experiment])
  const status = running ? 'RUNNING' : runs.length ? 'OBSERVED' : 'READY'
  const runExperiment = () => { setRunning((current) => !current); if (!running) setRuns((current) => [...current, Number(metricValue.toFixed(1))]) }

  return <section className="lab-screen generic-lab">
    <div className={`experiment-label ${config.color}`}><Icon /> {t.experiment} / {experiment}</div>
    <div className="lab-title-row"><div><h1>{config.title}</h1><p>{config.helper} · виртуальная модель обновляется в реальном времени</p></div><span className="live-pill"><span /> LIVE</span></div>
    <div className="generic-grid">
      <div className={`simulation-stage ${config.color} ${running ? 'is-running' : ''}`}>
        <div className="sim-grid" /><div className="sim-orbit" /><div className="sim-object"><Icon /><small>{status}</small></div>
        {experiment === 'biology' && <><div className="sun-disc"><Sun /></div><div className="plant-growth" style={{ transform: `scaleY(${0.55 + value / 180})` }}><Leaf /></div><div className="oxygen-stream"><i /><i /><i /></div><div className="sim-readout"><strong>{photosynthesis.toFixed(1)}</strong><span>O₂ / мин</span></div></>}
        {experiment === 'chemistry' && <><div className="molecule molecule-a"><b /><i /><b /></div><div className="molecule molecule-b"><b /><i /><b /></div><div className="bubbles">{Array.from({ length: Math.min(16, Math.round(value / 4)) }, (_, i) => <b key={i} style={{ animationDelay: `${i * .09}s`, left: `${12 + (i * 23) % 76}%` }} />)}</div><div className="sim-readout"><strong>{reactionRate.toFixed(1)}×</strong><span>скорость</span></div></>}
        {experiment === 'engineering' && <><div className="bridge-model" style={{ transform: `skewY(${Math.min(4, value / 180)}deg)` }}><i /><i /><i /><i /><i /></div><div className="bridge-deck" /><div className="load-marker"><Gauge /> {value} кг</div><div className="sim-readout"><strong>{value < 600 ? 'СТАБИЛЕН' : 'ПРЕДЕЛ'}</strong><span>{metricValue.toFixed(1)} мм прогиб</span></div></>}
        {experiment === 'math' && <><div className="math-axis" /><div className="math-line" style={{ transform: `rotate(${value * 5 - 12}deg)` }} /><div className="sim-readout"><strong>y = {value}x + 2</strong><span>линейная модель</span></div></>}
        <div className="sim-bars"><i style={{ height: `${Math.max(16, Math.min(100, metricValue * 3))}%` }} /><i style={{ height: `${Math.max(15, Math.min(100, metricValue * 2.2))}%` }} /><i style={{ height: `${Math.max(12, Math.min(100, metricValue * 1.4))}%` }} /></div>
      </div>
      <div className="controls-panel"><div className="control-title"><span>{config.title}</span><strong>{value}{config.unit}</strong></div><input aria-label={config.title} type="range" min={config.min} max={config.max} step={experiment === 'math' ? .1 : 1} value={value} onChange={(event) => setValue(Number(event.target.value))} /><div className="range-labels"><span>{config.min}{config.unit}</span><span>{config.max}{config.unit}</span></div>
        {experiment === 'biology' && <div className="parameter-pills"><span><Wind /> CO₂ 400 ppm</span><span><Sun /> свет влияет на O₂</span></div>}
        {experiment === 'chemistry' && <div className="parameter-pills"><span><Beaker /> A 50% + B 50%</span><span>Только температура меняется</span></div>}
        {experiment === 'engineering' && <div className="parameter-pills"><span>3 опоры</span><span>Треугольная ферма</span></div>}
        <div className="formula-box"><span>MODEL</span><strong>{config.formula}</strong><small>{config.metric}: {metricValue.toFixed(1)} {experiment === 'biology' ? 'ед./мин' : experiment === 'engineering' ? 'мм' : 'ед.'}</small></div><button className="primary-button" onClick={runExperiment}>{running ? <RotateCcw data-icon="inline-start" /> : <Play data-icon="inline-start" />}{running ? 'Пауза' : 'Запустить'} </button><button className="text-button" onClick={onFinish}>Завершить эксперимент <ArrowRight data-icon="inline-end" /></button>
        {runs.length > 0 && <div className="run-history"><span>ПОПЫТКИ</span><div>{runs.slice(-4).map((run, index) => <b key={`${run}-${index}`}>{run}</b>)}</div></div>}
      </div>
    </div>
    <div className="chart-panel"><div className="chart-heading"><div><span className="section-kicker">OBSERVATION</span><h2>{config.metric} / параметр</h2></div><span className="chart-legend"><i /> LIVE DATA</span></div><div className="chart-wrap"><ResponsiveContainer width="100%" height={250}><AreaChart data={data} margin={{ top: 10, right: 5, left: -18, bottom: 0 }}><defs><linearGradient id={`gradient-${experiment}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="currentColor" stopOpacity={.3} /><stop offset="100%" stopColor="currentColor" stopOpacity={0} /></linearGradient></defs><CartesianGrid stroke="#263442" strokeDasharray="3 6" vertical={false} /><XAxis dataKey="x" stroke="#718092" fontSize={10} /><YAxis stroke="#718092" fontSize={10} /><Tooltip contentStyle={{ background: '#131a22', border: '1px solid #263442', borderRadius: 6, color: '#f5f7fa' }} /><Area type="monotone" dataKey="y" stroke="currentColor" fill={`url(#gradient-${experiment})`} strokeWidth={2} /></AreaChart></ResponsiveContainer></div></div>
  </section>
}
