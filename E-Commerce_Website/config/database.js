var mongoose = require('mongoose');
var database_url = 'mongodb://localhost:27017/e-commerce_development';
mongoose.Promise = global.Promise;
exports.mongooseConnect = mongoose.connect(database_url, { useNewUrlParser: true } ,function (err) {
    if (err) throw err;
});

exports.dataMongoose = mongoose;