'use client'

import { useEffect, useRef } from 'react'

const MSGS = [
  { from: 'alex', text: 'I started going to the gym again.',           delay: 0 },
  { from: 'maya', text: 'Again?',                                       delay: 900 },
  { from: 'alex', text: "Yeah… this time I'm serious.",                 delay: 1900 },
  { from: 'maya', text: 'You said that in January.',                    delay: 3000 },
  { from: 'alex', text: 'Yeah… and in March.',                          delay: 4000 },
  { from: 'maya', text: '…and last year.',                              delay: 5000 },
  { from: 'alex', text: "I don't understand why I keep quitting.",      delay: 6300 },
  { from: 'maya', text: "You don't quit workouts.",                     delay: 7400 },
  { from: 'maya', text: 'You quit on yourself.',                        delay: 8500, highlight: true },
  { from: 'alex', text: 'I tried motivation. Discipline. Streak apps.', delay: 9800 },
  { from: 'maya', text: 'And when you miss one day?',                   delay: 10900 },
  { from: 'alex', text: 'I feel like I broke everything.',              delay: 11900 },
  { from: 'maya', text: "That's not a discipline problem.",             delay: 13200 },
  { from: 'maya', text: "That's a system problem.",                     delay: 14200, highlight: true },
] as const

export default function Home() {
  const messagesRef  = useRef<HTMLDivElement>(null)
  const phoneRef     = useRef<HTMLDivElement>(null)
  const heroGlowRef  = useRef<HTMLDivElement>(null)
  const chatStarted  = useRef(false)

  /* ── CURSOR ── */
  useEffect(() => {
    const dot  = document.getElementById('cur')
    const ring = document.getElementById('cur-ring')
    if (!dot || !ring) return

    let mx = window.innerWidth / 2, my = window.innerHeight / 2
    let rx = mx, ry = my
    let raf: number

    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY }
    document.addEventListener('mousemove', onMove)

    const onEnter = () => {
      ring.style.width = '48px'
      ring.style.height = '48px'
      ring.style.borderColor = 'rgba(56,191,178,0.7)'
    }
    const onLeave = () => {
      ring.style.width = '32px'
      ring.style.height = '32px'
      ring.style.borderColor = 'rgba(56,191,178,0.4)'
    }
    document.querySelectorAll('a, button').forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    const tick = () => {
      dot.style.left = mx + 'px'
      dot.style.top  = my + 'px'
      rx += (mx - rx) * 0.12
      ry += (my - ry) * 0.12
      ring.style.left = rx + 'px'
      ring.style.top  = ry + 'px'
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      document.removeEventListener('mousemove', onMove)
    }
  }, [])

  /* ── HERO GLOW PARALLAX ── */
  useEffect(() => {
    const glow = heroGlowRef.current
    if (!glow) return
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth  - 0.5) * 30
      const y = (e.clientY / window.innerHeight - 0.5) * 30
      glow.style.transform = `translate(${x}px,${y}px)`
    }
    document.addEventListener('mousemove', onMove)
    return () => document.removeEventListener('mousemove', onMove)
  }, [])

  /* ── NAV SCROLL ── */
  useEffect(() => {
    const nav = document.getElementById('nav')
    if (!nav) return
    const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* ── SCROLL REVEAL ── */
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (!en.isIntersecting) return
        en.target.classList.add('in')
        const rule = en.target.querySelector('.feat-rule') as HTMLElement | null
        if (rule) setTimeout(() => { rule.style.transform = 'scaleX(1)' }, 300)
        obs.unobserve(en.target)
      })
    }, { threshold: 0.13 })
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  /* ── CHAT ENGINE ── */
  useEffect(() => {
    const messagesEl = messagesRef.current
    const phoneEl    = phoneRef.current
    if (!messagesEl || !phoneEl) return

    const TYPING_DUR = 750

    const scrollBottom = () => { messagesEl.scrollTop = messagesEl.scrollHeight }

    const removeTyping = () => {
      document.getElementById('typing-indicator')?.remove()
    }

    const showTyping = (from: string) => {
      removeTyping()
      const isAlex = from === 'alex'
      const row = document.createElement('div')
      row.id = 'typing-indicator'
      row.className = 'typing-row' + (isAlex ? ' right' : '')

      const av = document.createElement('div')
      av.className = isAlex ? 'av-alex' : 'av-maya'
      av.textContent = isAlex ? 'A' : 'M'

      const tb = document.createElement('div')
      tb.className = 'typing-bubbl'
      tb.innerHTML = '<div class="dot"></div><div class="dot"></div><div class="dot"></div>'

      if (isAlex) { row.appendChild(tb); row.appendChild(av) }
      else        { row.appendChild(av); row.appendChild(tb) }

      messagesEl.appendChild(row)
      scrollBottom()
    }

    const addMessage = (msg: typeof MSGS[number]) => {
      const isAlex = msg.from === 'alex'
      const row = document.createElement('div')
      row.className = 'msg-row' + (isAlex ? ' right' : '')

      const av = document.createElement('div')
      av.className = isAlex ? 'av-alex' : 'av-maya'
      av.textContent = isAlex ? 'A' : 'M'

      const bubble = document.createElement('div')
      if ('highlight' in msg && msg.highlight) {
        bubble.className = 'bubble highlight'
        bubble.innerHTML = msg.text + '<span class="hl-bar"></span>'
      } else {
        bubble.className = 'bubble ' + (isAlex ? 'right' : 'left')
        bubble.textContent = msg.text
      }

      if (isAlex) { row.appendChild(bubble); row.appendChild(av) }
      else        { row.appendChild(av); row.appendChild(bubble) }

      messagesEl.appendChild(row)
      scrollBottom()
    }

    const startChat = () => {
      if (chatStarted.current) return
      chatStarted.current = true
      MSGS.forEach(msg => {
        setTimeout(() => showTyping(msg.from), msg.delay)
        setTimeout(() => { removeTyping(); addMessage(msg) }, msg.delay + TYPING_DUR)
      })
    }

    const obs = new IntersectionObserver(entries => {
      entries.forEach(en => { if (en.isIntersecting) { startChat(); obs.disconnect() } })
    }, { threshold: 0, rootMargin: '0px 0px -80px 0px' })

    obs.observe(phoneEl)

    // Fallback if already in view on mount
    requestAnimationFrame(() => {
      const rect = phoneEl.getBoundingClientRect()
      if (rect.top < window.innerHeight) startChat()
    })

    return () => obs.disconnect()
  }, [])

  return (
    <>
      <div id="cur" />
      <div id="cur-ring" />

      {/* NAV */}
      <nav id="nav">
        <div className="nw">
          <a href="#" className="logo">Rep<em>Tran</em></a>
          <div className="nav-links">
            <a href="#system">The System</a>
            <a href="#voices">Stories</a>
            <a href="#begin" className="nav-cta">Begin Realignment</a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="grain" />
        <div className="hero-glow" ref={heroGlowRef} />
        <div className="hero-ring"><div className="hero-ring-dot" /></div>
        <div className="hero-ring2" />
        <div className="hero-bigr">R</div>
        <div className="hw">
          <p className="hero-label">A realignment system</p>
          <h1 className="hero-h1">
            You didn&apos;t<br />
            <span className="struck">fail</span> the workout.<br />
            You <em>quit</em> on<br />yourself.
          </h1>
          <div className="hero-bottom">
            <p className="hero-sub">
              <strong>RepTran</strong> is not another streak tracker.<br />
              It&apos;s the system built for the moment<br />
              after you fall off — and what you do next.
            </p>
            <div className="hero-acts">
              <a href="#begin" className="btn-main">Start Realignment →</a>
              <span className="hero-scroll">Scroll to discover</span>
            </div>
          </div>
        </div>
      </section>

      {/* BAND */}
      <div className="band" aria-hidden="true">
        <div className="band-track">
          {['Identity Builder','Recovery Mode','Trigger Design','Emotional Recovery','Environment Audit','Realignment, Not Restart',
            'Identity Builder','Recovery Mode','Trigger Design','Emotional Recovery','Environment Audit','Realignment, Not Restart'].map((item, i) => (
            <span key={i}><span className="bi">{item}</span><span className="bd">·</span></span>
          ))}
        </div>
      </div>

      {/* MANIFESTO */}
      <section className="manifesto">
        <div className="mw">
          <p className="kicker">The problem with fitness apps</p>
          <p className="reveal">Most fitness apps are built for the version of you <em>that never misses a day.</em></p>
          <p className="reveal" style={{ transitionDelay: '.1s' }}>They track your performance. Your streaks. Your output. And when you miss — they make you feel like you <strong>broke everything.</strong></p>
          <p className="reveal" style={{ transitionDelay: '.2s' }}>RepTran is built for the other moment. The quiet morning after. The missed week. The guilt. The &ldquo;I&apos;ll start again Monday.&rdquo; <em>That&apos;s where we live.</em></p>
          <div className="m-stats">
            <div className="stat reveal" style={{ transitionDelay: '.1s' }}><div className="num">87%</div><div className="lbl">of RepTran users active after 90 days — versus 12% industry average</div></div>
            <div className="stat reveal" style={{ transitionDelay: '.2s' }}><div className="num">4.2×</div><div className="lbl">faster return to training after a lapse</div></div>
            <div className="stat reveal" style={{ transitionDelay: '.3s' }}><div className="num">0</div><div className="lbl">shame-based notifications, streaks, or guilt mechanics</div></div>
          </div>
        </div>
      </section>

      {/* CHAT SECTION */}
      <section className="chat-section">
        <div className="chat-grid-bg" />
        <div className="cw">
          <div className="conv-header">
            <div>
              <p className="kicker">A familiar exchange</p>
              <h2>Every <em>January,</em><br />every March,<br />every year.</h2>
            </div>
            <p className="conv-note">This conversation happens between millions of people — and inside your own head — every time you fall off.</p>
          </div>

          <div className="phone" ref={phoneRef}>
            <div className="phone-notch"><div className="phone-pill" /></div>
            <div className="chat-header">
              <div className="maya-av">M</div>
              <div className="chat-header-info">
                <div className="chat-header-name">Maya</div>
                <div className="chat-header-status"><span className="online-dot" />Online now</div>
              </div>
              <div className="chat-header-actions">
                <button className="icon-btn" aria-label="call">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.17 1.22 2 2 0 012.16 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/></svg>
                </button>
                <button className="icon-btn" aria-label="more">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="rgba(255,255,255,0.4)" stroke="none"><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/><circle cx="5" cy="12" r="1.5"/></svg>
                </button>
              </div>
            </div>
            <div className="messages" ref={messagesRef}>
              <div className="date-label"><span>Today</span></div>
            </div>
            <div className="input-bar">
              <span>Message Maya…</span>
              <button className="send-btn" aria-label="send">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
              </button>
            </div>
          </div>

          <div className="pull-quote reveal" style={{ transitionDelay: '.3s' }}>
            <p>&ldquo;The problem was never the workout. It was the story I told myself the morning after missing one.&rdquo;</p>
            <cite>— Repeated by 94% of RepTran users in their first session</cite>
          </div>
        </div>
      </section>

      {/* DARK BREAK */}
      <section className="dark-break">
        <div className="grain" />
        <div className="dbw reveal">
          <p className="kicker" style={{ color: 'var(--s)' }}>The shift</p>
          <h2>Most apps track<br />your performance.<br /><em>RepTran tracks<br />your return.</em></h2>
          <div className="pills">
            <span className="pill p-t">Not a streak tracker</span>
            <span className="pill p-c">Zero shame mechanics</span>
            <span className="pill p-m">Built around recovery</span>
            <span className="pill p-t">Identity-first design</span>
            <span className="pill p-c">Realignment, not restart</span>
            <span className="pill p-m">Behavioral science backed</span>
          </div>
        </div>
      </section>

      {/* SYSTEM */}
      <section className="system" id="system">
        <div className="sw">
          <div className="sys-header reveal">
            <p className="kicker">The system</p>
            <h2>Five tools. One purpose.<br />Stop quitting on yourself.</h2>
          </div>
          {[
            { num: '01', tag: 'Foundation', tagClass: 'ft', title: 'Identity Builder', desc: "Build the identity of someone who doesn't quit — not through willpower, but through small daily proofs that compound over time. Before habits form, you need to become the person who shows up. That's where we start." },
            { num: '02', tag: 'Most used',  tagClass: 'fc', title: 'Recovery Mode',   desc: "Missing a workout doesn't break the system — it activates Recovery Mode. The streak was never the goal. The goal is what you do next. RepTran gives you a structured path back with zero guilt attached." },
            { num: '03', tag: 'Behavioral', tagClass: 'ft', title: 'Trigger Design',  desc: 'Build environmental and personal cues that automatically bring you back to training. Make starting the default response — not a decision that requires willpower every single time.' },
            { num: '04', tag: 'Breakthrough',tagClass: 'fc', title: 'Emotional Recovery', desc: 'Remove guilt and shame from the equation entirely. Emotions are data, not verdicts. RepTran gives you a space to understand what happened, then move forward — without the punishment spiral that ends every streak.' },
            { num: '05', tag: 'Long-term',  tagClass: 'ft', title: 'Environment Audit', desc: 'Fix the environments that keep stopping you. Design your space, time, and surroundings so that returning to training becomes the path of least resistance — not a battle you have to fight every day.' },
          ].map((f) => (
            <div className="feature reveal" key={f.num}>
              <div>
                <div className="feat-num">{f.num}</div>
                <span className={`feat-tag ${f.tagClass}`}>{f.tag}</span>
              </div>
              <div>
                <h3 className="feat-title">{f.title}</h3>
                <p className="feat-desc">{f.desc}</p>
                <div className="feat-rule" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* VOICES */}
      <section className="voices" id="voices">
        <div className="vw">
          <div className="voices-header">
            <h2 className="voices-title">People who<br />kept <em>coming back</em></h2>
            <p className="voices-note">Real accounts from RepTran users after their first realignment</p>
          </div>
          <div className="vgrid">
            <div className="voice accent reveal">
              <p className="vtext">&ldquo;I&apos;ve quit the gym eight times in four years. With RepTran, I missed three weeks — and still came back. I&apos;ve never done that before in my life.&rdquo;</p>
              <div className="vperson">
                <div className="vav" style={{ background: 'rgba(255,255,255,.2)' }}>SR</div>
                <div><div className="vname">Sarah R.</div><div className="vmeta">Realigned after 23 days off · 6 months consistent</div></div>
              </div>
            </div>
            <div className="voice reveal" style={{ transitionDelay: '.1s' }}>
              <p className="vtext">&ldquo;The Emotional Recovery tool alone changed my relationship with training. I stopped punishing myself and started understanding myself.&rdquo;</p>
              <div className="vperson">
                <div className="vav" style={{ background: 'var(--ac)', boxShadow: '0 0 12px rgba(255,107,90,.4)' }}>MK</div>
                <div><div className="vname">Marcus K.</div><div className="vmeta">Used Recovery Mode 6 times</div></div>
              </div>
            </div>
            <div className="voice reveal" style={{ transitionDelay: '.2s' }}>
              <p className="vtext">&ldquo;No streaks to break. No shame spiral. Just a calm, honest system that says: here&apos;s how you come back. Five months and still here.&rdquo;</p>
              <div className="vperson">
                <div className="vav" style={{ background: 'var(--s)', boxShadow: '0 0 12px rgba(56,191,178,.4)' }}>JP</div>
                <div><div className="vname">Jamie P.</div><div className="vmeta">5 months consistent</div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL DIALOGUE */}
      <section className="final-conv">
        <div className="fcw">
          <p className="ck">The moment it lands</p>
          <div className="final-lines">
            <div className="fl fl-dim reveal">&ldquo;So this isn&apos;t about pushing harder?&rdquo;</div>
            <div className="fl fl-norm reveal" style={{ transitionDelay: '.15s' }}>&ldquo;No.&rdquo;</div>
            <div className="fl fl-big reveal" style={{ transitionDelay: '.3s' }}>&ldquo;It&apos;s about not quitting<br />on yourself anymore.&rdquo;</div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-s" id="begin">
        <div className="grain" />
        <div className="cta-glow" />
        <div className="ctas-w">
          <p className="cta-kicker">Begin</p>
          <h2 className="cta-h">You don&apos;t need<br />more motivation.<br />You need a system<br />that <em>forgives failure.</em></h2>
          <p className="cta-sub">Join 2,400+ people who stopped quitting on themselves.<br />Free to start. No credit card. No streak pressure.</p>
          <div className="cta-btns">
            <a href="#" className="btn-cta">Start Your First Realignment</a>
            <p className="cta-fine">Free · No streaks · No shame</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="fw">
          <div className="flogo">Rep<em>Tran</em></div>
          <div className="flinks">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Contact</a>
          </div>
        </div>
        <div className="fw"><p className="fcopy">© 2025 RepTran · Built for the ones who keep coming back</p></div>
      </footer>
    </>
  )
}