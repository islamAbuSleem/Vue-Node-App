const User = require('../../models/user');

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
        console.log(req.body);
        let user = new User();
        user.name = req.body.name,
            user.first = req.body.first,
            user.last = req.body.last,
            user.email = req.body.email,
            user.password = req.body.password,
            user.userId = req.body.userId,
            user.dept = req.body.dept,
            user.isactive = req.body.isactive,
            user.createdOn = req.body.createdOn,
            user.normal = req.body.normal,
            user.urgent = req.body.urgent,
            user.save(function(err, user) {
                if (err) {
                    console.log(err)
                    return res.send('E-mail already exists')
                } else {
                    console.log('save user successfully...');
                    return res.status(200).json(user)
                }
            })

    })

    router.put('/user/userId/:userId', function(req, res) {
        console.log(req.body);
        let doc = {}
        if (req.body.name) {
            doc.name = req.body.name
        }
        if (req.body.first) {
            doc.first = req.body.first
        }
        if (req.body.last) {
            doc.last = req.body.last
        }
        if (req.body.email) {
            doc.email = req.body.email
        }
        if (req.body.password) {
            doc.password = req.body.password
        }
        if (req.body.userId) {
            doc.userId = req.body.userId
        }
        if (req.body.dept) {
            doc.dept = req.body.dept
        }
        if (req.body.normal) {
            doc.normal = req.body.normal
        }
        if (req.body.urgent) {
            doc.urgent = req.body.urgent
        }
        console.log(doc);
        User.update(doc, function(err, resRaw) {
            if (err) return console.log(err);
            res.status(200).json(resRaw)
        })
    })

}