import './Freelance.css'
import { useState, useEffect, use } from 'react'

export default function Freelance() {
    const [orgType, setOrgType] = useState("")
    const [charCount, setCharCount] = useState(0)
    const greetingImages = [
        '/bonjor.png',
        '/chienese.png',
        '/hola.png',
        '/jambo.png',
        '/namaste.png',
        '/ola.png',
        '/russian.png',
        '/salam.png',
        '/japanease.png',
        '/korean.png',
        '/ciao.png',
        '/hallo.png'
    ];

    const [activeImage, setActiveImage] = useState({
        src: greetingImages[0],
        position: 0,
        side: "left"
    });

    useEffect(() => {
        let imageIndex = 0;

        const interval = setInterval(() => {
            imageIndex = (imageIndex + 1) % greetingImages.length;

            setActiveImage({
                src: greetingImages[imageIndex],
                position: imageIndex,
                side: imageIndex % 2 === 0 ? "left" : "right"
            });
        }, 4000);

        return () => clearInterval(interval);
    }, []);
    return (
        <div className='freelance_Main'>
            {/* <h1 className="freelance_header">
                <div className="marquee">
                    <div className="marquee_content">
                    {greetings.map((g, i) => (
                        <span key={i}>{g}</span>
                    ))}
                    </div>

                    <div className="marquee_content">
                    {greetings.map((g, i) => (
                        <span key={`copy-${i}`}>{g}</span>
                    ))}
                    </div>
                </div>
            </h1> */}
            <p className='freelance_subheader'>Tell me about your project and I'll be in touch.</p>
            <div className='freelancer_insection'>
                <div className='freelancer_left'>
                    {activeImage.side === "left" && (
                        <img
                            key={activeImage.src}
                            src={activeImage.src}
                            className={`floating-img img-${activeImage.position}`}
                            alt=""
                        />
                    )}
                </div>
                <div className='freelance_card'>
                    <form>
                        <div className='form_field'>
                            <label className='form_label'>Full name</label>
                            <input className='form_input' type='text' placeholder='Bharat Singh' required />
                        </div>

                        <div className='form_field'>
                            <label className='form_label'>Email</label>
                            <input className='form_input' type='email' placeholder='you@example.com' required />
                        </div>

                        <div className='form_field'>
                            <label className='form_label'>Organization type</label>
                            <select
                                className='form_select'
                                value={orgType}
                                onChange={(e) => setOrgType(e.target.value)}
                            >
                                <option value=''>Select one</option>
                                <option value='Individual'>Individual</option>
                                <option value='Organization'>Organization</option>
                            </select>
                        </div>

                        <div className={`org_field form_field ${orgType === 'Organization' ? 'show' : ''}`}>
                            <label className='form_label'>Organization name</label>
                            <input className='form_input' type='text' placeholder='Acme Inc.' />
                        </div>

                        <div className='form_field'>
                            <label className='form_label'>Project description</label>
                            <textarea
                                className='form_textarea'
                                maxLength={1000}
                                placeholder='Describe your project idea, goals, and timeline...'
                                required
                                onChange={(e) => setCharCount(e.target.value.length)}
                            />
                            <div className='char_count'>{charCount} / 1000</div>
                        </div>

                        <button className='submit_btn' type='submit'>Send inquiry →</button>
                    </form>
                </div>
                <div className='freelancer_right'>
                    {activeImage.side === "right" && (
                        <img
                            key={activeImage.src}
                            src={activeImage.src}
                            className={`floating-img img-${activeImage.position}`}
                            alt=""
                        />
                    )}
                </div>
            </div>
        </div>
    )
}