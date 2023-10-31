// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-analytics.js";
import { getDatabase, ref, onValue, query, orderByChild } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-database.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAQ8mrgl15g_LBwbxZreDiX46btE5QZRqU",
  authDomain: "kirkos-archive.firebaseapp.com",
  databaseURL: "https://kirkos-archive-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "kirkos-archive",
  storageBucket: "kirkos-archive.appspot.com",
  messagingSenderId: "672138011318",
  appId: "1:672138011318:web:cafa5481a671741ef7bc17",
  measurementId: "G-J9SS5Y5W6H"
};

// Initialize Firebase
const rtdb = initializeApp(firebaseConfig);
const analytics = getAnalytics(rtdb);
console.log(rtdb)
window.rtdb = rtdb



    const db = getDatabase();
// const dbref = ref(db, '15THFlWen9Zrc28MmZlgZZhqAtNjavXaTMTz4qtaQ46k/Events/'); //first level of ref is the spreadsheet ID
const q = query(ref(db, "15THFlWen9Zrc28MmZlgZZhqAtNjavXaTMTz4qtaQ46k/Events"), orderByChild('StartDate'))
// console.log(q)

let events = []
let visibleEvents = ['Concert', 'Screening', 'Meeting/workshare', 'Exhibition', 'Listening event', 'Improv jam', 'open mic', 'Improv jam (body)', 'Theatre', 'Improv comedy', 
'Lecture', 'Radio broadcast', 'Event', 'Demo', 'Live interactive set', 'Interview/Q&A', 'Live electronic set', 'Writing group', 'Group meetup/workshare', 'Launch', 'Durational performance', 
'Installation', 'WIP presentation', 'Festival', 'Residency', 'Poetry/spoken word', 'Happening', 'Outdoor performance', 'Improvised Performance', 'Intervention'];
let content = document.getElementById("archive_content")


onValue(q, (snapshot) => {

    snapshot.forEach((child) =>{
        let e = child.val()
        // console.log(e.FormatFilter)
        if (visibleEvents.indexOf(e.Format1) > -1 || visibleEvents.indexOf(e.Format2) > -1
        ){  
            console.log(child.val())
            events.unshift(child.val()) 

        }

    }
    )
    events.forEach(event => {
        let p = document.createElement("p")
        var date = new Date(event.StartDate)
        p.textContent = date.toLocaleString('default', {dateStyle: 'long' })
        content.appendChild(p)
        console.log(event.StartDate)
        console.log(event.Event)
        let head = document.createElement("h2")
        head.textContent = event.Event
        content.appendChild(head)
        console.log(event.Ensemble)
        p = document.createElement("strong")
        p.textContent = event.Ensemble
        content.appendChild(p)
        console.log(event.Venue)
        p = document.createElement("p")
        p.textContent = event.Venue
        content.appendChild(p)
        console.log(event.Bio)
        p = document.createElement("i")
        p.textContent = event.Bio
        content.appendChild(p)
        console.log(event.Pieces_Performed)
         p = document.createElement("i")
        p.textContent = event.Pieces_Performed
        content.appendChild(p)
        let hr = document.createElement("hr")
        content.appendChild(hrqs)
        
    })   
  })
  
  

// // const query(ref(db, ), orderByChild('starCount'));
// onValue(dbref, (snapshot) => {
//   const data = snapshot.val();
//   data.forEach(d => console.log(d))
// });

// query(ref(db, 'user-posts/' + myUserId), orderByChild('starCount'));
