const {Router} = require('express');
const mongoose = require('mongoose');

const Item = require('../models/ITask');
const findComments = require('../helpers/find-coments');
const findLikeDislike = require('../helpers/like-dislike');

const router = Router();

router.post('/add', async (req, res) => {
    const {
        name,
        author,
        comments,
        like,
        dislike
    } = req.body;
    const item = new Item({
        name,
        author,
        comments,
        like,
        dislike,
        date: new Date
    });
    await item.save();
    const items = await Item.find();
    res.json(items);
});

router.get('/', async (req, res) => {
    try{
        const items = await Item.find();
        res.json(items);
    } catch (e) {
        res.json(e.toString());
    }
});

router.put('/:id', async (req, res) => {
    try {
        const {
            id
        } = req.params;
        const {
            parentId,
            task
        } = req.body;
        const items = await Item.find();
        const parent = items.find((obj) => obj._id == parentId);
        let item = await Item.findByIdAndUpdate(parentId);
        if (task._id == parentId) {
            item.name = task.name;
        } else{            
            findComments(parent, id, task.name, 'name');
            item.comments = parent.comments;
        }
        await item.save();
        const newItems = await Item.find();
        res.json(newItems);
    } catch (e) {

        res.json(e.toString());
    }
});

router.put('/add/:id', async (req, res) => {
    try {
        const {
            id
        } = req.params;
        const {
            parentId,
            comment
        } = req.body;

        comment._id = new mongoose.Types.ObjectId();
        comment.date = new Date();
        const items = await Item.find();
        const parent = items.find((obj) =>obj._id == parentId);

        findComments(parent, id, comment, 'comments');
        const item = await Item.findByIdAndUpdate(parentId);

        item.comments = parent.comments;

        await item.save();
        const newItems = await Item.find();
        res.json(newItems);
    } catch (e) {

        res.json(e.toString());
    }
});

router.put('/like/:id', async (req, res) => {
    try {
        const {
            id
        } = req.params;
        const {
            parentId,
            task
        } = req.body;

        const items = await Item.find();
        const parent = items.find((obj) => obj._id == parentId);
        let item = await Item.findByIdAndUpdate(parentId);

        

        if (task._id == parentId) {
           item.like = ++task.like;
        } else {
            findLikeDislike(parent.comments, id, task, 'like');
            item.comments = parent.comments;
        }
        await item.save();
        const newItems = await Item.find();
        res.json(newItems);
    } catch (e) {

        res.json(e.toString());
    }
});

router.put('/dislike/:id', async (req, res) => {
    try {
        const {
            id
        } = req.params;
        const {
            parentId,
            task
        } = req.body;

        const items = await Item.find();
        const parent = items.find((obj) => obj._id == parentId);
        let item = await Item.findByIdAndUpdate(parentId);

        if (task._id == parentId) {
            item.dislike = ++task.dislike;
        } else {
            findLikeDislike(parent.comments, id, task, 'dislike');
            item.comments = parent.comments;
        }

        await item.save();
        const newItems = await Item.find();
        res.json(newItems);
    } catch (e) {
        res.json(e.toString());
    }
});

router.delete('/:id', async (req, res) => {
    try{
        const { id } = req.params;
        await Item.findByIdAndDelete(id);
        const items = await Item.find();
        res.json(items);
    } catch (e) {
        res.json(e.toString());
    }
});


module.exports = router;