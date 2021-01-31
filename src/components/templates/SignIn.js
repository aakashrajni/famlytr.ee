// import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import FtHeading  from '../atoms/FtHeading';
import FtInputBox from '../atoms/FtInputBox';
import FtPrimaryButton from '../atoms/FtPrimaryButton';
import { createUser } from "../../firebase";

const SignIn = (props) => {

    const [firstName, updateFirstName] = useState("");
    const [lastName, updateLastName] = useState("");
    const [countryCode, updateCountryCode] = useState(91);
    const [mobileNumber, updateMobileNumber] = useState("");
    const [age, updateAge] = useState(0);
    const [gender, updateGender] = useState("Male");
    const [startDate, setStartDate] = useState(new Date());
    const userObject = {
        "userId": uuidv4(),
        "firstName": firstName,
        "lastName": lastName,
        "countryCode": countryCode,
        "mobileNumber": mobileNumber,
        "birthDate": startDate,
        "age": age,
        "gender": gender,
        "created": true,
        "added": false,
        "married": false,
        "parent": false
    }
    console.log(userObject);

    const onSubmit = (event) => {
        console.log("form submitted");
        createUser(userObject);
        event.preventDefault();
    }

    return (
        <form onSubmit={e => onSubmit(e)}>
            <div style={{width: '100%' , height: '50vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', padding: '20vh 0' }}>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}> 
                <FtHeading heading="Sign Up" /> 
            </div>
            <div style={{width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly'}}>
                <FtInputBox key="firstName" value={firstName} placeholder="First Name" width="35%" updateValue={updateFirstName} />
                <FtInputBox key="lastName" value={lastName} placeholder="Last Name" width="35%" updateValue={updateLastName} />
            </div> 
            <div style={{width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                <FtInputBox key="countryCode" value={countryCode} placeholder="" width="10%" updateValue={updateCountryCode} />
                <FtInputBox key="mobileNumber" value={mobileNumber} placeholder="Mobile Number" width="69%" updateValue={updateMobileNumber} pattern="[0-9]{11}" autocomplete="tel-national"/>
            </div> 
            <div style={{width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly'}}>
                <div className="customDatePickerWidth">
                <DatePicker className="datePickerInputStyle" dateFormat="dd-MM-yyyy" showMonthDropdown="true" showYearDropdown="true"  placeholderText="Date of Birth" onSelect={date => updateAge(new Date().getFullYear() - date.getFullYear() - 1)} selected={startDate} onChange={date => setStartDate(date)} />
                </div>
                <FtInputBox key="gender" value={gender} placeholder="Gender" width="35%" updateValue={updateGender} />
            </div> 
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                
                <FtPrimaryButton value="Create" type="submit"/>
            </div>  
        </div>
        </form>
    )
}

export default SignIn;