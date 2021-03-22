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

export const createIndex = (mobileNumber, userId) => {
    database.ref('index/'+mobileNumber).set(userId);
    console.log("Index Created");
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
    updates['users/'+userObj.userId+'/parent'] = userObj.parent;
    updates['users/'+userObj.userId+'/married'] = userObj.married;
    console.log("User updated");
    return database.ref().update(updates);
}


export const writeFamData = (userId, famObj) => {
    database.ref('users/'+userId+'/familyTree').set(famObj);
    console.log("Family created");
} 

export const isUserExistByMobNum = async (mobileNumber) => {
    const snapshot = await database.ref('index/' + mobileNumber).once('value');
    if (snapshot.exists()) {
        return snapshot.val()
    }
    return -10
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
        createIndex(userObj.mobileNumber, userObj.userId);
        localStorage.setItem('userId',userObj.userId);
        console.log("User created Successfully");
        window.location.href = "/signin";
    }
}

export const createTempUser = async (userObj,addedBy,relationType) => {
    const snapshot = await database.ref('tempUsers/' + userObj.mobileNumber).once('value');
    if (snapshot.exists()) {
        const isCreated = snapshot.val().created
        if(isCreated){
            console.log("User Already Exist");
        }else {
            console.log("User added already");
        }       
    } else {
        userObj.addedBy = addedBy
        userObj.relation = relationType
        database.ref('tempUsers/'+userObj.mobileNumber).set(userObj);
        createIndex(userObj.mobileNumber, userObj.userId);
        console.log("Temp User created");
    }
}

export const changeUserToParent = (userId) => {
    database.ref('users/'+userId+'/parent').set(true);
    database.ref('users/'+userId+'/married').set(true);
}

export const addUserToChild = (parentId,childId) => {
    database.ref('users/'+parentId+'/familyTree/children/'+childId).set(true);
}

export const addFather = async (userId, userObj) => {
    database.ref('users/'+userId+'/familyTree/father/mobile').set(userObj.mobileNumber);
    userObj.userId = await isUserExistByMobNum(userObj.mobileNumber);
    console.log("addFa", userObj.userId);
    database.ref('users/'+userId+'/familyTree/father/id').set(userObj.userId);
    if(userObj.userId === -10){
        await createTempUser(userObj,userId,'father');
    }else{
        changeUserToParent(userObj.userId)
        addUserToChild(userObj.userId,userId)
    }
    console.log("added Father");
    window.location.href = "/mytree"
}
export const addMother = async (userId, userObj) => {
    database.ref('users/'+userId+'/familyTree/mother/mobile').set(userObj.mobileNumber);
    userObj.userId = await isUserExistByMobNum(userObj.mobileNumber);
    console.log("addMo", userObj.userId);
    database.ref('users/'+userId+'/familyTree/mother/id').set(userObj.userId);
    if(userObj.userId === -10){
        await createTempUser(userObj,userId,'mother');
    }else{
        changeUserToParent(userObj.userId)
        addUserToChild(userObj.userId,userId)
    }
    console.log("added Mother");
    window.location.href = "/mytree"
}

export const isUserAdded = async (mobNumber) => {
    const snapshot = await database.ref('tempUsers/'+mobNumber).once('value');
    return snapshot;
}

export const addRelationId = async (userId,relationId,relationType) => {
    database.ref('users/'+userId+'/familyTree/'+relationType+'/id').set(relationId)
}

export const updateUser = async (userObj) => {
    const snapshot = await database.ref('users/' + userObj.userId).once('value');
    if (snapshot.exists()) {
        console.log("User Already Exist");
        const mobNumber = snapshot.val().mobileNumber
        const tempData = await isUserAdded(mobNumber);
        if(tempData.exists()){
            userObj.parent = tempData.val().parent;
            userObj.married = tempData.val().married;
            addUserToChild(userObj.userId,tempData.val().addedBy)
            addRelationId(tempData.val().addedBy, userObj.userId, tempData.val().relation)
        }
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

export const getTempUserDetails = async (userId, setUserDetails) => {
    const userDetailSnapshot = await database.ref('tempUsers/'+userId).once('value');
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

export const getMyTree = async(userId) => {
    const familyTreeSnapshot = await database.ref('users/'+userId+'/familyTree').once('value');
    if(familyTreeSnapshot.exists()){
        let famTree = familyTreeSnapshot.val();
        let hasFather = (famTree.father.id !== 0 && famTree.father.id !== -10)?true:false;
        console.log("hasF",hasFather,famTree.father.id)
        if(hasFather){
            if(famTree.father.id !== 0)
             return await getMyTree(famTree.father.id)
        }
        return userId
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