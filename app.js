import express from 'express'
import { errorMiddleware } from './middlewares/errorhandler.js';
import { asyncHandler } from './middlewares/asynchandler.js';
import { logger } from './middlewares/customlogger.js';
import { echo } from './routes/echo.route.js';
import { note } from './routes/noterouter.js';
import { auth } from './routes/auth.js';
const app = express();

app.use(express.json());
app.use(logger);


app.get("/", (req, res) => {
    res.json({ "message": "Express is Working" })
})

app.get("/time", (req, res) => {
    let time = new Date();
    res.json({ time: time.toString() });

})

app.use ("/echo",echo)

app.use ("/auth",auth)

app.use('/notes',note)

app.get("/boom", asyncHandler(async (req,res) => {
    throw new Error("Async Boom Happened");
}));


app.use(errorMiddleware)

export {app} 