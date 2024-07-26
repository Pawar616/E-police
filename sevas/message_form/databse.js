// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCHHm0hjQLObgd8K6_fa8BgIbhEy2BXdr0",
    authDomain: "msgform-22be4.firebaseapp.com",
    databaseURL: "https://msgform-22be4-default-rtdb.firebaseio.com",
    projectId: "msgform-22be4",
    storageBucket: "msgform-22be4.appspot.com",
    messagingSenderId: "1043503626339",
    appId: "1:1043503626339:web:6beab26ca88553efe66056"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Reference to your Firebase database
var msgform = firebase.database().ref("msgform");

// Form submit event listener
document.getElementById("upload-form").addEventListener("submit", submitForm);

function submitForm(e) {
e.preventDefault();

var date = getElementVal("date");
var message = getElementVal("message");
var description = getElementVal("description");
var img = getElementVal("img");
var link = getElementVal("link");

saveMessages(date, message, description, img, link);

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
document.getElementById("upload-form").reset();
}

const saveMessages = (date, message, description, img, link) => {
var newdailyuploadForm = msgform.push();
newdailyuploadForm.set({
    date: date,
    message: message,
    description: description,
    img: img,
    link: link
    
});
};

const getElementVal = (id) => {
return document.getElementById(id).value;
};
