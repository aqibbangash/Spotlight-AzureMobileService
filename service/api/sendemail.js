exports.post = function(request, response) {
    // Third party config
    var SendGrid = require('sendgrid').SendGrid;
    
    
        var sendgrid = new SendGrid('azure_391f99ebb5506b93a27577ef7cd597f5@azure.com', '4mxJQRASw6ysjE1');

        sendgrid.send({
            to: 'aqibbangash@sofittech.com',
            from: 'noreply@spotlight.com',
            subject: 'Api test Email',
            text: 'This is the plain text version of the email content '
        }, function(success, message) {
            // If the email failed to send, log it as an error so we can investigate
            if (!success) {
                console.error(message);
            }
            else {
                response.send(statusCodes.OK, { message : 'Email sent!' });
            }
        });
};