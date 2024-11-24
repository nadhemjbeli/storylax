

import express, { Express, Request, Response } from "express";

import {frontUrl} from "./services/urls"; // Ensure this import is present
import cors from 'cors';
import usersRouter from "./routes/user/users.router";
import citiesRouter from "./routes/city/cities.router";
import blogsRouter from "./routes/blog/blogs.router";
import tagsRouter from "./routes/blog-tag/blog-tags.router";
import passport from "passport";
import session from "express-session";
import cookieParser from 'cookie-parser';
/*
 * Create an Express application and get the
 * value of the PORT environment variable
 * from the `process.env`
 */
const app: Express = express();
const prefixPath = "/api"

// Middleware
app.use(express.json()); // For parsing application/json
app.use(cors({
    origin: frontUrl,
    credentials: true // Allow cookies to be sent and received
}));

// Configure session
app.use(session({
    secret: process.env.SESSION_SECRET || 'your_session_secret',
    resave: false,
    saveUninitialized: false
}));

// Use cookie parser middleware
app.use(cookieParser());

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* Define a route for the root path ("/")
 using the HTTP GET method */
app.get("/", (req: Request, res: Response) => {
    res.send("Express + TypeScript Server");
});


// Routes
app.use(prefixPath, usersRouter);
app.use(prefixPath, citiesRouter);
app.use(prefixPath, blogsRouter);
app.use(prefixPath, tagsRouter);


// Export the app instance for testing purposes
// export { app };