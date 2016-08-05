exports.post = function(request, response) {
    // Third party config
    var SendGrid = require('sendgrid').SendGrid;

    response.send(statusCodes.OK, { message : SendGrid });
};