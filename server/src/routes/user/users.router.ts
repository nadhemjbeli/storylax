// src/routes/user/users.router.ts
import { Router } from 'express';
import {
    getUsers,
    addUser,
    getUserById,
    updateUser,
    deleteUser,
    signIn,
    signUp,
    resetPassword, forgotPassword, updateUserHasInterestsController
} from './users.controller';
import {signInSchema, signUpSchema} from "./auth.validation";
import {authenticateAdmin, authenticateTraveler, authenticateUserByRole} from "../../middleware/auth";
import passport from "passport";
import {frontAdminUrl, frontHostUrl, frontUrl} from "../../services/urls";
import {IUserTokenSchema} from "../../models/user/users.schema";
import jwt from "jsonwebtoken";
import multer from "multer";
import {allRoles, travelerRoles} from "../../utils/roleVariables";

const router = Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/images/user');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

const prepath='/users'

router.get('/users', authenticateAdmin, getUsers);
router.post('/users', addUser);
router.get(`${prepath}/:id`, getUserById);
router.put(`${prepath}/current`,
    authenticateUserByRole(allRoles),
    (req, res) => {
    updateUserHasInterestsController(req, res)
});
router.put(`${prepath}/:id`, upload.single('image'), (req, res) => {
    console.log(req.body);
    updateUser(req, res)
});
router.delete('/users/:id', deleteUser);


// Sign-Up Route
router.post('/auth/sign-up', signUpSchema, signUp);

// Sign-In Route
router.post('/auth/sign-in', signInSchema, signIn);

// Forgot Password
router.post('/auth/forgot-password', forgotPassword);
router.post('/auth/reset-password', resetPassword);

// Logout Route
router.post('/auth/logout', (req, res) => {
    res.clearCookie('storylax-token'); // Clear the authentication cookie
    res.status(200).json({ message: 'Logged out successfully' });
});


// Initiate Google OAuth process for Host
router.get('/auth/google/login',
    passport.authenticate('google-login', { scope: ['profile', 'email'] }));

// Initiate Google OAuth process for Traveler
router.get('/auth/google/traveler',
    passport.authenticate('google-traveler', { scope: ['profile', 'email'] }));


// Initiate Google OAuth process for Host
router.get('/auth/google/host',
    passport.authenticate('google-host', { scope: ['profile', 'email'] }));


// Handle Google OAuth callback for Traveler
router.get('/auth/google/login/callback',
    passport.authenticate('google-login', { session: false, failureRedirect: 'http://localhost:3009/Login?error=User+not+found' }),
    (req, res) => {
        if (req.user) {
            const { user, token } = req.user as IUserTokenSchema;

            // Set the token as a cookie
            res.cookie('storylax-token', token, {
                httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
                secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
            });

            // Redirect based on user role
            const redirectUrl = user.role === 'admin' ? frontAdminUrl: user.role === 'host' ? frontHostUrl : frontUrl;
            res.redirect(redirectUrl);

        } else {
            res.redirect(`${frontUrl}/Login?error=Failed+to+authenticate`);
        }
    }
);

// Handle Google OAuth callback for Traveler
router.get('/auth/google/traveler/callback',
    passport.authenticate('google-traveler', { session: false, failureRedirect: 'http://localhost:3009/Sign-up?error=Email+already+used' }),
    (req, res) => {
        if (req.user) {
            const { user, token } = req.user as IUserTokenSchema;

            // Set the token as a cookie
            res.cookie('storylax-token', token, {
                httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
                secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
            });

            // Redirect to home or a desired page
            res.redirect(frontUrl);
        } else {
            res.redirect(`${frontUrl}/Sign-up?error=Failed+to+authenticate`);
        }
    }
);

// Handle Google OAuth callback for Host
router.get('/auth/google/host/callback',
    passport.authenticate('google-host', { session: false, failureRedirect: 'http://localhost:3009/Sign-up?error=Email+already+used' }),
    (req, res) => {
        if (req.user) {
            const { user, token } = req.user as IUserTokenSchema;

            // Set the token as a cookie
            res.cookie('storylax-token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
            });

            // Redirect to home or a desired page
            res.redirect(frontUrl);
        } else {
            res.redirect(`${frontUrl}/Sign-up?error=Failed+to+authenticate`);
        }
    }
);



router.get("/loggedIn", (req, res) => {
    try {
        const token = req.cookies['storylax-token'];

        if (!token) return res.json({
            state:false,
            token:null
        });
        const decoded =jwt.verify(token, process.env.JWT_SECRET||'some secret here')
        // Log the decoded token to check the payload
        console.log('Decoded token:', decoded);

        res.send({
            state:true,
            token:decoded
        });
    } catch (err) {
        res.json({
            state:false,
            token:null
        });
    }
});

// Initiate Facebook OAuth process for login
router.get('/auth/facebook/login',
    passport.authenticate('facebook-login', { scope: ['email'] }));

// Initiate Facebook OAuth process for Traveler
router.get('/auth/facebook/traveler',
    passport.authenticate('facebook-traveler', { scope: ['email'] }));

// Initiate Facebook OAuth process for Host
router.get('/auth/facebook/host',
    passport.authenticate('facebook-host', { scope: ['email'] }));

// Handle Facebook OAuth callback for login
router.get('/auth/facebook/login/callback',
    passport.authenticate('facebook-login', { session: false, failureRedirect: `${frontUrl}/Login?error=User+not+found` }),
    (req, res) => {
        if (req.user) {
            const { user, token } = req.user as IUserTokenSchema;

            // Set the token as a cookie
            res.cookie('storylax-token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
            });

            // Redirect based on user role
            const redirectUrl = user.role === 'admin' ? frontAdminUrl : frontUrl;
            res.redirect(redirectUrl);
        } else {
            res.redirect(`${frontUrl}/Login?error=Failed+to+authenticate`);
        }
    }
);

// Handle Facebook OAuth callback for Traveler
router.get('/auth/facebook/traveler/callback',
    passport.authenticate('facebook-traveler', { session: false, failureRedirect: `${frontUrl}/Sign-up?error=Email+already+used` }),
    (req, res) => {
        if (req.user) {
            const { user, token } = req.user as IUserTokenSchema;

            // Set the token as a cookie
            res.cookie('storylax-token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
            });

            res.redirect(frontUrl);
        } else {
            res.redirect(`${frontUrl}/Sign-up?error=Failed+to+authenticate`);
        }
    }
);

// Handle Facebook OAuth callback for Host
router.get('/auth/facebook/host/callback',
    passport.authenticate('facebook-host', { session: false, failureRedirect: `${frontUrl}/Sign-up?error=Email+already+used` }),
    (req, res) => {
        if (req.user) {
            const { user, token } = req.user as IUserTokenSchema;

            // Set the token as a cookie
            res.cookie('storylax-token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
            });

            res.redirect(frontUrl);
        } else {
            res.redirect(`${frontUrl}/Sign-up?error=Failed+to+authenticate`);
        }
    }
);

export default router;
