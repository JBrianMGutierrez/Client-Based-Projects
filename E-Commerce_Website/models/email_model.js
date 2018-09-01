module.exports = function MailOptions () {
    this.mailFramework = function (request) {
        return {
            from: '"MC Manabat" <jitteamproject@gmail.com>', // sender address
            to: request.email, // list of receivers
            subject: request.subject, // Subject line
            text: 'Test Send Email to Distributor', // plain text body
            html: request.message // html body
        }
    };
};
//${req.body.name}