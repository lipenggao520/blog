const express = require('express');
// const app = express();
const router = express.Router();

const ctrl = require('../controaaer/index.js');


router.get('/', ctrl.getApi);

module.exports = router;