const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

// !!!!! rooms model is kept like this until we agree about a model then we will change it. normally it won't affect our work!!!!!!
const postSchema = mongoose.Schema({
  title: {type: String, required: true },
  content: {type: String, required: true },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", require: true}


});

module.exports = mongoose.model('Post',postSchema);
