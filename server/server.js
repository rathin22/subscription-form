const express = require('express');
const app = express();
var firebase = require('firebase');
require('firebase/database');
var cors = require('cors')
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(cors());

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyDG0_-FImns_IcbPASc1-nn2ca4kXYOqqI",
    authDomain: "subscriptions-b2001.firebaseapp.com",
    databaseURL: "https://subscriptions-b2001-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "subscriptions-b2001",
    storageBucket: "subscriptions-b2001.appspot.com",
    messagingSenderId: "585099824368",
    appId: "1:585099824368:web:9c24982d648c4cab178635",
    measurementId: "G-RT04Q8V3EP"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


  var dbRef = firebase.database().ref()
 
app.get('/', function (req, res) {
    res.send("Nothing to see here. Try GET /subscriptions to list all existing subscriptions, or POST /subscriptions to add a new subscription");
})

app.post('/subscriptions', (req, res)=>{
    var email = req.body.email;
    try {
        dbRef.child('emails').orderByValue().equalTo(email).once("value", snapshot=>{
            if(snapshot.exists()){
                console.log("user already exists");
                res.send("User already exists");
            }
            else{
                var newEmailKey = dbRef.child('emails').push();
                newEmailKey.set(email); 
                console.log('subscription added');
                res.send("Subscription added");
            }
        })    
    } 
    catch (error) {
        console.log(error);
        res.sendStatus(500);
    }

})

app.get('/subscriptions', (req, res)=>{
    var emailList = [];
    dbRef.child("emails").get().then((snapshot)=>{
        var emailsObject = snapshot.val();
        for(key in emailsObject){
            emailList.push(emailsObject[key]);
        }
        res.send(emailList);
    })
})
 
console.log("Server running at 127.0.0.1:8090")
app.listen(8090);