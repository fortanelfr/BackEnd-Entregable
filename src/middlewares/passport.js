import "dotenv/config.js";
import passport from "passport"
import GHStrategy from 'passport-github2'
import { Strategy } from 'passport-local'
import User from "../models/user.js"

export default function inicializePassport() {
    passport.serializeUser((user,done) => {
        return done(null,user._id)
    })
    passport.deserializeUser(async (id, done) => {
        console.log(id)
        const user = await User.findById(id)
        return done(null,user)
    })
    passport.use(
        'register',
        new Strategy(
            { passReqToCallback:true,usernameField:'mail' },
            async (req,username,password,done) => {
                try {
                    let one = await User.findOne({ mail:username })
                    if (!one) {
                        let user = await User.create(req.body)
                        return done(null,user)
                    }
                    return done(null,false)
                } catch (error) {
                    return done(error)
                }
            }
        )
    )
    passport.use(
        'login',
        new Strategy(
            { usernameField:'mail' },
            async (username,password,done) => {
                try {
                    let one = await User.findOne({ mail:username })
                    if (one) {
                        return done(null,one)
                    }
                    return done(null,false)
                } catch (error) {
                    return done(error)
                }
            }
        )
    )
    
    passport.use(
        'github',
        new GHStrategy(
            { clientID:process.env.GH_CLIENT,clientSecret:process.env.GH_SECRET,callbackURL:process.env.CALLBACK_URL },
            async (accessToken,refreshToken,profile,done) => {
                try {
                    console.log(profile.username)
                    let one = await User.findOne({ mail:profile._json.login})
                    if (!one) {
                        let user = await User.create({
                            name:profile.username,
                            mail:profile._json.login,
                            photo:profile._json.avatar_url,
                            password:profile.profileUrl,
                            role:0
                        })
                        return done(null,user)	//si no lo encuentra lo crea y envía
                    }
                    return done(null,one)		//si encuentra el usuario lo envía
                } catch (error) {
                    return done(error)
                }
            }
        )
    )

}
