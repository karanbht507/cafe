// Configuring the database
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb+srv://karanbht:Kbht@7575@cluster0.gmako.mongodb.net/cafe?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
})
