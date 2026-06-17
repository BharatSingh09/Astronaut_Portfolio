import { useEffect, useRef, useState, Suspense} from 'react'
import {Canvas , useFrame } from "@react-three/fiber"
import { useProgress } from "@react-three/drei"
import { useNavigate } from 'react-router-dom'
import * as THREE from "three"
import './Homepage.css'
import Model from './Model'
import Movingstar from './Movingstar'
// ── Loader overlay ──────────────────────────────────────────────────────────
function LoaderOverlay({ progress, audioReady }) {
    const totalProgress = Math.round((progress * 0.7) + (audioReady ? 30 : 0))
 
    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            background: '#000',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 100,
            gap: '24px',
        }}>
            <div style={{
                fontFamily: 'Orbitron, sans-serif',
                fontSize: '13px',
                letterSpacing: '0.35em',
                color: 'rgba(255,255,255,0.4)',
                textTransform: 'uppercase',
            }}>
                Loading Experience
            </div>
 
            <div style={{
                width: '220px',
                height: '2px',
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '2px',
                overflow: 'hidden',
            }}>
                <div style={{
                    width: `${totalProgress}%`,
                    height: '100%',
                    background: 'white',
                    borderRadius: '2px',
                    transition: 'width 0.4s ease',
                }} />
            </div>
 
            <div style={{
                fontFamily: 'Orbitron, sans-serif',
                fontSize: '11px',
                color: 'rgba(255,255,255,0.3)',
                letterSpacing: '0.2em',
            }}>
                {totalProgress}%
            </div>
        </div>
    )
}
 
// ── Inner component that reads drei's useProgress ───────────────────────────
function SceneProgressReader({ onProgress }) {
    const { progress } = useProgress()
    useEffect(() => { onProgress(progress) }, [progress])
    return null
}
export default function Homepage(){
    const [page, setPage] = useState(0)
    const [startAnimation, setStartAnimation] = useState(false)
    const [everythingLoaded, setEverythingLoaded] = useState(false)
    const [sceneProgress, setSceneProgress] = useState(0)
    const [audioReady, setAudioReady] = useState(false)
    const [imagesReady, setImagesReady] = useState(false)
    const navigate = useNavigate();

    const audioRef = useRef(null);

    const MAX_PAGE = 8
    const scrollLocked = useRef(false)
    const touchStartY = useRef(null)

    // Wheel scroll — one section per scroll gesture
    useEffect(() => {
        const handleWheel = (e) => {
            if (!startAnimation) return
            if (scrollLocked.current) return
            scrollLocked.current = true
            setTimeout(() => { scrollLocked.current = false }, 1000)

            if (e.deltaY > 0) {
                setPage(p => Math.min(p + 1, MAX_PAGE))
            } else {
                setPage(p => Math.max(p - 1, 0))
            }
        }

        window.addEventListener('wheel', handleWheel, { passive: true })
        return () => window.removeEventListener('wheel', handleWheel)
    }, [startAnimation])

    // Touch scroll support (mobile)
    useEffect(() => {
        const handleTouchStart = (e) => {
            touchStartY.current = e.touches[0].clientY
        }
        const handleTouchEnd = (e) => {
            if (!startAnimation || touchStartY.current === null) return
            const delta = touchStartY.current - e.changedTouches[0].clientY
            if (Math.abs(delta) < 30) return  // ignore tiny swipes
            if (scrollLocked.current) return
            scrollLocked.current = true
            setTimeout(() => { scrollLocked.current = false }, 1000)

            if (delta > 0) {
                setPage(p => Math.min(p + 1, MAX_PAGE))
            } else {
                setPage(p => Math.max(p - 1, 0))
            }
            touchStartY.current = null
        }

        window.addEventListener('touchstart', handleTouchStart, { passive: true })
        window.addEventListener('touchend', handleTouchEnd, { passive: true })
        return () => {
            window.removeEventListener('touchstart', handleTouchStart)
            window.removeEventListener('touchend', handleTouchEnd)
        }
    }, [startAnimation])

    // Track audio readiness
    useEffect(() => {
        const audio = audioRef.current
        if (!audio) return
        const onCanPlay = () => setAudioReady(true)
        audio.addEventListener('canplaythrough', onCanPlay)
        if (audio.readyState >= 4) setAudioReady(true)
        return () => audio.removeEventListener('canplaythrough', onCanPlay)
    }, [])
 
    // Preload images
    useEffect(() => {
        const srcs = ['/logo.png', './telegram.png']
        let loaded = 0
        srcs.forEach(src => {
            const img = new Image()
            img.onload = img.onerror = () => {
                loaded++
                if (loaded === srcs.length) setImagesReady(true)
            }
            img.src = src
        })
    }, [])
 
    // Gate: all three signals green
    useEffect(() => {
        if (sceneProgress >= 100 && audioReady && imagesReady) {
            const t = setTimeout(() => setEverythingLoaded(true), 400)
            return () => clearTimeout(t)
        }
    }, [sceneProgress, audioReady, imagesReady])

    const startExperience = async () => {
        try {
        // Play audio first
        await audioRef.current.play()

        // Then start animation
        setStartAnimation(true)
        } catch (err) {
        console.log('Autoplay blocked:', err)
        }
    }
    return(
        <>
            <audio
                ref={audioRef}
                src="/Intro_Me.mp3"
                preload="auto"
            />
            {/* Loading overlay */}
            {!everythingLoaded && (
                <LoaderOverlay
                    progress={sceneProgress}
                    audioReady={audioReady}
                />
            )}

            {/* Start Button */}
            {everythingLoaded && !startAnimation && (
                <div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection:'column',
                    alignItems: 'center',
                    // 50% transparent black background
                    background: 'rgba(0, 0, 0, 0.5)',
                    zIndex: 50,
                     animation: 'fadeIn 0.6s ease'
                }}
                >
                <div style={{
                    fontFamily: 'Orbitron, sans-serif',
                    fontSize: '12px',
                    fontWeight: '400',
                    color:'white'
                }}>Use Desktop for better experience</div><br/>
                <button
                    onClick={startExperience}
                    style={{
                    padding: '12px 24px',
                    fontFamily: 'Orbitron, sans-serif',
                    fontSize: '15px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    borderRadius: '10px',
                    border: 'none',
                    }}
                >
                    Enter Experience
                </button>
                </div>
            )}

            <div className='canvas-container'>
                <Canvas camera={{ position: [0, 0, 8] }}>
                    <SceneProgressReader onProgress={setSceneProgress} />
                    <Suspense fallback={null}>
                        <Movingstar page={page} />
                        <directionalLight position={[-3, 0, 5]} intensity={0.25} />
                        <directionalLight position={[3, 0, 5]} intensity={1} />
                        <Model
                            position={[0, -4, 0]}
                            scale={[1, 1, 1]}
                            audioRef={audioRef}
                            startAnimation={startAnimation}
                        />
                    </Suspense>
                </Canvas>
            </div>
      
            <div className='cantroller'>
                <div className='logo'><img src='/logo.png' alt='logo'/></div>
                <div className='nav_btn' onClick={()=>{setPage(0)}}>
                HOMEPAGE
                </div>
                <div className='nav_btn' onClick={()=>{setPage(2)}}>
                EDUCATION
                </div>
                <div className='nav_btn' onClick={()=>{setPage(4)}}>
                EXPERIENCE
                </div>
                <div className='nav_btn' onClick={()=>{setPage(6)}}>
                SKILL 
                </div>
                {/* <div className='nav_btn' onClick={()=>{setPage(8)}}>
                SOCIAL
                </div> */}
                <div className='connect' onClick={()=>{navigate('/connect')}}><img src='./telegram.png' alt='connect'/> Connect</div>
            </div>
            <div className='container_main'style={{
                transform: `translateY(-${page*100}vh)`,
                transition: 'transform 1s linear'
            }}>
                {/* home page */}
                <div className='layer_1'>
                    <div className='intro'>
                        <span className='hero_subtitle'>Hello! I am</span>
                        <span className='hero_title'>Bharat Singh</span>
                        <span className='hero_role'>AI & ML | Software Engineer</span> <br/>
                        <span className='hero_description'> An AI & ML focues Software Engineer creating intelligent digital solutions.</span>
                        <span className='hero_description'>From Computer Vision systems and AI Chatbots to<br/>
                        Web Apps, Desktop Software, and Automation Modules</span>
                        <span className='hero_description'>I design and develop technology that solves real-world<br/>
                        problems efficiently.</span>
                    </div>
                </div>
                <div className='layer_2'>
                </div>
                <div className='layer_3'>
                <section className="glass-card education-section">
                    <h2 className="section-title">EDUCATION</h2>

                    <div className="edu-item">
                    <div>
                        <h3 className="edu-degree">B.Tech CS (AIML)</h3>
                        <p className="edu-school">GLA University, Mathura</p>
                    </div>

                    <div className="edu-right">
                        <span className="edu-year">2021 - 2025</span>
                        <span className="edu-score">CPI: 8.15</span>
                    </div>
                    </div>


                    <div className="edu-item">
                    <div>
                        <h3 className="edu-degree">Intermediate</h3>
                        <p className="edu-school">DAV Public School, Faridabad</p>
                    </div>

                    <div className="edu-right">
                        <span className="edu-year">2021</span>
                        <span className="edu-score">86.2%</span>
                    </div>
                    </div>


                    <div className="edu-item">
                    <div>
                        <h3 className="edu-degree">High School</h3>
                        <p className="edu-school">DAV Public School, Faridabad</p>
                    </div>

                    <div className="edu-right">
                        <span className="edu-year">2019</span>
                        <span className="edu-score">87.88%</span>
                    </div>
                    </div>
                </section>
                </div>
                <div className='layer_4'>
                </div>
                <div className='layer_5'>
                <section className="glass-card experience-section">
                    <h2 className="section-title">EXPERIENCE</h2>

                    <div className="timeline">

                    <div className="timeline-item">
                        <div className="timeline-dot"></div>

                        <div className="timeline-content">
                        <h3 className="exp-role">Software Engineer</h3>

                        <div className="exp-company-row">
                            <p className="exp-company">Quadrant Future Tek Ltd. — Hyderabad</p>
                            <span className="exp-date">Mar 2025 - Present</span>
                        </div>

                        <ul className="exp-list">
                            <h3>Project: KAVACH (Indian railways)</h3>
                            <li>Develop Automation Tools</li>
                            <li>Developing Qt(C++) desktop applications for railway safety systems.</li>
                            <li>Build NMS-VDU for visualisation simulation of train movements.</li>
                            <li>Designing Computer Vision models for OCR and object detection.</li>
                        </ul>
                        </div>
                    </div>
                    <div className="timeline-item">
                        <div className="timeline-dot"></div>

                        <div className="timeline-content">
                        <h3 className="exp-role">AIML Python Intern</h3>

                        <div className="exp-company-row">
                            <p className="exp-company">SynapseIndia — Noida</p>
                            <span className="exp-date">Sep 2024 - Jan 2025</span>
                        </div>

                        <ul className="exp-list">
                            <li>Built RAG chatbot systems using LangChain and OpenAI.</li>
                            <li>Developed document parsing and web scraping pipelines.</li>
                            <li>Built full-stack applications using Django and React.</li>
                            <li>Integrated OCR and Computer Vision models.</li>
                        </ul>
                        </div>
                    </div>

                    </div>
                </section>
                </div>
                <div className='layer_6'>
                </div>
                <div className='layer_7' style={{gap:'20%'}}>
                <div style={{width:'40%'}}>
                    <section className="glass-card skill-section">
                    <h2 className="section-title">TECHNICAL SKILLS</h2>

                    <div className="skills-container">
                        <div className="skill-tag">Python</div>
                        <div className="skill-tag">C++</div>
                        <div className="skill-tag">DSA</div>
                        <div className="skill-tag">AI & ML</div>
                        <div className="skill-tag">Qt (C++)</div>
                        <div className="skill-tag">Flask</div>
                        <div className="skill-tag">Django</div>
                        <div className="skill-tag">React.js</div>
                        <div className="skill-tag">OpenCV</div>
                        <div className="skill-tag">LangChain</div>
                        <div className="skill-tag">Git</div>
                        <div className="skill-tag">Linux</div>
                        <div className="skill-tag">ChromaDB</div>
                    </div>
                    </section>
                </div>
                <div style={{width:'40%'}}>
                    {/* softskill */}
                    <section className="glass-card softskill-section">
                    <h2 className="section-title">SOFT SKILLS</h2>

                    <ul className="softskill-list">
                        <li>Problem Solving</li>
                        <li>Critical Thinking</li>
                        <li>Team Collaboration</li>
                        <li>Communication Skills</li>
                    </ul>
                    </section>
                    {/* language */}
                    <section className="glass-card language-section">
                    <h2 className="section-title">LANGUAGES</h2>

                    <div className="language-item">
                        <div className="language-row">
                        <span style={{wordSpacing:'1rem'}}>English  (Fluent)</span>
                        <span>90%</span>
                        </div>

                        <div className="progress-bar">
                        <div className="progress-fill english"></div>
                        </div>
                    </div>


                    <div className="language-item">
                        <div className="language-row">
                        <span style={{wordSpacing:'1rem'}}>Hindi  (Native)</span>
                        <span>100%</span>
                        </div>

                        <div className="progress-bar">
                        <div className="progress-fill hindi"></div>
                        </div>
                    </div>
                    </section>
                </div>
                </div>
                <div className='layer_8'>
                </div>
                {/* <div className='layer_9'>
                    <div style={{width:'100vw', display:'flex', gap:'35%'}}>
                        <div className='linkedin'>
                        <img src='./linkedin.png' alt='linkedin logo'  />
                        </div>
                        <div  className='github' >
                        <img src='./Github.png' alt='linkedin logo'/>
                        </div>
                    </div>
                </div> */}
            </div>
        </>
    )
}