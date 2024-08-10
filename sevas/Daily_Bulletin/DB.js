// Your Firebase configuration object
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

// References to Firebase services
var Dailybulletin = firebase.database().ref("Dailybulletin");
var storageRef = firebase.storage().ref();

document.getElementById("dailyBulletinForm").addEventListener("submit", submitForm);

function submitForm(e) {
    e.preventDefault();

    var headline = document.getElementById("headline").value;
    var imgFile = document.getElementById("img").files[0];
    var date = document.getElementById("date").value;
    var time = document.getElementById("time").value;
    var report = document.getElementById("report").value;

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
                saveMessages(headline, downloadURL, date, time, report).then(() => {
                    window.location.href = 'display.html';
                }).catch((error) => {
                    console.error("Error saving message: ", error);
                });
            });
        }
    );
}

function saveMessages(headline, imgURL, date, time, report) {
    return new Promise((resolve, reject) => {
        var newdailyBulletinForm = Dailybulletin.push();
        newdailyBulletinForm.set({
            headline: headline,
            img: imgURL,
            date: date,
            time: time,
            report: report
        }, (error) => {
            if (error) {
                reject(error);
            } else {
                resolve();
            }
        });
    });
}

