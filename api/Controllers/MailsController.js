const app = require('../../app.js');

exports.getByReceiverId = ((req, res) => {

    var mailsRef = app.db.ref('mails');
    var id = req.params.id;
    mailsRef.orderByChild("receiver").equalTo(id).on("value",
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

exports.getBySenderId = ((req, res) => {
    var mailsRef = app.db.ref('mails');
    var id = req.params.id;
    mailsRef.orderByChild("sender").equalTo(id).on("value",
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

   	var message = req.body.message;

    // TODO: Get Ids from these and then post those ids instead.
   	var sender = req.body.sender;
   	var receiver = req.body.receiver;

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