const {Router} = require('express');

const Item = require('../models/ITask');

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

router.patch('/:id', async (req, res) => {
    try{
        const { id } = req.params;
        const item = await Item.findByIdAndUpdate(id);
        item.name = req.body.name;

        await item.save();
        const items = await Item.find();
        res.json(items);
    } catch (e) {
        res.json(e.toString());
    }
});

router.patch('/add/:id', async (req, res) => {
    try {
        const {
            id
        } = req.params;
        const item = await Item.findByIdAndUpdate(id);
        item.comments = req.body.comments;

        await item.save();
        const items = await Item.find();
        res.json(items);
    } catch (e) {
        res.json(e.toString());
    }
});

router.patch('/like/:id', async (req, res) => {
    try {
        const {
            id
        } = req.params;
        const item = await Item.findByIdAndUpdate(id);
        item.like = req.body.like+1;

        await item.save();
        const items = await Item.find();
        res.json(items);
    } catch (e) {
        res.json(e.toString());
    }
});

router.patch('/dislike/:id', async (req, res) => {
    try {
        const {
            id
        } = req.params;
        const item = await Item.findByIdAndUpdate(id);
        item.dislike = req.body.dislike + 1;

        await item.save();
        const items = await Item.find();
        res.json(items);
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