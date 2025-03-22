// package imports
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport'; // Import Passport.js
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

// module imports
import { BASEPATH } from './constants.js';
import { errorHandler } from './middlewares/error.middleware.js';
import { ApiResponse } from './utils/ApiResponse.js';
import { ApiError } from './utils/ApiError.js';

// routes imports
import authRouters from './routes/auth.routes.js';
import uploadRouters from './routes/upload.routes.js';
import downloadRouters from './routes/download.routes.js';
import fileRouters from './routes/file.routes.js';

// constants
const app = express();

// middlewares
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

// Initialize Passport.js
app.use(passport.initialize());
app.use(passport.session());

// Test route
app.get(`${BASEPATH}/healthcheck`, (_, res) => {
  try {
    return res.status(200).json(new ApiResponse(200, 'ok'));
  } catch (error) {
    console.log(error);
    throw new ApiError(500, error.message);
  }
});

// route
app.use(`${BASEPATH}/auth`, authRouters);
app.use(`${BASEPATH}/upload`, uploadRouters);
app.use(`${BASEPATH}/download`, downloadRouters);
app.use(`${BASEPATH}/dashboard`, fileRouters);

// Error middleware
app.use(errorHandler);

export { app };
