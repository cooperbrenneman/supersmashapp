import express from "express"
const router = express.Router();
import User from '../models/user.model.js'; 

router.route('/').get((req,res) => {
    User.find().sort({ username: 1 })
        .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/').post((req, res) => {
    const username = req.body.username;

    const newUser = new User({
        'username': username,
    });

    newUser.save()
    .then(() => res.json(`User '${username}' added!`))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    User.findById(req.params.id)
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err));
});

export default router;