// package imports
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

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
const __dirname = path.resolve();

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

// Serve static files from the 'tmp' folder
app.use('/tmp', express.static(path.join(__dirname, 'tmp')));

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
