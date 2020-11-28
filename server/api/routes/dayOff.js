const DayOff = require('../../models/dayOff');

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
            dayoff.save(function(err, dayoff) {
                if (err) { return console.log(err); } else {
                    console.log('save dayOff successfully...');
                    return res.status(200).json(dayoff)
                }
            })

    })

    router.put('/dayOff/:id', function(req, res) {
        console.log(req.body);
        let doc = {
            isactive: req.body.isactive
        }
        console.log(doc);
        DayOff.update(qry, doc, function(err, resRaw) {
            if (err) return console.log(err);
            res.status(200).json(resRaw)
        })
    })
}