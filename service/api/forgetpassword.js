exports.post = function(request, response) {
    
    var usersTable = request.service.tables.getTable('users');
    
    
};

exports.get = function(request, response) {
    var sendgrid = require('sendgrid')(azure_391f99ebb5506b93a27577ef7cd597f5@azure.com,4mxJQRASw6ysjE1);
    var email = new sendgrid.Email({
    to: 'murtazhaider@sofittech.com',
    from: 'murtazshah@gmail.com',
    subject: 'test mail',
    text: 'This is a sample email message.'
    });
    sendgrid.send(email, function(err, json){
    if(err) { return console.error(err); }
    response.send(statusCodes.OK, { message : json });
    });
};