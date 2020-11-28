const express = require('express');
const router = express.Router();


require('./routes/user')(router);
require('./routes/dayOff')(router);

module.exports = router;