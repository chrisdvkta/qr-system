const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: { type: String, required: false },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
});


userSchema.pre('save', async function (next){
  if (!this.isModified('password')) next();
  const hash = await bcrypt.genSalt(10);
  this.password= await bcrypt.hash(this.password,hash);
  next();
} )


userSchema.methods.matchPassword = async function (enteredPw){
  return await bcrypt.compare(enteredPw,this.password);
}

module.exports = mongoose.model("User", userSchema);
