'use client'

import { useMemo, useState } from 'react'
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import {
  ArrowRight,
  Beaker,
  BookOpen,
  Check,
  ChevronRight,
  CircleHelp,
  FlaskConical,
  Leaf,
  Lightbulb,
  LockKeyhole,
  Menu,
  Play,
  RotateCcw,
  Sparkles,
  Sun,
  Thermometer,
  Wind,
  X,
  Zap,
} from 'lucide-react'

type Lang = 'ru' | 'kk' | 'en'
type ExperimentKey = 'physics' | 'biology' | 'chemistry' | 'math' | 'engineering'
type Step = 'hypothesis' | 'experiment' | 'result'

type Copy = {
  nav: string[]
  heroEyebrow: string
  heroTitle: string
  heroBody: string
  start: string
  how: string
  principle: string
  principleBody: string
  explore: string
  experiments: string
  all: string
  physics: string
  biology: string
  chemistry: string
  math: string
  engineering: string
  available: string
  coming: string
  question: string
  choose: string
  continue: string
  hypothesis: string
  experiment: string
  result: string
  current: string
  resistance: string
  voltage: string
  change: string
  finish: string
  reset: string
  compare: string
  confirmed: string
  notConfirmed: string
  normal: string
  explanation: string
  explain: string
  back: string
  hypothesisOptions: string[]
  light: string
  co2: string
  temperature: string
}

const copy: Record<Lang, Copy> = {
  ru: {
    nav: ['Эксперименты', 'Мой журнал', 'О LabZero'], heroEyebrow: 'Браузерная STEM-лаборатория', heroTitle: 'Экспериментируй.\nНе бойся ошибаться.', heroBody: 'Сначала сделай гипотезу. Потом измени параметры и увидь, что произойдёт на самом деле.', start: 'Начать эксперимент', how: 'Как это работает', principle: 'Мы не даём готовый ответ.', principleBody: 'LabZero превращает любопытство в действие: предскажи → экспериментируй → ошибись → пойми.', explore: 'Исследуй темы', experiments: 'Эксперименты', all: 'Все', physics: 'Физика', biology: 'Биология', chemistry: 'Химия', math: 'Математика', engineering: 'Инженерия', available: 'Доступно сейчас', coming: 'Скоро', question: 'Что произойдёт с током, если увеличить сопротивление при постоянном напряжении?', choose: 'Выбери гипотезу', continue: 'Продолжить', hypothesis: 'Гипотеза', experiment: 'Эксперимент', result: 'Результат', current: 'Сила тока', resistance: 'Сопротивление', voltage: 'Напряжение', change: 'Меняй сопротивление и наблюдай', finish: 'Завершить эксперимент', reset: 'Начать заново', compare: 'Сравнение', confirmed: 'Гипотеза подтвердилась!', notConfirmed: 'Гипотеза не подтвердилась.', normal: 'И это нормально — эксперимент нужен именно для проверки предположений.', explanation: 'При постоянном напряжении увеличение сопротивления приводит к уменьшению силы тока. Это следует из закона Ома.', explain: 'Объясни мне', back: 'Назад', hypothesisOptions: ['Ток увеличится', 'Ток останется прежним', 'Ток уменьшится'], light: 'Свет', co2: 'CO₂', temperature: 'Температура'
  },
  kk: {
    nav: ['Эксперименттер', 'Менің журналым', 'LabZero туралы'], heroEyebrow: 'Браузердегі STEM зертханасы', heroTitle: 'Тәжірибе жаса.\nҚателесуден қорықпа.', heroBody: 'Алдымен болжам жаса. Содан кейін параметрлерді өзгертіп, шын мәнінде не болатынын көр.', start: 'Экспериментті бастау', how: 'Қалай жұмыс істейді', principle: 'Біз дайын жауап бермейміз.', principleBody: 'LabZero қызығушылықты әрекетке айналдырады: болжа → тәжірибе жаса → қателес → түсін.', explore: 'Тақырыптарды зертте', experiments: 'Эксперименттер', all: 'Барлығы', physics: 'Физика', biology: 'Биология', chemistry: 'Химия', math: 'Математика', engineering: 'Инженерия', available: 'Қазір қолжетімді', coming: 'Жақында', question: 'Кернеу тұрақты болғанда кедергіні арттырса, ток күші қалай өзгереді?', choose: 'Болжамыңды таңда', continue: 'Жалғастыру', hypothesis: 'Болжам', experiment: 'Эксперимент', result: 'Нәтиже', current: 'Ток күші', resistance: 'Кедергі', voltage: 'Кернеу', change: 'Кедергіні өзгертіп, бақыла', finish: 'Экспериментті аяқтау', reset: 'Қайта бастау', compare: 'Салыстыру', confirmed: 'Болжам расталды!', notConfirmed: 'Болжам расталмады.', normal: 'Бұл қалыпты — эксперимент болжамдарды тексеру үшін керек.', explanation: 'Кернеу тұрақты болса, кедергінің артуы ток күшінің азаюына әкеледі. Бұл Ом заңынан шығады.', explain: 'Маған түсіндір', back: 'Артқа', hypothesisOptions: ['Ток күші артады', 'Өзгермейді', 'Ток күші азаяды'], light: 'Жарық', co2: 'CO₂', temperature: 'Температура'
  },
  en: {
    nav: ['Experiments', 'My journal', 'About LabZero'], heroEyebrow: 'Browser STEM laboratory', heroTitle: 'Experiment.\nDon’t be afraid to be wrong.', heroBody: 'Make a hypothesis first. Then change the parameters and see what really happens.', start: 'Start experiment', how: 'How it works', principle: 'We don’t give away the answer.', principleBody: 'LabZero turns curiosity into action: predict → experiment → get it wrong → understand.', explore: 'Explore topics', experiments: 'Experiments', all: 'All', physics: 'Physics', biology: 'Biology', chemistry: 'Chemistry', math: 'Math', engineering: 'Engineering', available: 'Available now', coming: 'Coming soon', question: 'What happens to current if resistance increases while voltage stays constant?', choose: 'Choose your hypothesis', continue: 'Continue', hypothesis: 'Hypothesis', experiment: 'Experiment', result: 'Result', current: 'Current', resistance: 'Resistance', voltage: 'Voltage', change: 'Change resistance and observe', finish: 'Finish experiment', reset: 'Start over', compare: 'Comparison', confirmed: 'Hypothesis confirmed!', notConfirmed: 'Hypothesis not confirmed.', normal: 'And that’s okay — experiments exist to test assumptions.', explanation: 'With constant voltage, increasing resistance decreases current. This follows from Ohm’s law.', explain: 'Explain it', back: 'Back', hypothesisOptions: ['Current will increase', 'Current will stay the same', 'Current will decrease'], light: 'Light', co2: 'CO₂', temperature: 'Temperature'
  },
}

const experimentCards = [
  { key: 'physics' as ExperimentKey, icon: Zap, color: 'cyan', title: 'Закон Ома', subtitle: 'Что произойдёт с током?', tag: 'Физика', available: true },
  { key: 'biology' as ExperimentKey, icon: Leaf, color: 'green', title: 'Фотосинтез', subtitle: 'Как свет меняет рост растения?', tag: 'Биология', available: true },
  { key: 'chemistry' as ExperimentKey, icon: FlaskConical, color: 'orange', title: 'Скорость реакции', subtitle: 'Как температура ускоряет реакцию?', tag: 'Химия', available: true },
  { key: 'math' as ExperimentKey, icon: Beaker, color: 'violet', title: 'Линейная функция', subtitle: 'Как k меняет наклон линии?', tag: 'Математика', available: true },
  { key: 'engineering' as ExperimentKey, icon: LockKeyhole, color: 'pink', title: 'Прочный мост', subtitle: 'Построй. Испытай. Улучши.', tag: 'Инженерия', available: true },
]

const chartData = Array.from({ length: 20 }, (_, index) => ({ resistance: index + 1, current: Number((12 / (index + 1)).toFixed(2)) }))

export default function Page() {
  const [lang, setLang] = useState<Lang>('ru')
  const [screen, setScreen] = useState<'home' | 'hypothesis' | 'lab' | 'result'>('home')
  const [step, setStep] = useState<Step>('hypothesis')
  const [hypothesis, setHypothesis] = useState<number | null>(null)
  const [resistance, setResistance] = useState(6)
  const [activeExperiment, setActiveExperiment] = useState<ExperimentKey>('physics')
  const [menuOpen, setMenuOpen] = useState(false)
  const t = copy[lang]
  const current = 12 / resistance
  const resultText = current < 2 ? t.hypothesisOptions[2] : current > 2 ? t.hypothesisOptions[0] : t.hypothesisOptions[1]
  const matches = hypothesis === (current < 2 ? 2 : current > 2 ? 0 : 1)

  const goHome = () => { setScreen('home'); setStep('hypothesis'); setHypothesis(null); setResistance(6) }
  const start = (experiment: ExperimentKey = 'physics') => { setActiveExperiment(experiment); setScreen('hypothesis'); setStep('hypothesis'); setHypothesis(null) }

  return (
    <main className="labzero-shell">
      <header className="site-header">
        <button className="brand" onClick={goHome} aria-label="LabZero home"><span className="brand-mark">L<span>0</span></span><span>LABZERO</span></button>
        <nav className={`main-nav ${menuOpen ? 'is-open' : ''}`}>{t.nav.map((item) => <a key={item} href={item === t.nav[0] ? '#experiments' : '#'} onClick={() => setMenuOpen(false)}>{item}</a>)}</nav>
        <div className="header-actions"><div className="language-switcher" aria-label="Language switcher">{(['ru', 'kk', 'en'] as Lang[]).map((item) => <button key={item} className={lang === item ? 'active' : ''} onClick={() => setLang(item)}>{item.toUpperCase()}</button>)}</div><button className="icon-button menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">{menuOpen ? <X /> : <Menu />}</button></div>
      </header>

      {screen === 'home' && <Home t={t} onStart={start} />}
      {screen !== 'home' && <ExperimentFlow t={t} experiment={activeExperiment} screen={screen} step={step} hypothesis={hypothesis} setHypothesis={setHypothesis} resistance={resistance} setResistance={setResistance} current={current} resultText={resultText} matches={matches} onContinue={() => { setScreen('lab'); setStep('experiment') }} onFinish={() => { setScreen('result'); setStep('result') }} onReset={goHome} />}
    </main>
  )
}

function Home({ t, onStart }: { t: Copy; onStart: (experiment?: ExperimentKey) => void }) {
  const [filter, setFilter] = useState('all')
  const filters = [{ id: 'all', label: t.all }, { id: 'physics', label: t.physics }, { id: 'biology', label: t.biology }, { id: 'chemistry', label: t.chemistry }, { id: 'math', label: t.math }, { id: 'engineering', label: t.engineering }]
  const visible = experimentCards.filter((card) => filter === 'all' || card.key === filter)
  return <>
    <section className="hero-section"><div className="hero-copy"><div className="eyebrow"><span className="eyebrow-line" />{t.heroEyebrow}</div><h1>{t.heroTitle.split('\n').map((line, index) => <span key={line} className={index === 1 ? 'accent-text' : ''}>{line}<br /></span>)}</h1><p>{t.heroBody}</p><div className="hero-actions"><button className="primary-button" onClick={onStart}>{t.start}<ArrowRight /></button><button className="text-button" onClick={() => document.getElementById('how')?.scrollIntoView({ behavior: 'smooth' })}>{t.how}<ChevronRight /></button></div></div><div className="hero-visual" aria-label="Abstract experiment illustration"><div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="core-glow"><div className="core-icon"><Sparkles /></div></div><div className="floating-card card-top"><span className="mini-icon cyan-bg"><Lightbulb /></span><span><strong>01</strong><small>{t.hypothesis}</small></span></div><div className="floating-card card-bottom"><span className="mini-icon green-bg"><Check /></span><span><strong>03</strong><small>{t.result}</small></span></div><div className="dot dot-one" /><div className="dot dot-two" /><div className="dot dot-three" /></div></section>
    <section className="principle-section" id="how"><div><span className="section-kicker">THE LABZERO PRINCIPLE</span><h2>{t.principle}</h2></div><div className="principle-copy"><p>{t.principleBody}</p><div className="cycle"><span>01&nbsp; {t.hypothesis}</span><i>→</i><span>02&nbsp; {t.experiment}</span><i>→</i><span>03&nbsp; {t.result}</span></div></div></section>
    <section className="experiments-section" id="experiments"><div className="section-heading"><div><span className="section-kicker">{t.explore}</span><h2>{t.experiments}</h2></div><div className="filter-pills">{filters.map((item) => <button key={item.id} className={filter === item.id ? 'active' : ''} onClick={() => setFilter(item.id)}>{item.label}</button>)}</div></div><div className="experiment-grid">{visible.map((card) => <ExperimentCard key={card.key} card={card} t={t} onStart={onStart} />)}</div></section>
    <footer className="site-footer"><div className="brand"><span className="brand-mark">L<span>0</span></span><span>LABZERO</span></div><span>© 2025 LabZero · {t.principleBody}</span><span className="footer-status"><span /> SYSTEM ONLINE</span></footer>
  </>
}

function ExperimentCard({ card, t, onStart }: { card: typeof experimentCards[number]; t: Copy; onStart: (experiment: ExperimentKey) => void }) { const Icon = card.icon; return <article className={`experiment-card ${card.color} is-available`}><div className="card-topline"><span className="card-icon"><Icon /></span><span className="card-tag">{card.tag}</span><span className="available-label"><span />{t.available}</span></div><div className="card-content"><h3>{card.title}</h3><p>{card.subtitle}</p><button className="card-link" onClick={() => onStart(card.key)}>{t.start} <ArrowRight /></button></div></article> }

function ExperimentFlow({ t, experiment, screen, step, hypothesis, setHypothesis, resistance, setResistance, current, resultText, matches, onContinue, onFinish, onReset }: { t: Copy; experiment: ExperimentKey; screen: string; step: Step; hypothesis: number | null; setHypothesis: (value: number) => void; resistance: number; setResistance: (value: number) => void; current: number; resultText: string; matches: boolean; onContinue: () => void; onFinish: () => void; onReset: () => void }) {
  return <div className="flow-page"><div className="flow-header"><button className="back-button" onClick={onReset}><ArrowRight className="back-icon" /> {t.back}</button><StepProgress t={t} step={step} /></div>{screen === 'hypothesis' && <section className="hypothesis-screen"><div className="experiment-label"><Zap /> {experiment === 'physics' ? t.physics : experiment === 'biology' ? t.biology : experiment === 'chemistry' ? t.chemistry : experiment === 'math' ? t.math : t.engineering} / {t.experiments}</div><h1>{experiment === 'physics' ? t.question : experiment === 'biology' ? 'Что произойдёт с ростом растения при увеличении света?' : experiment === 'chemistry' ? 'Как температура повлияет на скорость реакции?' : experiment === 'math' ? 'Как изменится график, если увеличить коэффициент наклона?' : 'Выдержит ли конструкция увеличенную нагрузку?'}</h1><p className="flow-lead">{t.choose}</p><div className="hypothesis-options">{t.hypothesisOptions.map((option, index) => <button key={option} className={hypothesis === index ? 'selected' : ''} onClick={() => setHypothesis(index)}><span className="choice-index">0{index + 1}</span><span>{option}</span>{hypothesis === index && <Check />}</button>)}</div><button className="primary-button large" disabled={hypothesis === null} onClick={onContinue}>{t.continue}<ArrowRight /></button></section>}{screen === 'lab' && (experiment === 'physics' ? <LabScreen t={t} resistance={resistance} setResistance={setResistance} current={current} onFinish={onFinish} /> : <GenericLab experiment={experiment} t={t} onFinish={onFinish} />)}{screen === 'result' && <ResultScreen t={t} hypothesis={hypothesis ?? 2} current={current} resistance={resistance} resultText={resultText} matches={matches} onReset={onReset} />}</div>
}

function StepProgress({ t, step }: { t: Copy; step: Step }) { const steps: Step[] = ['hypothesis', 'experiment', 'result']; return <div className="step-progress">{steps.map((item, index) => <div key={item} className={`step-item ${step === item ? 'active' : ''} ${steps.indexOf(step) > index ? 'done' : ''}`}><span>{steps.indexOf(step) > index ? <Check /> : `0${index + 1}`}</span><small>{t[item]}</small>{index < 2 && <i />}</div>)}</div> }

function LabScreen({ t, resistance, setResistance, current, onFinish }: { t: Copy; resistance: number; setResistance: (value: number) => void; current: number; onFinish: () => void }) { const brightness = Math.min(current / 4, 1); return <section className="lab-screen"><div className="experiment-label"><Zap /> {t.experiment} / {t.physics}</div><div className="lab-title-row"><div><h1>{t.change}</h1><p>{t.voltage} = 12 V · I = U / R</p></div><span className="live-pill"><span /> LIVE</span></div><div className="lab-grid"><div className="circuit-panel"><Circuit brightness={brightness} current={current} /><div className="measurement-row"><div><small>{t.current}</small><strong>{current.toFixed(2)} <em>A</em></strong></div><div><small>{t.resistance}</small><strong>{resistance} <em>Ω</em></strong></div><div><small>{t.voltage}</small><strong>12 <em>V</em></strong></div></div></div><div className="controls-panel"><div className="control-title"><span>{t.resistance}</span><strong>{resistance} Ω</strong></div><input aria-label={t.resistance} type="range" min="1" max="20" step="1" value={resistance} onChange={(event) => setResistance(Number(event.target.value))} /><div className="range-labels"><span>1 Ω</span><span>20 Ω</span></div><div className="formula-box"><span>OHM&apos;S LAW</span><strong>I = U / R</strong><small>12 / {resistance} = {current.toFixed(2)} A</small></div><button className="primary-button" onClick={onFinish}>{t.finish}<ArrowRight /></button></div></div><div className="chart-panel"><div className="chart-heading"><div><span className="section-kicker">OBSERVATION</span><h2>{t.current} / {t.resistance}</h2></div><span className="chart-legend"><i /> {t.current}</span></div><div className="chart-wrap"><ResponsiveContainer width="100%" height={250}><AreaChart data={chartData} margin={{ top: 10, right: 5, left: -18, bottom: 0 }}><defs><linearGradient id="cyanGradient" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#62e6ff" stopOpacity={0.25} /><stop offset="100%" stopColor="#62e6ff" stopOpacity={0} /></linearGradient></defs><CartesianGrid stroke="#26303c" vertical={false} /><XAxis dataKey="resistance" stroke="#718092" tickLine={false} axisLine={false} tick={{ fontSize: 11 }} /><YAxis stroke="#718092" tickLine={false} axisLine={false} tick={{ fontSize: 11 }} domain={[0, 12]} /><Tooltip contentStyle={{ background: '#18222d', border: '1px solid #344352', borderRadius: 8, color: '#f5f7fa' }} formatter={(value) => [`${value} A`, 'Current']} labelFormatter={(value) => `Resistance: ${value} Ω`} /><Area type="monotone" dataKey="current" stroke="#62e6ff" strokeWidth={2} fill="url(#cyanGradient)" dot={(props) => { const { cx, cy, payload } = props; return payload.resistance === resistance ? <circle cx={cx} cy={cy} r={6} fill="#62e6ff" stroke="#0b0f14" strokeWidth={3} /> : <circle cx={cx} cy={cy} r={0} /> }} /></AreaChart></ResponsiveContainer></div></div></section> }

function GenericLab({ experiment, t, onFinish }: { experiment: ExperimentKey; t: Copy; onFinish: () => void }) { const [value, setValue] = useState(experiment === 'biology' ? 65 : experiment === 'chemistry' ? 25 : experiment === 'math' ? 2 : 50); const configs = { biology: { title: 'Интенсивность света', unit: '%', metric: 'Рост растения', result: `${Math.round(value * 0.82)} мм`, formula: 'рост ∝ свет', color: 'green' }, chemistry: { title: 'Температура раствора', unit: '°C', metric: 'Скорость реакции', result: `${(value / 10).toFixed(1)}×`, formula: 'скорость ∝ температура', color: 'orange' }, math: { title: 'Коэффициент наклона k', unit: '', metric: 'Значение функции', result: `${(value * 3 + 2).toFixed(0)}`, formula: 'y = kx + b', color: 'violet' }, engineering: { title: 'Нагрузка на мост', unit: ' кг', metric: 'Запас прочности', result: `${Math.max(0, 100 - value)}%`, formula: 'σ = F / A', color: 'pink' } } as const; const config = configs[experiment as keyof typeof configs]; return <section className="lab-screen generic-lab"><div className={`experiment-label ${config.color}`}><Sparkles /> {t.experiment} / {experiment}</div><div className="lab-title-row"><div><h1>{config.title}</h1><p>Измени параметр и наблюдай за моделью в реальном времени</p></div><span className="live-pill"><span /> LIVE</span></div><div className="generic-grid"><div className={`simulation-stage ${config.color}`}><div className="sim-orbit" /><div className="sim-object">{experiment === 'biology' ? <Leaf /> : experiment === 'chemistry' ? <FlaskConical /> : experiment === 'math' ? <span>y = kx</span> : <LockKeyhole />}</div><div className="sim-bars"><i style={{ height: `${Math.max(18, value)}%` }} /><i style={{ height: `${Math.max(12, 100 - value / 2)}%` }} /><i style={{ height: `${Math.max(10, value / 1.4)}%` }} /></div></div><div className="controls-panel"><div className="control-title"><span>{config.title}</span><strong>{value}{config.unit}</strong></div><input aria-label={config.title} type="range" min="1" max="100" value={value} onChange={(event) => setValue(Number(event.target.value))} /><div className="range-labels"><span>1</span><span>100</span></div><div className="formula-box"><span>MODEL OUTPUT</span><strong>{config.result}</strong><small>{config.formula}</small></div><button className="primary-button" onClick={onFinish}>{t.finish}<ArrowRight /></button></div></div><div className="chart-panel observation-strip"><span className="section-kicker">LIVE MEASUREMENT</span><h2>{config.metric}: {config.result}</h2><div className="signal-line" /></div></section> }

function Circuit({ brightness, current }: { brightness: number; current: number }) { return <div className="circuit-wrap"><svg viewBox="0 0 700 280" role="img" aria-label="Virtual electrical circuit" className="circuit-svg"><path className="wire" d="M90 70 H190 M310 70 H430 M570 70 H620 V210 H90 V70" /><path className="flow-line" d="M90 70 H190 M310 70 H430 M570 70 H620 V210 H90 V70" /><g className="battery"><line x1="120" y1="45" x2="120" y2="95" /><line x1="142" y1="55" x2="142" y2="85" /><text x="102" y="125">12 V</text></g><g className="resistor"><path d="M190 70 l15 -18 l25 36 l25 -36 l25 36 l25 -36 l15 18" /><text x="214" y="125">R</text></g><g className="ammeter"><circle cx="500" cy="70" r="38" /><text x="500" y="78" textAnchor="middle">A</text><text x="500" y="130" textAnchor="middle">{current.toFixed(2)} A</text></g><g className="bulb" style={{ opacity: 0.35 + brightness * 0.65 }}><circle className="bulb-glow" cx="350" cy="210" r={25 + brightness * 18} /><path d="M330 190 Q350 165 370 190 Q370 220 350 230 Q330 220 330 190" /><path d="M339 230 H361 M342 238 H358" /></g><text className="component-label" x="290" y="265">RESISTOR</text><text className="component-label" x="470" y="265">AMMETER</text><text className="component-label" x="326" y="155">LAMP</text></svg></div> }

function ResultScreen({ t, hypothesis, current, resistance, resultText, matches, onReset }: { t: Copy; hypothesis: number; current: number; resistance: number; resultText: string; matches: boolean; onReset: () => void }) { return <section className="result-screen"><div className="result-badge"><Check /></div><span className="section-kicker">{t.result.toUpperCase()}</span><h1>{matches ? t.confirmed : t.notConfirmed}</h1><p className="result-lead">{t.normal}</p><div className="result-grid"><div className="comparison-card"><span className="section-kicker">{t.compare}</span><div className="comparison-row"><div><small>{t.hypothesis}</small><strong>{t.hypothesisOptions[hypothesis]}</strong></div><ArrowRight /><div><small>{t.result}</small><strong>{resultText}</strong></div></div><div className="result-values"><span><small>{t.resistance}</small><b>{resistance} Ω</b></span><span><small>{t.current}</small><b>{current.toFixed(2)} A</b></span></div></div><div className="explanation-card"><span className="explanation-icon"><Lightbulb /></span><div><span className="section-kicker">{t.explain}</span><p>{t.explanation}</p><button className="text-button"><Sparkles /> {t.explain}</button></div></div></div><button className="primary-button large" onClick={onReset}><RotateCcw /> {t.reset}</button></section> }
