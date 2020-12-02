const EzenEnseraf = require('../../models/ezen');

module.exports = function(router) { // here i need to modify export
    router.get('/ezen/:Id', function(req, res, next) {
        EzenEnseraf.findById(req.params.userId).exec()
            .then(docs => res.status(200)
                .json(docs))
            .catch(err => res.status(500)
                .json({
                    message: 'error finding user',
                    error: err
                }))

    })
    router.get('/ezen/userId/:userId', function(req, res) {
        EzenEnseraf.find({ 'userId': req.params.userId }).exec()
            .then(docs => res.status(200)
                .json(docs))
            .catch(err => res.status(500)
                .json({
                    message: 'error finding user',
                    error: err
                }))
    })

    router.post('/ezen', function(req, res) {
        console.log(req.body);
        let ezenEnseraf = new EzenEnseraf();
        ezenEnseraf.userName = req.body.userName,
            ezenEnseraf.date = req.body.date,
            ezenEnseraf.userId = req.body.userId,
            ezenEnseraf.dept = req.body.dept,
            ezenEnseraf.time = req.body.time,
            ezenEnseraf.type = req.body.type,
            ezenEnseraf.startDate = req.body.startDate,
            ezenEnseraf.endDate = req.body.endDate,
            ezenEnseraf.means = req.body.means,
            ezenEnseraf.period = req.body.period,
            ezenEnseraf.desc = req.body.desc,
            ezenEnseraf.save(function(err, ezenEnseraf) {
                if (err) { return console.log(err); } else {
                    console.log('save ezen successfully...');
                    return res.status(200).json(ezenEnseraf)
                }
            })

    })

    router.put('/ezen/:id', function(req, res) {
        console.log(req.body);
        let doc = {
            isactive: req.body.isactive
        }
        console.log(doc);
        EzenEnseraf.update(qry, doc, function(err, resRaw) {
            if (err) return console.log(err);
            res.status(200).json(resRaw)
        })
    })
}