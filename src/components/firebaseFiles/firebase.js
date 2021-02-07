import { database, auth } from './firebaseConfig';
import { defaultFamTree } from '../../assets/constants/constant'

const startUserObject = {
    "userId": "",
    "firstName": "",
    "lastName": "",
    "mobileNumber": "",
    "birthDate": new Date(),
    "age": 0,
    "gender": "male",
    "created": false,
    "added": false,
    "married": false,
    "parent": false
}

export const writeUserData = (userObj) => {
    database.ref('users/'+userObj.userId).set(userObj);
    console.log("User created");
}

export const updateUserData = (userObj) => {
    var updates = {};
    updates['users/'+userObj.userId+'/firstName'] = userObj.firstName;
    updates['users/'+userObj.userId+'/lastName'] = userObj.lastName;
    updates['users/'+userObj.userId+'/birthDate'] = userObj.birthDate;
    updates['users/'+userObj.userId+'/age'] = new Date().getFullYear() - new Date(userObj.birthDate).getFullYear() - 1;
    updates['users/'+userObj.userId+'/gender'] = userObj.gender;
    updates['users/'+userObj.userId+'/created'] = userObj.created;
    console.log("User updated");
    return database.ref().update(updates);
}


export const writeFamData = (userId, famObj) => {
    database.ref('users/'+userId+'/familyTree').set(famObj);
    console.log("Family created");
} 

export const createUser = async (userObj) => {
    const snapshot = await database.ref('users/' + userObj.userId).once('value');
    if (snapshot.exists()) {
        localStorage.setItem('userId',userObj.userId);
        const isCreated = snapshot.val().created
        if(isCreated){
            console.log("User Already Exist");
            window.location.href = "/mytree";
        }else {
            window.location.href = "/signin";
        }       
    } else {
        writeUserData(userObj);
        writeFamData(userObj.userId, defaultFamTree);
        localStorage.setItem('userId',userObj.userId);
        console.log("User created Successfully");
        window.location.href = "/signin";
    }
}

export const updateUser = async (userObj) => {
    const snapshot = await database.ref('users/' + userObj.userId).once('value');
    if (snapshot.exists()) {
        console.log("User Already Exist");
        updateUserData(userObj);
        console.log("User Profile updated Successfully");
        window.location.href = "/mytree"
    }
}

export const getUserDetails = async (userId, setUserDetails) => {
    const userDetailSnapshot = await database.ref('users/'+userId).once('value');
    if(userDetailSnapshot.exists()){
        setUserDetails(userDetailSnapshot.val());
    }
}

export const getFamilyTree = async (userId, setFamTree) => {
    const familyTreeSnapshot = await database.ref('users/'+userId+'/familyTree').once('value');
    if(familyTreeSnapshot.exists()){
        setFamTree(familyTreeSnapshot.val());
    }
}

export const sentOTP = (mobileNumber, updateAlertMsg) => {
    const appVerifier = window.recaptchaVerifier;
    auth.signInWithPhoneNumber(mobileNumber, appVerifier)
        .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        let alertObj = {
            type: "SUCCESS",
            msg: "OTP sent to "+mobileNumber
        }
        updateAlertMsg(alertObj);
        // ...
        }).catch((error) => {
        // Error; SMS not sent
            let alertObj = {
                type: "ERROR",
                msg: "Enter valid Mobile Number"
            }
            console.log(error);
            updateAlertMsg(alertObj);
        });
}

export const confirmOTP = (otp, updateAlertMsg) => {
    window.confirmationResult.confirm(otp).then((result) => {
        // User signed in successfully.
        const user = result.user;
        console.log(user);
        startUserObject.userId = user.uid;
        startUserObject.mobileNumber = user.phoneNumber;
        createUser(startUserObject);
        // ...
      }).catch((error) => {
        // User couldn't sign in (bad verification code?)
        let alertObj = {
            type: "ERROR",
            msg: "Entered OTP is Wrong..."
        }
        if(error.code === "auth/invalid-verification-code")
            alertObj.msg = "Entered OTP is Wrong...";
        console.log(error)
        updateAlertMsg(alertObj);
      });
}