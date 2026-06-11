import './Connect.css'
import { useNavigate } from 'react-router-dom'

export default function Connect() {
    const navigate = useNavigate();

    const downloadPDF = () => {
        const link = document.createElement("a");
        link.href = "/BS_Resume.pdf";
        link.download = "Bharat_Singh_Resume.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className='Connect_Main'>
            <div className='connect_header'>
                <h1>Thanks for connecting!</h1>
                <p>What brings you here today?</p>
            </div>

            <div className='connect_main'>
                {/* Freelancing card */}
                <div className='Left_section_c'>
                    <div className='in_section'>
                        <img src='./upd.png' alt='Freelancing' />
                        <div className='card_bottom'>
                            <span>Freelancing</span>
                            <p className='card_desc'>Have a project idea? Let's collaborate and build something amazing together.</p>
                            <div className='card_cta' onClick={() => navigate('/freelance')}>Start a project →</div>
                        </div>
                    </div>
                </div>

                {/* Hire Me card */}
                <div className='Right_section_c'>
                    <div className='in_section' >
                        <img src='./hireme.png' alt='Hire Me' />
                        <div className='card_bottom'>
                            <span>Hire Me</span>
                            <p className='card_desc'>Looking for a developer to join your team? I'm available and excited to contribute.</p>
                            <div className='card_cta' onClick={downloadPDF}>Download résumé →</div>
                        </div>
                    </div>
                </div>
            </div>

            <p className='connect_footer'>Feel free to reach out — I'd love to hear about your idea.</p>
        </div>
    )
}