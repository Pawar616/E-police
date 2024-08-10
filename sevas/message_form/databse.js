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

// References to Firebase services
var msgform = firebase.database().ref("msgform");
var storageRef = firebase.storage().ref();

document.getElementById("upload-form").addEventListener("submit", submitForm);

function submitForm(e) {
    e.preventDefault();

    var date = getElementVal("date");
    var message = getElementVal("message");
    var description = getElementVal("description");
    var imgFile = document.getElementById("img").files[0];
    var link = getElementVal("link");

    // Upload image to Firebase Storage
    var imgName = new Date().getTime() + '-' + imgFile.name;
    var uploadTask = storageRef.child('images/' + imgName).put(imgFile);

    uploadTask.on('state_changed',
        function(snapshot) {
            // Handle upload progress if needed
        },
        function(error) {
            console.error("Error uploading image: ", error);
        },
        function() {
            uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                saveMessages(date, message, description, downloadURL, link).then(() => {
                    window.location.href = 'display.html'; // Redirect to display page
                }).catch((error) => {
                    console.error("Error saving message: ", error);
                });
            });
        }
    );
}

function saveMessages(date, message, description, imgURL, link) {
    return new Promise((resolve, reject) => {
        var newMsgFormEntry = msgform.push();
        newMsgFormEntry.set({
            date: date,
            message: message,
            description: description,
            img: imgURL,
            link: link
        }, (error) => {
            if (error) {
                reject(error);
            } else {
                resolve();
            }
        });
    });
}

function getElementVal(id) {
    return document.getElementById(id).value;
}
