if (typeof firebase === 'undefined') throw new Error('hosting/init-error: Firebase SDK not detected. You must include it before /__/firebase/init.js');
firebase.initializeApp({
  "apiKey": "AIzaSyBF2tIfG9Lj1XC9R47AVsg1ciZCMQF9Wxs",
  "databaseURL": "https://magicservice-f5e52.firebaseio.com",
  "storageBucket": "magicservice-f5e52.appspot.com",
  "authDomain": "magicservice-f5e52.firebaseapp.com",
  "messagingSenderId": "205163648868",
  "projectId": "magicservice-f5e52"
});
