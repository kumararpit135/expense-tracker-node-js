const express=require('express')
const router=express.Router()
const mysqul=require('mysql2/promise');
const jwt=require('jsonwebtoken');
const verifyToken=require('../middlware/verifyToken')


const controlerExpense=require('../controler/controlerExpense');
router.get('/download',verifyToken,controlerExpense.downloadexpense);
router.post('/updateamount',verifyToken,controlerExpense.updateAmount);
router.post('/expense',verifyToken,controlerExpense.post);
router.get('/expense',verifyToken,controlerExpense.get);
router.delete('/expense/:id',verifyToken,controlerExpense.delete);
module.exports=router;

