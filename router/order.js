const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const controlerOrder=require('../controler/controlerOrder')
const Razorpay = require('razorpay');
require('dotenv').config();
const verification=require('../middlware/verifyToken')




router.post('/updatetransactionstatus', verification, controlerOrder.post);

router.get('/premiummembership',verification,controlerOrder.get)



module.exports=router;