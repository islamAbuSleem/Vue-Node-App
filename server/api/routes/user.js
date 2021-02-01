const User = require('../../models/user');
const bcrypt = require('bcrypt');
const helper = require('../../helper/functions');
const jwt = require('jsonwebtoken');

const saltRounds = 10;

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

    router.post('/user/userId/', async(req, res) => {
        await User.find({ "userId": req.body.userId }).exec()
            .then(docs => {
                console.log(req.body.userId)
                console.log(docs)
                res.status(200)
                    .json(docs)
            })
            .catch(err => res.status(500)
                .json({
                    message: 'error finding user',
                    error: err
                }))
    })

    router.post('/user/login/', async(req, res) => {
        const { email, password } = req.body
        await User.find({ email }).exec().then(docs => {
            bcrypt.compare(password, docs[0].password).then(function(result) {
                if (result) {
                    const token = jwt.sign({
                        email: docs.email,
                        userId: docs._id
                    }, 'secret', { expiresIn: '2h' })
                    res.status(200)
                    res.json({ docs, token })
                } else {
                    return res.send("invalid password")
                }
            });
        }).catch(err => {
            return res.status(404)
                .json({
                    message: 'error finding user',
                    error: err
                })
        })
    })


    router.post('/user', async function(req, res) {

        if (!helper.checkEmail(req.body.email)) { return res.send('Please enter a valid e-mail') }
        if (!Number.isInteger(+req.body.userId)) { return res.send('Please enter a valid user id') }
        if (!Number.isInteger(+req.body.normal)) { return res.send('Please enter a valid number in dayoff') }
        if (!Number.isInteger(+req.body.urgent)) { return res.send('Please enter a valid number in dayoff') }
        if (req.body.name.split(" ").length < 2) { return res.send('Please enter a valid username') }

        const password = '12345678A';
        // const hash = await bcrypt.hash(req.body.password, saltRounds);
        const hash = await bcrypt.hash(password, saltRounds);
        let user = new User();
        user.name = req.body.name,
            user.first = req.body.first,
            user.last = req.body.last,
            user.email = req.body.email,
            user.password = hash,
            user.userId = req.body.userId,
            user.dept = req.body.dept,
            user.isactive = req.body.isactive,
            user.createdOn = req.body.createdOn,
            user.normal = req.body.normal,
            user.urgent = req.body.urgent,
            user.annualNormal = req.body.annualNormal,
            user.annualUrgent = req.body.annualUrgent,
            user.quarterDay = "1",
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