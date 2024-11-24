// src/routes/user/auth.passport.ts
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { createUser, findUserByEmail, findUserById } from '../../models/user/users.mongo';
import { IUser } from '../../models/user/users.model';
import jwt from 'jsonwebtoken';
import { backUrl } from "../../services/urls";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || 'your_google_client_id';
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || 'your_google_client_secret';
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

passport.use('google-login', new GoogleStrategy({
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: `${backUrl}/auth/google/login/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
        try {
            console.log("Logging to Google...");
            const email = profile.emails?.[0]?.value;
            if (email) {
                let user = await findUserByEmail(email);

                if (user) {
                    if (user.provider !== "google") {
                        return done(null, false, { message: 'Sign up using Google' });
                    }
                } else {
                    return done(null, false, { message: 'No user found' })
                }

                const token = jwt.sign({ id: user._id, hasInterests: user.hasInterests, role: user.role }, JWT_SECRET);
                return done(null, { user, token });
            } else {
                return done(null, false, { message: 'No user found' });
            }
        } catch (error) {
            console.error("Error during Google OAuth:", error);
            return done(error, false);
        }
    }
));

passport.use('google-traveler', new GoogleStrategy({
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: `${backUrl}/auth/google/traveler/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
        try {
            console.log("Registering traveler to Google...");
            const email = profile.emails?.[0]?.value;
            if (email) {
                let user = await findUserByEmail(email);

                if (user) {
                    if (user.provider !== "google") {
                        return done(null, false, { message: 'Sign up using Google' });
                    }
                    if (user.role !== "traveler") {
                        return done(null, false, { message: 'User already exists but not as a traveler' });
                    }
                } else {
                    user = await createUser({
                        firstName: profile.name?.givenName || '',
                        lastName: profile.name?.familyName || '',
                        email: email,
                        provider: 'google',
                        role: 'traveler'
                    } as IUser);
                }

                const token = jwt.sign({ id: user._id, hasInterests: user.hasInterests, role: user.role }, JWT_SECRET);
                return done(null, { user, token });
            } else {
                return done(null, false, { message: 'No email found' });
            }
        } catch (error) {
            console.error("Error during Google OAuth:", error);
            return done(error, false);
        }
    }
));

passport.use('google-host', new GoogleStrategy({
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: `${backUrl}/auth/google/host/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
        try {
            console.log("Registering host to Google...");
            const email = profile.emails?.[0]?.value;
            if (email) {
                let user = await findUserByEmail(email);

                if (user) {
                    if (user.provider !== "google") {
                        return done(null, false, { message: 'Sign up using Google' });
                    }
                    if (user.role !== "host") {
                        return done(null, false, { message: 'User already exists but not as a host' });
                    }
                } else {
                    user = await createUser({
                        firstName: profile.name?.givenName || '',
                        lastName: profile.name?.familyName || '',
                        email: email,
                        provider: 'google',
                        role: 'host'
                    } as IUser);
                }

                const token = jwt.sign({ id: user._id, hasInterests: user.hasInterests, role: user.role }, JWT_SECRET);
                return done(null, { user, token });
            } else {
                return done(null, false, { message: 'No email found' });
            }
        } catch (error) {
            console.error("Error during Google OAuth:", error);
            return done(error, false);
        }
    }
));

import { Strategy as FacebookStrategy } from 'passport-facebook';

const FACEBOOK_APP_ID = process.env.FACEBOOK_APP_ID || 'your_facebook_app_id';
const FACEBOOK_APP_SECRET = process.env.FACEBOOK_APP_SECRET || 'your_facebook_app_secret';

passport.use('facebook-login', new FacebookStrategy({
        clientID: FACEBOOK_APP_ID,
        clientSecret: FACEBOOK_APP_SECRET,
        callbackURL: `${backUrl}/auth/facebook/login/callback`,
        profileFields: ['id', 'emails', 'name']
    },
    async (accessToken, refreshToken, profile, done) => {
        try {
            console.log("Logging in with Facebook...");
            const email = profile.emails?.[0]?.value;
            if (email) {
                let user = await findUserByEmail(email);

                if (user) {
                    if (user.provider !== "facebook") {
                        return done(null, false, { message: 'Sign up using Facebook' });
                    }
                } else {
                    return done(null, false, { message: 'No user found' });
                }

                const token = jwt.sign({ id: user._id, hasInterests: user.hasInterests, role: user.role }, JWT_SECRET);
                return done(null, { user, token });
            } else {
                return done(null, false, { message: 'No user found' });
            }
        } catch (error) {
            console.error("Error during Facebook OAuth:", error);
            return done(error, false);
        }
    }
));

passport.use('facebook-traveler', new FacebookStrategy({
        clientID: FACEBOOK_APP_ID,
        clientSecret: FACEBOOK_APP_SECRET,
        callbackURL: `${backUrl}/auth/facebook/traveler/callback`,
        profileFields: ['id', 'emails', 'name']
    },
    async (accessToken, refreshToken, profile, done) => {
        try {
            console.log("Registering traveler with Facebook...");
            const email = profile.emails?.[0]?.value;
            console.log(email)
            if (email) {
                let user = await findUserByEmail(email);

                if (user) {
                    if (user.provider !== "facebook") {
                        return done(null, false, { message: 'Sign up using Facebook' });
                    }
                    if (user.role !== "traveler") {
                        return done(null, false, { message: 'User already exists but not as a traveler' });
                    }
                } else {
                    user = await createUser({
                        firstName: profile.name?.givenName || '',
                        lastName: profile.name?.familyName || '',
                        email: email,
                        provider: 'facebook',
                        role: 'traveler'
                    } as IUser);
                }

                const token = jwt.sign({ id: user._id, hasInterests: user.hasInterests, role: user.role }, JWT_SECRET);
                return done(null, { user, token });
            } else {
                return done(null, false, { message: 'No email found' });
            }
        } catch (error) {
            console.error("Error during Facebook OAuth:", error);
            return done(error, false);
        }
    }
));

passport.use('facebook-host', new FacebookStrategy({
        clientID: FACEBOOK_APP_ID,
        clientSecret: FACEBOOK_APP_SECRET,
        callbackURL: `${backUrl}/auth/facebook/host/callback`,
        profileFields: ['id', 'emails', 'name']
    },
    async (accessToken, refreshToken, profile, done) => {
        try {
            console.log("Registering host with Facebook...");
            const email = profile.emails?.[0]?.value;
            if (email) {
                let user = await findUserByEmail(email);

                if (user) {
                    if (user.provider !== "facebook") {
                        return done(null, false, { message: 'Sign up using Facebook' });
                    }
                    if (user.role !== "host") {
                        return done(null, false, { message: 'User already exists but not as a host' });
                    }
                } else {
                    user = await createUser({
                        firstName: profile.name?.givenName || '',
                        lastName: profile.name?.familyName || '',
                        email: email,
                        provider: 'facebook',
                        role: 'host'
                    } as IUser);
                }

                const token = jwt.sign({ id: user._id, hasInterests: user.hasInterests, role: user.role }, JWT_SECRET);
                return done(null, { user, token });
            } else {
                return done(null, false, { message: 'No email found' });
            }
        } catch (error) {
            console.error("Error during Facebook OAuth:", error);
            return done(error, false);
        }
    }
));



passport.serializeUser((data: any, done) => {
    done(null, data.user.id);
});

passport.deserializeUser(async (id: string, done) => {
    try {
        const user = await findUserById(id);
        done(null, user || false);
    } catch (error) {
        done(error, false);
    }
});
