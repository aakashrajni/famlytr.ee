import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import FtHeading  from '../atoms/FtHeading';
import FtInputBox from '../atoms/FtInputBox';
import FtPrimaryButton from '../atoms/FtPrimaryButton';
// import FtLinkButton from '../atoms/FtLinkButton';
import { updateUser } from "../firebaseFiles/firebase";

const SignIn = (props) => {

    const [firstName, updateFirstName] = useState("");
    const [lastName, updateLastName] = useState("");
    const [gender, updateGender] = useState("male");
    const [startDate, setStartDate] = useState(new Date());
    const userId = localStorage.getItem("userId");
    const userObject = {
        "userId": userId,
        "firstName": firstName,
        "lastName": lastName,
        "birthDate": startDate,
        "gender": gender,
        "created": true,
        "added": false,
        "married": false,
        "parent": false
    }
    console.log(userObject);

    const onSubmit = (event) => {
        event.preventDefault();
        updateUser(userObject)
    }

    return (
        <form action="/mytree" onSubmit={e => onSubmit(e)}>
            <div style={{width: '100%' , height: '50vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', padding: '20vh 0' }}>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}> 
                <FtHeading heading="Sign Up" /> 
            </div>
            <div style={{width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly'}}>
                <FtInputBox key="firstName" value={firstName} placeholder="First Name" width="35%" updateValue={updateFirstName} />
                <FtInputBox key="lastName" value={lastName} placeholder="Last Name" width="35%" updateValue={updateLastName} />
            </div> 
            <div style={{width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly'}}>
                <div className="customDatePickerWidth">
                <DatePicker className="datePickerInputStyle" dateFormat="dd-MM-yyyy" showMonthDropdown="true" showYearDropdown="true"  placeholderText="Date of Birth" selected={startDate} onChange={date => setStartDate(date)} />
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