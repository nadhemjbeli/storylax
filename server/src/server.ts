// src/server.ts
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import connection from "./services/mongo";
import cors from 'cors';
import usersRouter from "./routes/user/users.router";
import citiesRouter from "./routes/city/cities.router";
import blogsRouter from "./routes/blog/blogs.router";
import blogTagsRouter from "./routes/blog-tag/blog-tags.router";
import explorePlacesRouter from "./routes/explore-place/explore-places.router"; // Ensure this import is present
import passport from "passport";
import session from "express-session";
import cookieParser from 'cookie-parser';
import './routes/user/auth.passport';
import {frontUrl} from "./services/urls";
import explorePlaceEventsRouter from "./routes/explore-place-event/explore-place-events.router";
import explorePlaceMapsRouter from "./routes/explore-place-map/explore-place-maps.router";
import eventsRouter from "./routes/event/events.router";
import blogImagesRouter from "./routes/blog-image/blog-images.router";
import userInterestsRouter from "./routes/user-interest/user-interests.router";
import blogCommentsRouter from "./routes/blog/blog-comment/blog-comments.router";
import blogReviewsRouter from "./routes/blog/blog-review/blog-reviews.router";
import hotelsRouter from "./routes/hotel/hotels.router";
import hotelBookingRouter from "./routes/hotel/hotel-booking/hotel-bookings.router";
import hotelReservationsRouter from "./routes/hotel/hotel-reservation/hotel-reservations.router";
import hotelServicesRouter from "./routes/hotel/hotel-service/hotel-services.router";
import eventCardsRouter from "./routes/event/event-card/event-cards.router";
import scoreRouter from "./routes/event/event-card/event-card-score/event-card-score.router";
import hotelReviewsRouter from "./routes/hotel/hotel-review/hotel-reviews.router";

/*
 * Load up and parse configuration details from
 * the `.env` file to the `process.env`
 * object of Node.js
 */
dotenv.config();

// Connect to db
connection()

/*
 * Create an Express application and get the
 * value of the PORT environment variable
 * from the `process.env`
 */
const app: Express = express();
const port = process.env.PORT || 5001;
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

// Serve static files from 'uploads/images' directory
app.use(`${prefixPath}/uploads/images`, express.static('uploads/images'));
app.use(`${prefixPath}/uploads/icons`, express.static('uploads/icons'));

/* Define a route for the root path ("/")
 using the HTTP GET method */
app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});


// Routes
app.use(prefixPath, usersRouter);
app.use(prefixPath, userInterestsRouter);
app.use(prefixPath, citiesRouter);
app.use(prefixPath, blogsRouter);
app.use(prefixPath, blogImagesRouter);
app.use(prefixPath, blogTagsRouter);
app.use(prefixPath, blogCommentsRouter);
app.use(prefixPath, blogReviewsRouter);
app.use(prefixPath, explorePlacesRouter);
app.use(prefixPath, explorePlaceEventsRouter);
app.use(prefixPath, explorePlaceMapsRouter);
app.use(prefixPath, eventsRouter);
app.use(prefixPath, eventCardsRouter);
app.use(prefixPath, scoreRouter);
app.use(prefixPath, hotelsRouter);
app.use(prefixPath, hotelBookingRouter);
app.use(prefixPath, hotelReservationsRouter);
app.use(prefixPath, hotelServicesRouter);
app.use(prefixPath, hotelReviewsRouter);


// Export the app instance for testing purposes
export { app };

/* Start the Express app and listen
 for incoming requests on the specified port */
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});


