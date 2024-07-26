// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBDSDu3IRCTsJ95SEAIRLAGcjMkbj_aXO8",
  authDomain: "dailybulletin-27d74.firebaseapp.com",
  databaseURL: "https://dailybulletin-27d74-default-rtdb.firebaseio.com",
  projectId: "dailybulletin-27d74",
  storageBucket: "dailybulletin-27d74.appspot.com",
  messagingSenderId: "359032685290",
  appId: "1:359032685290:web:7fc135cb9e8d1f9d0e4d93"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Reference to your Firebase database
var Dailybulletin = firebase.database().ref("Dailybulletin");

// Form submit event listener
document.getElementById("dailyBulletinForm").addEventListener("submit", submitForm);

function submitForm(e) {
  e.preventDefault();

  var headline = getElementVal("headline");
  var img = getElementVal("img");
  var date = getElementVal("date");
  var time = getElementVal("time");
  var report = getElementVal("report");

  saveMessages(headline, img, date, time, report);

  // Show the alert
  var alertElement = document.querySelector(".alert");
  if (alertElement) {
      alertElement.style.display = "block";

      // Hide the alert after 3 seconds
      setTimeout(() => {
          alertElement.style.display = "none";
      }, 3000);
  }

  // Reset the form
  document.getElementById("dailyBulletinForm").reset();
}

const saveMessages = (headline, img, date, time, report) => {
  var newdailyBulletinForm = Dailybulletin.push();
  newdailyBulletinForm.set({
      headline: headline,
      img: img,
      date: date,
      time: time,
      report: report
  });
};

const getElementVal = (id) => {
  return document.getElementById(id).value;
};
