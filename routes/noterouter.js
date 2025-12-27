import express from 'express'
import { notes } from '../models/notesSchema.js'
import { asyncHandler } from '../middlewares/asynchandler.js';
import { jwtAuth } from '../middlewares/jwtAuth.js';
const note = express.Router();

note.use(jwtAuth)

//READ NOTES
note.get("/", asyncHandler(async (req, res) => {
    const sortAlgo = req.query.sort || "latest"
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.min(parseInt(req.query.limit) || 10, 50);
    const skip = (page - 1) * limit;

var sortOption;
    if (sortAlgo === "latest") sortOption = { createdAt: -1 }
    else if (sortAlgo === "oldest") sortOption = { createdAt: 1 }
    else return res.status(406).json({ message: "Query not Acceptable" })

    const [data, totalNotes] = await Promise.all([
        notes.find({ userId: req.user.userId }).sort(sortOption).skip(skip).limit(limit).lean(),
        notes.countDocuments({ userId: req.user.userId })
    ]);
    const totalPages = Math.ceil(totalNotes / limit);

    res.status(200).json({
        success: true,
        data,
        page,
        limit,
        total: totalNotes,
        totalPages
    });
}));



//RETREIVE SINGLE DOC
note.get('/:id', asyncHandler(async (req, res) => {
    const id = req.params.id;
    const note = await notes.findById(id).lean();
    if (note == null) {
        res.status(404).json({ success: false, message: "Doc Not Found" })
    }
    else {
        res.status(200).json(note);
    }
}))

//POST NOTES
note.post("/", asyncHandler(async (req, res) => {
    const data = req.body.title;
    await notes.create({ title: data, userId: req.user.userId });
    res.status(201).json({ message: "note created" });
}))

//UPDATE DOC
note.patch('/:id', asyncHandler(async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    const note = await notes.findByIdAndUpdate(id, data, { new: true, runValidators: true }).lean();
    if (note == null) {
        res.status(404).json({ success: false, message: "Doc Not Found" })
    }
    else {
        res.status(200).json(note);
    }

}))

//DELETE NOTES
note.get('/deleteall', async (req, res) => {
    await notes.deleteMany({}) // Just so that i can easily delete docs cause i am sending many post request and i need to scroll all the way down to check all docs 
    res.json({ success: true, message: "Doc DELETED" })
})

note.delete('/:id', asyncHandler(async (req, res) => {
    const id = req.params.id;
    const note = await notes.findByIdAndDelete(id).lean();
    if (note == null) {
        res.status(404).json({ success: false, message: "Doc Not Found" })
    }
    else {
        res.status(200).json({ success: true, message: "Doc Deleted" });
    }
}))


export { note }