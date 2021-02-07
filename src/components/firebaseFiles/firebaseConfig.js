import firebase from 'firebase/app';
import 'firebase/firebase-database';
import 'firebase/firebase-auth';

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

// window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');

export const database = firebase.database();

export const auth = firebase.auth();
auth.useDeviceLanguage();

window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha', {
    'size': 'invisible',
    'callback': (response) => {
      // reCAPTCHA solved, allow signInWithPhoneNumber.
    //   onSignInSubmit();
    }
  });