const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

/**
 * generate user schema in mongoose database
 */
let userSchema = mongoose.Schema({
    Username: { type: String, required: true },
    Password: { type: String, required: true },
    Email: { type: String, required: true },
    Birthdate: { type: Date, required: true },
    FavouriteMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }]
});

/**
 * convert password to hashed password
 * @param {*} password {string}
 * @returns hashed password
 */
userSchema.statics.hashPassword = (password) => {
    return bcrypt.hashSync(password, 10);
};

/**
 * validate correct password
 * @param {*} password 
 * @returns user profile if password is correct
 */
userSchema.methods.validatePassword = function (password) {
    console.log(password, this.Password, "validatePassword")
    return bcrypt.compareSync(password, this.Password);
};

module.exports = mongoose.model('User', userSchema);