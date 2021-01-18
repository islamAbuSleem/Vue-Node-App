const User = require('../../models/user');
const helper = require('../../helper/functions')

module.exports = function(router) {


    router.get('/user/:userId', function(req, res, next) {
        User.findById(req.params.userId).exec()
            .then(docs => res.status(200)
                .json(docs))
            .catch(err => res.status(500).console.log(err)
                .json({
                    message: 'error finding user',
                    error: err
                }))

    })
    router.get('/user', function(req, res, next) {
        User.find().exec()
            .then(docs => res.status(200)
                .json(docs))
            .catch(err => res.status(500).console.log(err)
                .json({
                    message: 'error finding user',
                    error: err
                }))

    })
    router.get('/user/userId/:userId', function(req, res) {
        User.find({ 'userId': req.params.userId }).exec()
            .then(docs => res.status(200)
                .json(docs))
            .catch(err => res.status(500)
                .json({
                    message: 'error finding user',
                    error: err
                }))
    })
    router.get('/user/email/:email', function(req, res) {
        User.find({ 'email': req.params.email }).exec()
            .then(docs => {
                res.status(200)
                    .json(docs)
                console.log(docs[0].email)
            })
            .catch(err => res.status(500)
                .json({
                    message: 'error finding user',
                    error: err
                }))
    })

    router.post('/user', function(req, res) {

        if (!helper.checkEmail(req.body.email)) { return res.send('Please enter a valid e-mail') }
        if (!Number.isInteger(+req.body.userId)) { return res.send('Please enter a valid user id') }
        if (!Number.isInteger(+req.body.normal)) { return res.send('Please enter a valid number in dayoff') }
        if (!Number.isInteger(+req.body.urgent)) { return res.send('Please enter a valid number in dayoff') }
        if (req.body.name.split(" ").length < 2) { return res.send('Please enter a valid username') }

        let user = new User();
        user.name = req.body.name,
            user.first = req.body.first,
            user.last = req.body.last,
            user.email = req.body.email,
            user.password = '12345678A',
            user.userId = req.body.userId,
            user.dept = req.body.dept,
            user.isactive = req.body.isactive,
            user.createdOn = req.body.createdOn,
            user.normal = req.body.normal,
            user.urgent = req.body.urgent,
            user.team = req.body.team,
            user.role = req.body.role,
            user.save(function(err, user) {
                if (err) {
                    console.log(err)
                    return res.send('User already exists')
                } else {
                    console.log(user, 'save user successfully...');
                    return res.status(200).json(user)
                }
            })


    })

    router.put('/user/userId/:userId', function(req, res) {
        console.log(req.params.userId);
        // User.findByIdAndUpdate({_id:req.params.id}, req.body).then(function(){
        //     User.findOne({_id: req.params.id}).then(function(user){
        //         res.send(user)
        //     })
        // })
        User.findOneAndUpdate({ userId: req.params.userId }, req.body).then(function() {
            User.findOne({ userId: req.params.userId }).then(function(user) {
                res.status(200).send(user)
            })
        })
    })

}