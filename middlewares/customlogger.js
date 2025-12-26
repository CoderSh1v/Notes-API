import fs from 'fs'
export const logger = function (req, res, next) {
    const method = req.method;
    const path = req.protocol + "://" + req.headers['host'] + req.originalUrl;
    const now = new Date();
    const timeString = now.toLocaleTimeString();
    fs.appendFile("./log.txt", `${method} request at ${timeString} from ${path}\n`, (e) => {
        if (e)
            console.log(e);
    })
    next();
}