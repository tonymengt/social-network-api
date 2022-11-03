const { User, Thought } = require('../models');

const userController = {
    getAllUser(req, res) {
        User.find({})
            .then(dbUserData => {
                res.json(dbUserData)
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            })
    },
    getUserById({ params }, res) {
        User.findById({_id: params.id})
            .then(dbUserData => {
                if(!dbUserData) {
                    res.status(404).json({ message: 'no user id found.'});
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            })
    },
    createUser({ body }, res) {
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            })
    },
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id}, body, {new: true})
            .then(dbUserData => {
                if(!dbUserData) {
                    res.status(404).json({message: 'user id not found!'});
                    return;
                }
                res.json(dbUserData)
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err)
            })
    },
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then(dbUserData => {
                if(!dbUserData) {
                    res.status(404).json({ message: 'user not found!'});
                    return;
                }
                return Thought.remove({_id: {$in: dbUserData.thoughts}})
            })
            .then(dbThoughtData => res.status(200).json({message: 'thoughts deleted', results: dbThoughtData}))
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            })
    },
    addFriend({ params }, res) {
        User.findOneAndUpdate({ _id: params.userId }, {$push: {friends: params.friendId} }, {new: true})
            .then(dbUserData => {
                if(!dbUserData){
                    res.status(404).json({ message: 'user id not found'});
                    return;
                }
                res.json(dbUserData)
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            })
    },
    deleteFriend({ params }, res) {
        User.findOneAndUpdate({ _id: params.userId }, {$pull: {friends:  params.friendId }}, {new: true})
            .then(dbUserData => {
                if(!dbUserData){
                    res.status(404).json({ message: 'user id not found'});
                    return;
                }
                res.json(dbUserData)
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            })
    }
}

module.exports = userController;