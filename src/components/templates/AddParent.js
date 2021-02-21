import React, { useState } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import PhoneCode from 'react-phone-code';

import FtHeading  from '../atoms/FtHeading';
import FtInputBox from '../atoms/FtInputBox';
import FtMobInputBox from '../atoms/FtMobInputBox';
import FtPrimaryButton from '../atoms/FtPrimaryButton';
// import FtLinkButton from '../atoms/FtLinkButton';
import { addFather, addMother } from "../firebaseFiles/firebase";
import { userId } from "../../assets/constants/constant";
import {
    useParams
} from "react-router-dom";

const AddParent = (props) => {

    let {type} = useParams();
    console.log(type);
    const [firstName, updateFirstName] = useState("");
    const [lastName, updateLastName] = useState("");
    const [countryCode, updateCountryCode] = useState("+91");
    const [mobileNumber, updateMobileNumber] = useState("");
    const isFather = type==='father'?true:false;
    const heading = isFather?'Father':'Mother';
    const thisUserId = -10;
    const userObject = {
        "userId": thisUserId,
        "firstName": firstName,
        "lastName": lastName,
        "birthDate": new Date(),
        "gender": isFather?'male':'female',
        "created": false,
        "added": true,
        "married": true,
        "parent": true,
        "mobileNumber": countryCode+mobileNumber
    }
    console.log(userObject);

    const onSubmit = (event) => {
        event.preventDefault();
        if(isFather)
          addFather(userId,userObject)
        else 
          addMother(userId,userObject)
    }

    return (
        <form action="/mytree" onSubmit={e => onSubmit(e)}>
            <div style={{width: '100%' , height: '50vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', padding: '20vh 0' }}>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}> 
                <FtHeading heading={"Add "+heading} /> 
            </div>
            <div style={{width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                <PhoneCode
                    onSelect={code => updateCountryCode(code)}
                    className="phoneCodeStyle"
                    showFirst={['IN', 'US']}
                />
                
                <FtMobInputBox key="mobileNumber" value={mobileNumber} placeholder="Mobile Number" width="60%" updateValue={updateMobileNumber} pattern="[0-9]{10}" autocomplete="tel-national"/>
            </div> 
            <div style={{width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly'}}>
                <FtInputBox key="firstName" value={firstName} placeholder="First Name" width="34%" updateValue={updateFirstName} />
                <FtInputBox key="lastName" value={lastName} placeholder="Last Name" width="34%" updateValue={updateLastName} />
            </div> 
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                
                <FtPrimaryButton value="Add" type="submit"/>
            </div>  
        </div>
        </form>
    )
}

export default AddParent;