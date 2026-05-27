import './Connect.css'
import { useNavigate } from 'react-router-dom'
export default function Connect(){
    const navigate = useNavigate();
    return(
        <>
            <div className='Connect_Main'>
                <div className='connect_header'> Thankyou For Connecting !</div>
                <div className='connect_main'>
                    {/* left section */}
                    <div className='Left_section_c' >
                        <div className='in_section' onClick={()=>{navigate('/freelance')}}>
                            <img src='./Freelancing.png' alt='Freelancing image' />
                            <span>Freelancing</span>
                            <div className='hover_text'>
                                Have a project idea? Let’s work together and build something amazing.
                            </div>
                        </div>
                    </div>
                    {/* Right section */}
                    <div className='Right_section_c'>
                        <div className='in_section'>
                            <img src='./HireMe.png' alt='HireMe image' />
                            <span>Hire Me</span>
                            <div className='hover_text'>
                                Looking for a developer to join your team? I’m available for hiring.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}