module.exports = (app) => {
    // Bind the controller to the route
    const mailsController = require('../Controllers/MailsController.js');

    app.get('/getinboxmails/:id', mailsController.getByReceiverId);
    
    app.get('/getsentmails/:id', mailsController.getBySenderId);

    app.route('/postmail').post(mailsController.post);
};