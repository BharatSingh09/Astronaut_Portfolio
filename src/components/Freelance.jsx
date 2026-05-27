import './Freelance.css'
import { useState } from 'react';
export default function Freelance(){
    const [orgType, setOrgType] = useState("");
    return(
        <>
            <div className='freelance_Main'>
                <div className='freelance_header'> NAMASTE</div>
                <div className='freelance_main'>
                    {/* boy section */}
                    <div className='left_section'><img src='./boy.jpg' alt='boy'/></div>
                    {/* form section */}
                    <div className='mid_section'>
                        <form>
                            <label>Full Name:</label>
                            <br/>
                            <input type='text' required></input>
                            <br/>
                            <br/>
                            <label>Email:</label>
                            <br/>
                            <input type='email' required></input>
                            <br/>
                            <br/>
                            <label>Organization Type:</label>
                            <br />
                            <select value={orgType} onChange={(e) => setOrgType(e.target.value)}>
                                <option value="">Select</option>
                                <option value="Individual">Individual</option>
                                <option value="Organization">Organization</option>
                            </select>

                            <br /><br />

                            {/* Show input only if Organization selected */}
                            {orgType === 'Organization' && (
                                <>
                                    <label>Organization Name:</label>
                                    <br />

                                    <input
                                        type='text'
                                        placeholder='Enter organization name'
                                    />

                                    <br />
                                    <br />
                                </>
                            )}
                            <label>Discription:</label>
                            <br/>
                            <textarea rows="4" cols="40" maxLength={1000} placeholder="Maximum 1000 characters" required></textarea>
                            <br/>
                            <br/>
                            <div style={{
                                display:'flex',
                                justifyContent:'center'
                            }}><button type='submit'>Submit</button></div>
                        </form>
                    </div>
                    {/* girl section */}
                    <div className='right_section'><img src='./girl.jpg' alt='boy'/></div>
                </div>
            </div>
        </>
    )
}