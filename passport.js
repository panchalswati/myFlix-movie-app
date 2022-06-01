const passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    User = require('./users/user.model.js'),
    passportJWT = require('passport-jwt'),

    JWTStrategy = passportJWT.Strategy,
    ExtractJWT = passportJWT.ExtractJwt;

passport.use(new LocalStrategy({
    usernameField: 'name',
    passwordField: 'password'
}, (username, password, callback) => {
    console.log(username + '  ' + password);
    User.findOne({ name: username }, (error, user) => {
        if (error) {
            console.log(error);
            return callback(error);
        }

        if (!user) {
            console.log('incorrect username');
            return callback(null, false, { message: 'Incorrect username or password.' });
        }

        if (!user.validatePassword(password)) {
            console.log('incorrect password');
            return callback(null, false, { message: 'Incorrect password' });
        }

        console.log('finished');
        return callback(null, user);
    });
}));

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'your_jwt_secret'
}, (jwtPayload, callback) => {
    return User.findById(jwtPayload._id)
        .then((user) => {
            return callback(null, user);
        })
        .catch((error) => {
            return callback(error)
        });
}));