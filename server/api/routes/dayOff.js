const DayOff = require('../../models/dayOff');
const fs = require('fs');
const { json } = require('body-parser');
module.exports = function(router) {


    router.get('/dayOff/:Id', function(req, res, next) {
        DayOff.findById(req.params.userId).exec()
            .then(docs => res.status(200)
                .json(docs))
            .catch(err => res.status(500)
                .json({
                    message: 'error finding user',
                    error: err
                }))

    })
    router.get('/dayOff/userId/:userId', function(req, res) {
        DayOff.find({ 'userId': req.params.userId }).exec()
            .then(docs => res.status(200)
                .json(docs))
            .catch(err => res.status(500)
                .json({
                    message: 'error finding user',
                    error: err
                }))
    })
    router.get('/dayOff/team/:team', function(req, res) {
        DayOff.find({ 'team': req.params.team }).exec()
            .then(docs => res.status(200)
                .json(docs))
            .catch(err => res.status(500)
                .json({
                    message: 'error finding user',
                    error: err
                }))
    })
    router.get('/dayOff/dept/:dept', function(req, res) {
        DayOff.find({ 'dept': req.params.dept }).exec()
            .then(docs => res.status(200)
                .json(docs))
            .catch(err => res.status(500)
                .json({
                    message: 'error finding user',
                    error: err
                }))
    })
    router.get('/dayOff/status/:status', function(req, res) {
        DayOff.find({ 'status': req.params.status }).exec()
            .then(docs => {
                res.status(200)
                    .json(docs)
                console.log(res)
            })
            .catch(err => {
                res.status(500)
                    .json({
                        message: 'error finding user',
                        error: err
                    })
                console.log(err)
            })
    })
    router.get('/dayOff', function(req, res) {
        DayOff.find().exec()
            .then(docs => {
                fs.writeFile('./data.json', JSON.stringify(docs), (err) => console.log(err))
                res.status(200).json(docs)

            })
            .catch(err => res.status(500)
                .json({
                    message: 'error finding user',
                    error: err
                }))
    })

    router.post('/dayOff', function(req, res) {
        console.log(req.body);
        let dayoff = new DayOff();

        dayoff.userName = req.body.userName,
            dayoff.startDate = req.body.startDate,
            dayoff.endDate = req.body.endDate,
            dayoff.period = req.body.period,
            dayoff.userId = req.body.userId,
            dayoff.dept = req.body.dept,
            dayoff.createdOn = req.body.createdOn,
            dayoff.offType = req.body.offType,
            dayoff.returnDay = req.body.returnDay,
            dayoff.returnDate = req.body.returnDate,
            dayoff.doWorkName = req.body.doWorkName,
            dayoff.team = req.body.team,
            dayoff.teamLeader = '',
            dayoff.manager = '',
            dayoff.topManager = '',
            dayoff.hrManager = '',
            dayoff.status = req.body.status,
            dayoff.save(function(err, dayoff) {
                if (err) { return console.log(err); } else {
                    console.log('save dayOff successfully...');
                    return res.status(200).json(dayoff)
                }
            })

    })


    router.put('/dayOff/:id', function(req, res) {
        console.log(req.params.id);
        DayOff.findOneAndUpdate({ _id: req.params.id }, req.body).then(function() {
            DayOff.findOne({ _id: req.params.id }).then(function(user) {
                res.status(200).send(user)
            })
        })
    })

}