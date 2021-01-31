import firebase from 'firebase/app';
import 'firebase/firebase-database';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
apiKey: "AIzaSyDgS7J4p-jny_XpkavGcC6vMO2HlKhzieA",
authDomain: "famlytree.firebaseapp.com",
projectId: "famlytree",
storageBucket: "famlytree.appspot.com",
messagingSenderId: "419248435859",
appId: "1:419248435859:web:29e19d189770760e5e5366",
measurementId: "G-X58E8DCPWK"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

export const writeUserData = (userObj) => {
    database.ref('users/'+userObj.userId).set(userObj);
    console.log("User created");
}

export const writeLoginData = (userObj) => {
    database.ref('loginData/'+userObj.countryCode+userObj.mobileNumber).set({
        "userId" : userObj.userId
    });
    console.log("Login created");
} 

export const createUser = async (userObj) => {
    const snapshot = await database.ref('loginData/' + userObj.countryCode + userObj.mobileNumber).once('value');
    if (snapshot.exists()) {
        console.log("User Already Exist");
    } else {
        writeLoginData(userObj);
        writeUserData(userObj);
        console.log("User created Successfully");
    }
}
