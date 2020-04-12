const app = require('../../app.js');

exports.get = ((req, res) => {
    var mailsRef = app.db.ref().child('mails');

    var _id = req.params.id;
    if (_id !== undefined) {
        mailsRef = mailsRef.child(_id);
    }

    //Attach an asynchronous callback to read the data
    mailsRef.on("value",
        function (snapshot) {
            console.log(snapshot.val());
            res.json(snapshot.val());
            mailsRef.off("value");
        },
        function (errorObject) {
            console.log("The read failed: " + errorObject.code);
            res.send("The read failed: " + errorObject.code);
        });
});

exports.post = ((req, res) => {
    console.log("HTTP POST Request");

   	var sender = req.body.sender;
   	var receiver = req.body.receiver;
   	var message = req.body.message;

    var mailsRef = app.db.ref().child('mails');
    mailsRef.push().set({
            sender: sender,
            receiver: receiver,
            message: message,
        },
        function (error) {
            if (error) {
                res.send("Data could not be saved." + error);
            } else {
                res.send("Data saved successfully.");
            }
        });
});