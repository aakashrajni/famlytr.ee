import React, { useState,useEffect } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import PhoneCode from 'react-phone-code';

import FtHeading  from '../atoms/FtHeading';
import FtInputBox from '../atoms/FtInputBox';
import FtPrimaryButton from '../atoms/FtPrimaryButton';
import { sentOTP, confirmOTP } from "../firebaseFiles/firebase";
import FtAlert from '../molecules/FtAlert';

const Login = (props) => {

    const [countryCode, updateCountryCode] = useState("+91");
    const [mobileNumber, updateMobileNumber] = useState("");
    const [otpCode, updateOtpCode] = useState("");
    const [sendCodeBtnState, updateSendCodeBtnState] = useState(true);
    const [verifyBtnState, updateVerifyBtnState] = useState(true);
    const [alertMsg, updateAlertMsg] = useState({type: "SUCCESS", msg: ""});

    useEffect(() =>{
        updateSendCodeBtnState(true);
        updateVerifyBtnState(true);
        if(mobileNumber.length > 9 && mobileNumber.length < 12)
            updateSendCodeBtnState(false);
        if(otpCode.length === 6)
            updateVerifyBtnState(false);
    }, [mobileNumber.length, otpCode.length])

    const sendCodes = () => {
        if(mobileNumber.length > 9 && mobileNumber.length < 12)
        sentOTP(countryCode+mobileNumber, updateAlertMsg);
    }

    const onSubmit = (event) => {
        confirmOTP(otpCode, updateAlertMsg);
        event.preventDefault();
    }

    return (
        <form action="" onSubmit={e => onSubmit(e)}>
            { alertMsg.msg && <FtAlert type={alertMsg.type} msgObj={updateAlertMsg}>{alertMsg.msg}</FtAlert> }
            <div style={{width: '100%' , height: '50vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', padding: '20vh 0' }}>
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}> 
                    <FtHeading heading="Login / Sign Up" /> 
                </div>
                <div style={{width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                    <PhoneCode
                        onSelect={code => updateCountryCode(code)}
                        className="phoneCodeStyle"
                        showFirst={['IN', 'US']}
                    />
                    
                    <FtInputBox key="mobileNumber" value={mobileNumber} placeholder="Mobile Number" width="60%" updateValue={updateMobileNumber} pattern="[0-9]{10,11}" autocomplete="tel-national"/>
                </div> 
                <div style={{width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly'}}>
                    <FtInputBox key="otpCode" value={otpCode} placeholder="Enter OTP" width="48%" updateValue={updateOtpCode} />
                    <FtPrimaryButton width="24%" height={39} fontSize={14} value="Send Code" clickMethod={sendCodes} type="button" disabled={sendCodeBtnState}/>
                </div> 
                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>               
                    <FtPrimaryButton id="verfiyBtn" value="Verify" type="submit" disabled={verifyBtnState}/>
                </div>  
            </div>
        </form>
    
    )
}

export default Login;