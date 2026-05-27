import { useEffect, useRef, useState } from 'react'
import {Canvas , useFrame } from "@react-three/fiber"
import { useGLTF, useAnimations,Stars} from "@react-three/drei"
import { useNavigate } from 'react-router-dom'
import * as THREE from "three"
import './Homepage.css'
import Model from './Model'
import Movingstar from './Movingstar'

export default function Homepage(){
    const [page, setPage] = useState(0)
    const [startAnimation, setStartAnimation] = useState(false)
    const navigate = useNavigate();

    const audioRef = useRef(null)

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

            {/* Start Button */}
            {!startAnimation && (
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
                <Movingstar page={page} />
                {/* <ambientLight intensity={1} /> */}
                <directionalLight position={[-3, 0, 5]} intensity={0.25} />
                <directionalLight position={[3, 0, 5]} intensity={1} />
                <Model position={[0,-4,0]} scale={[1,1,1]}  audioRef={audioRef} startAnimation={startAnimation}/>
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
                <div className='nav_btn' onClick={()=>{setPage(8)}}>
                SOCIAL
                </div>
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
                            <li>Developing Qt(C++) desktop applications for railway safety systems.</li>
                            <li>Building Flask APIs and automation tools.</li>
                            <li>Designing Computer Vision models for OCR and object detection.</li>
                            <li>Automating testing and validation workflows.</li>
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
                        <div className="skill-tag">C</div>
                        <div className="skill-tag">Java</div>
                        <div className="skill-tag">Qt (C++)</div>
                        <div className="skill-tag">Flask</div>
                        <div className="skill-tag">Django</div>
                        <div className="skill-tag">OpenCV</div>
                        <div className="skill-tag">LangChain</div>
                        <div className="skill-tag">OCR</div>
                        <div className="skill-tag">Scikit Learn</div>
                        <div className="skill-tag">REST APIs</div>
                        <div className="skill-tag">Git</div>
                        <div className="skill-tag">Linux</div>
                        <div className="skill-tag">Selenium</div>
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
                <div className='layer_9'>
                <div style={{width:'100vw', display:'flex', gap:'35%'}}>
                    <div className='linkedin'>
                    <img src='./linkedin.png' alt='linkedin logo'  />
                    </div>
                    <div  className='github' >
                    <img src='./Github.png' alt='linkedin logo'/>
                    </div>
                </div>
                </div>
            </div>
        </>
    )
}