import './Freelance.css'
import { useState, useEffect, use } from 'react'
import emailjs from '@emailjs/browser';

export default function Freelance() {
    const session=import.meta.env.EMAILJS_SESSIONKEY;
    const publickey=import.meta.env.EMAILJS_PUBLICKEY;
    const templateid1=import.meta.env.EMAILJS_SELF_TEMPLATE;
    const templateid2=import.meta.env.EMAILJS_TO_TEMPLATE;

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

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        orgType: "",
        organizationName: "",
        projectDescription: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Email to you
            await emailjs.send(
                session,
                templateid1,
                {
                    name: formData.fullName,
                    email: formData.email,
                    org_type: formData.orgType,
                    organization_name: formData.organizationName,
                    project_description: formData.projectDescription,
                },
                publickey
            );

            // Auto-reply to submitter
            await emailjs.send(
                session,
                templateid2,
                {
                    name: formData.fullName,
                    email: formData.email,
                },
                publickey
            );

            alert('Inquiry sent successfully!');

            setFormData({
                fullName: "",
                email: "",
                orgType: "",
                organizationName: "",
                projectDescription: ""
            });

            setCharCount(0);
        } catch (error) {
            console.error(error);
            alert('Failed to send inquiry.');
        }
    };

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
                    <form onSubmit={handleSubmit}>
                        <div className='form_field'>
                            <label className='form_label'>Full name</label>
                            <input
                                className='form_input'
                                type='text'
                                name='fullName'
                                value={formData.fullName}
                                onChange={handleChange}
                                placeholder='Bharat Singh'
                                required
                            />
                        </div>

                        <div className='form_field'>
                            <label className='form_label'>Email</label>
                            <input
                                className='form_input'
                                type='email'
                                name='email'
                                value={formData.email}
                                onChange={handleChange}
                                placeholder='you@example.com'
                                required
                            />
                        </div>

                        <div className='form_field'>
                            <label className='form_label'>Organization type</label>
                            <select
                                className='form_select'
                                name='orgType'
                                value={formData.orgType}
                                onChange={(e) => {
                                    setOrgType(e.target.value);
                                    handleChange(e);
                                }}
                            >
                                <option value=''>Select one</option>
                                <option value='Individual'>Individual</option>
                                <option value='Organization'>Organization</option>
                            </select>
                        </div>

                        <div className={`org_field form_field ${orgType === 'Organization' ? 'show' : ''}`}>
                            <label className='form_label'>Organization name</label>
                            <input
                                className='form_input'
                                type='text'
                                name='organizationName'
                                value={formData.organizationName}
                                onChange={handleChange}
                                placeholder='Acme Inc.'
                            />
                        </div>

                        <div className='form_field'>
                            <label className='form_label'>Project description</label>
                            <textarea
                                className='form_textarea'
                                name='projectDescription'
                                value={formData.projectDescription}
                                maxLength={1000}
                                required
                                onChange={(e) => {
                                    handleChange(e);
                                    setCharCount(e.target.value.length);
                                }}
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