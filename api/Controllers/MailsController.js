const app = require('../../app.js');

exports.handleSnapshot = (snapshot) => {
    let resultArr = [];
    snapshot.forEach(childSnap => {
        let newJSONObject = childSnap.val();
        newJSONObject._id = childSnap.key;
        resultArr.push(newJSONObject);
    });

    return resultArr;
};

exports.getByReceiverId = ((req, res) => {

    var mailsRef = app.db.ref('mails');
    var id = req.params.id;
    mailsRef.orderByChild("receiver").equalTo(id).on("value",
        (snapshot) => {
            let result = this.handleSnapshot(snapshot);
            res.json(result);
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
        (snapshot) => {
            let result = this.handleSnapshot(snapshot);
            res.json(result);
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