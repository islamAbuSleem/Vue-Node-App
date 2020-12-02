const express = require('express');
const router = express.Router();


require('./routes/user')(router);
require('./routes/dayOff')(router);
require('./routes/ezen')(router);

module.exports = router;