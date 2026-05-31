import express from 'express'
import { specificRoute } from '../middlewares/echoroutehandler.js';
const echo = express.Router();
//IGNORE THIS 
echo.post("/", specificRoute, (req, res) => {
    const d = req.body;
    const s = req.source;
    const all = {
        data: d,
        source: s
    }
    res.json(all);
})

export {echo}