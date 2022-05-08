const passport = require('passport')
const googleStrategy = require('passport-google-oauth2').Strategy

const GOOGLE_CLIENT_ID = '110076077193-s7qreqni6g0o7qdgut1ptvebftbpltat.apps.googleusercontent.com'
const GOOGLE_CLIENT_SECRET = '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'

authUser = (req, accessToken, refreshToken, profile,done)=>{
    return done(null, profile)
}

const strategy = new googleStrategy(
    {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:4000/auth/google/callback",
        passReqToCallback: true
    },
    authUser
)

module.exports.strategy = strategy