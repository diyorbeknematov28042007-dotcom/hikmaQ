"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, ArrowUpRight, Blocks, Bot, BrainCircuit, Check, ChevronRight, Command, Gem, Menu, Monitor, Play, Send, Settings2, ShieldCheck, Sparkles, Target, X, Zap } from "lucide-react";
import { HeroVisual } from "./hero-visual";
import { Logo } from "./logo";

const contact = "https://t.me/Hikma_servicebot";

const services = [
  { title: "Landing Page", text: "G‘oyangizni aniq ifodalovchi, tez va ta’sirli sahifalar.", icon: Monitor },
  { title: "Web ilova", text: "Mahsulotingiz uchun qulay va kengayadigan web platforma.", icon: Blocks },
  { title: "Telegram Bot", text: "Biznes jarayonlariga mos foydali bot va Mini App’lar.", icon: Send },
  { title: "AI Integratsiya", text: "Sun’iy intellektni real mahsulot ichida ishga solamiz.", icon: BrainCircuit },
  { title: "Avtomatlashtirish", text: "Takrorlanadigan ishlarni tizimlashtirib, vaqt tejaymiz.", icon: Settings2 },
  { title: "MVP", text: "G‘oyani tez sinash uchun kerakli birinchi versiya.", icon: Command }
];

const advantages = [
  { title: "Yuqori sifat", text: "Har bir detalga e’tibor. Dizayn va kod bir maqsadga xizmat qiladi.", icon: Gem },
  { title: "Strategik yondashuv", text: "Avval muammo va foydalanuvchini tushunamiz, keyin yechim quramiz.", icon: Target },
  { title: "Tez natija", text: "Aniq bosqichlar va muntazam aloqa orqali ishni oldinga siljitamiz.", icon: Zap }
];

const steps = [
  { number: "01", title: "G‘oyani muhokama qilish", text: "Maqsad, auditoriya va talablarni aniqlaymiz." },
  { number: "02", title: "Reja va dizayn", text: "Tuzilma, tajriba va interfeysni loyihalaymiz." },
  { number: "03", title: "Ishlab chiqish", text: "Mahsulotni zamonaviy texnologiyalar bilan quramiz." },
  { number: "04", title: "Test va ishga tushirish", text: "Tekshirib, haqiqiy foydalanishga tayyorlaymiz." }
];

const projects = [
  { name: "Yuristim", type: "LegalTech platforma", variant: "legal", heading: "Huquqiy yordam bir joyda", detail: "AI · Yuristlar · Hujjatlar" },
  { name: "HIKMA", type: "Digital studio", variant: "studio", heading: "Fikrdan mahsulotgacha", detail: "Design · Build · Launch" },
  { name: "Taklifnomachi", type: "Digital taklifnoma", variant: "invite", heading: "Sizning kuningiz. Sizning uslubingiz.", detail: "Online invitation" },
  { name: "Testify", type: "Ta’lim platformasi", variant: "learn", heading: "O‘rganishning yangi usuli", detail: "Learn · Practice · Grow" }
];

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const reduced = useReducedMotion();
  return <motion.div className={className} initial={reduced ? false : { opacity: 0, y: 21 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .13 }} transition={{ duration: reduced ? 0 : .58, delay: reduced ? 0 : delay, ease: [.22, 1, .36, 1] }}>{children}</motion.div>;
}

function PrimaryLink({ children = "Loyihani boshlash", className = "" }: { children?: React.ReactNode; className?: string }) {
  return <a className={`btn btn-primary ${className}`} href={contact} target="_blank" rel="noopener noreferrer">{children}<ArrowRight size={17} strokeWidth={1.7} /></a>;
}

function Header() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const escape = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", escape);
    return () => window.removeEventListener("keydown", escape);
  }, [open]);

  const nav = [ ["Xizmatlar", "#services"], ["Jarayon", "#process"], ["Portfolio", "#portfolio"], ["Biz haqimizda", "#about"], ["Bog‘lanish", "#contact"] ];
  return <header className="site-header" id="top">
    <div className="container header-inner">
      <a href="#top" className="brand-link" aria-label="HIKMA — bosh sahifa"><Logo /></a>
      <nav className="desktop-nav" aria-label="Asosiy menyu">{nav.map(([label, href]) => <a key={href} href={href}>{label}</a>)}</nav>
      <PrimaryLink className="header-cta" />
      <button className="menu-toggle" type="button" aria-label={open ? "Menyuni yopish" : "Menyuni ochish"} aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen(!open)}>{open ? <X size={22} /> : <Menu size={22} />}</button>
    </div>
    {open && <nav className="mobile-nav" id="mobile-nav" aria-label="Mobil menyu">{nav.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}<ArrowUpRight size={17} /></a>)}<a className="mobile-contact" href={contact} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>Loyihani boshlash <ArrowRight size={17} /></a></nav>}
  </header>;
}

function Hero() {
  const reduced = useReducedMotion();
  const lines = [<>G‘oyani kuchli</>, <><span className="mint-text">raqamli mahsulotga</span></>, <>aylantiramiz</>];
  return <section className="hero" aria-labelledby="hero-title">
    <HeroVisual />
    <div className="hero-fade" />
    <div className="container hero-inner">
      <div className="hero-copy">
        <motion.p className="eyebrow hero-eyebrow" initial={reduced ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .22 }}>G‘OYALAR <span>·</span> TEXNOLOGIYA <span>·</span> REAL NATIJALAR</motion.p>
        <h1 id="hero-title">{lines.map((line, i) => <motion.span className="headline-line" key={i} initial={reduced ? false : { opacity: 0, y: 22, filter: "blur(5px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ duration: .65, delay: reduced ? 0 : .30 + i * .12, ease: [.22, 1, .36, 1] }}>{line}</motion.span>)}</h1>
        <motion.p className="hero-description" initial={reduced ? false : { opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .72, duration: .55 }}>HIKMA — zamonaviy raqamli mahsulotlar studiyasi. Biz g‘oyalarni foydalanuvchiga qulay veb-saytlar, ilovalar, Telegram mahsulotlari va AI yechimlariga aylantiramiz.</motion.p>
        <motion.div className="hero-actions" initial={reduced ? false : { opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .82, duration: .55 }}><PrimaryLink /><a className="btn btn-outline" href="#portfolio"><Play size={17} /> Portfolio</a></motion.div>
      </div>
      <motion.div className="hero-stats" initial={reduced ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .98, duration: .55 }} aria-label="HIKMA ish jarayoni"><div><strong>06</strong><span>Xizmat yo‘nalishi</span></div><div><strong>04</strong><span>Aniq bosqich</span></div><div><strong>01</strong><span>Yaxlit mahsulot</span></div><div><strong>∞</strong><span>Imkoniyatlar</span></div></motion.div>
      <div className="hero-card hero-card-top" aria-hidden="true"><span className="card-spark"><Sparkles size={16} /></span><strong>G‘oyadan<br/>real mahsulotgacha</strong><small>Tasavvur. Aniqlik. Natija.</small></div>
      <div className="hero-card hero-card-bottom" aria-hidden="true"><span className="card-triangle">▲</span><div><strong>KELAJAKNI<br/>BIRGA YARATAMIZ</strong><small>Texnologiya &nbsp;×&nbsp; Inson &nbsp;×&nbsp; Imkoniyat</small></div></div>
      <span className="hero-side-label" aria-hidden="true">IDEA <i/> PRODUCT <i/> AUTOMATION <i/> GROWTH</span>
    </div>
  </section>;
}

function Services() { return <section className="panel panel-light services" id="services" aria-labelledby="services-title"><div className="container"><div className="section-header"><div><p className="eyebrow dark-eyebrow">BIZ NIMALAR QILAMIZ?</p><h2 id="services-title">Xizmatlar</h2></div><a href={contact} target="_blank" rel="noopener noreferrer" className="text-link">Loyiha haqida yozish <ArrowRight size={16} /></a></div><div className="service-grid">{services.map((item, index) => <Reveal key={item.title} className="service-card" delay={index * .05}><span className="icon-box"><item.icon size={24} strokeWidth={1.8} /></span><h3>{item.title}</h3><p>{item.text}</p><a className="round-link" href={contact} target="_blank" rel="noopener noreferrer" aria-label={`${item.title} haqida so‘rash`}><ArrowRight size={17} /></a></Reveal>)}</div></div></section>; }

function About() { return <section className="about-section" id="about" aria-labelledby="about-title"><div className="container about-grid"><Reveal className="about-intro"><p className="eyebrow">NIMAGA AYNAN HIKMA?</p><h2 id="about-title">Nega HIKMA</h2><p>Biz shunchaki sayt yoki ilova yaratmaymiz, g‘oyangizni foydalanuvchiga yetadigan raqamli mahsulotga aylantiramiz.</p></Reveal>{advantages.map((item, index) => <Reveal key={item.title} className="advantage" delay={index * .09}><span className="advantage-icon"><item.icon size={22} strokeWidth={1.7} /></span><h3>{item.title}</h3><p>{item.text}</p></Reveal>)}</div></section>; }

function Process() {
  const reduced = useReducedMotion();
  return <section className="panel panel-light process" id="process" aria-labelledby="process-title"><div className="container process-layout"><div className="process-intro"><p className="eyebrow dark-eyebrow">QANDAY ISHLAYMIZ?</p><h2 id="process-title">Jarayon</h2><p>G‘oyani muhokamadan boshlab, aniq va samarali yo‘l bilan tayyor mahsulotga olib boramiz.</p></div><div className="steps"><motion.div className="timeline-progress timeline-horizontal" initial={reduced ? false : { scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true, amount: .5 }} transition={{ duration: reduced ? 0 : 1.6, ease: "easeOut" }} /><motion.div className="timeline-progress timeline-vertical" initial={reduced ? false : { scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true, amount: .5 }} transition={{ duration: reduced ? 0 : 1.6, ease: "easeOut" }} />{steps.map((item, index) => <Reveal key={item.number} className="step" delay={index * .17}><span className="step-number">{item.number}</span><h3>{item.title}</h3><p>{item.text}</p></Reveal>)}</div></div></section>;
}

function Portfolio() { return <section className="portfolio-section" id="portfolio" aria-labelledby="portfolio-title"><div className="container"><div className="section-header"><div><p className="eyebrow">REAL G‘OYALAR</p><h2 id="portfolio-title">Tanlangan loyihalar</h2></div><a className="text-link light-link" href={contact} target="_blank" rel="noopener noreferrer">O‘z loyihangizni boshlang <ArrowRight size={16} /></a></div><div className="project-grid">{projects.map((project, index) => <Reveal key={project.name} className={`project-card project-${project.variant}`} delay={index * .07}><div className="project-top"><div><h3>{project.name}</h3><p>{project.type}</p></div><ArrowUpRight size={19} /></div><div className="project-preview"><div className="preview-nav"><span className="preview-mark">◆</span><span/><span/><span className="preview-pill"/></div><div className="preview-copy"><small>{project.name.toUpperCase()}</small><strong>{project.heading}</strong><em>{project.detail}</em><span className="preview-button">Batafsil <ChevronRight size={10}/></span></div><div className="preview-decoration"><span/><span/><span/></div></div></Reveal>)}</div></div></section>; }

function CallToAction() { return <section className="container final-cta" id="contact" aria-labelledby="cta-title"><div className="cta-orbit" aria-hidden="true"/><div className="cta-content"><p className="eyebrow">KELING, BOSHLAYMIZ</p><h2 id="cta-title">G‘oyangizni<br/><span>haqiqiy mahsulotga</span> aylantiramiz</h2><p>G‘oyangiz haqida suhbatlashamiz. Birgalikda uni kuchli raqamli mahsulotga aylantiramiz.</p></div><div className="cta-action"><PrimaryLink /><span><Check size={15}/> Birinchi qadam — suhbat</span></div></section>; }

function Footer() { return <footer className="site-footer"><div className="container footer-grid"><div><a href="#top" className="brand-link"><Logo /></a><p>Raqamli mahsulotlar orqali<br/>katta imkoniyatlar yaratamiz.</p></div><div><h3>Xizmatlar</h3><a href="#services">Landing Page</a><a href="#services">Web ilova</a><a href="#services">Telegram Bot</a><a href="#services">AI integratsiya</a></div><div><h3>Kompaniya</h3><a href="#about">Biz haqimizda</a><a href="#process">Jarayon</a><a href="#portfolio">Portfolio</a></div><div><h3>Biz bilan bog‘lanish</h3><a href={contact} target="_blank" rel="noopener noreferrer"><Bot size={15}/> Telegram orqali yozing</a><span><ShieldCheck size={15}/> Toshkent, O‘zbekiston</span></div></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} HIKMA. Barcha huquqlar himoyalangan.</span><a href="#top">Yuqoriga qaytish ↑</a></div></footer>; }

export function Landing() { return <><a href="#main" className="skip-link">Asosiy kontentga o‘tish</a><Header /><main id="main"><Hero /><Services /><About /><Process /><Portfolio /><CallToAction /></main><Footer /></>; }
