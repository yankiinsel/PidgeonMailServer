module.exports = (app) => {
    // Bind the controller to the route
    const mailsController = require('../Controllers/MailsController.js');

    // app.get('/mails/:id', mailsController.get);

    app.get('/getmails/', mailsController.get);

    app.get('/getmails/:id', mailsController.get);

    app.route('/postmail').post(mailsController.post);
};