import express from 'express';
import { signup, login, isAuth } from '../controllers/auth.js';
import { getAllUsers,getAllMembers, getAllCategories, getAllCollections, getAllLedgers, getAllWallets, getAllTransRecords, getAllTransJoinedLists, getAllDebtRecords } from '../controllers/getAllfromTable.js';
import { createTransRecord, createWallet, createCategory, createCollection, createDebtRecord, createJoinedList, createLedger, createMember } from '../controllers/createRecord.js';
import { getOneWallet, getOneUser, getOneCategory, getOneCollection, getOneLedger, getOneMember, getOneTransRecord, getOneTransJoinedList, getOneDebtRecord} from '../controllers/getOnefromTable.js'
import { getAllWAWallets, getAllWAUsers, getAllWACategories, getAllWACollections, getAllWALedgers, getAllWAMembers, getAllWATransRecords, getAllWATransJoinedLists, getAllWADebtRecords} from '../controllers/getAllWithAmount.js';
import { createConnection } from 'mysql';
import User from '../models/mst_user.js';
import Wallet from '../models/mst_wallet.js';
import Category from '../models/mst_category.js';
import Collection from '../models/mst_collection.js';
import Ledger from '../models/mst_ledgers.js';
import TransRecord from '../models/transRecord.js';
import JoinedList from '../models/trans_joined_list.js';
import DebtRecord from '../models/debt_record.js';
import Member from '../models/mst_members.js';

var con = createConnection({
  host: "localhost",
  user: "root",
  password: "Venus-08042",
  database: "budgetapp"
});

con.connect(function(err) {
    if (err) throw err;
});


const router = express.Router();

router.post('/login', login);

router.post('/signup', signup);

router.get('/getTotalAmount/:user_id', (req, res, next) => {
    const user_id = req.params.user_id;
    const query = "SELECT SUM(price) AS 'Total_Amount', SUM(amountPaid) AS 'Available_Amount' FROM trans_records tr JOIN mst_ledgers l ON l.ledger_id = tr.ledger_id WHERE l.count = 'Y' AND tr.user_id = '" + user_id + "'";
    con.query(query, function (err, result, fields) {
        if (err) throw err;
        var json = JSON.parse(JSON.stringify(result));
        res.json({success: true, amounts: result});
    });
}) 

//get all data from table
router.get('/getCategories/:user_id', getAllCategories);
router.get('/getCollections/:user_id', getAllCollections);
router.get('/getDebtRecords/:user_id', getAllDebtRecords);
router.get('/getMembers/:user_id', getAllMembers);
router.get('/getLedgers/:user_id', getAllLedgers);
router.get('/getTransJoinedLists/:user_id', getAllTransJoinedLists);
router.get('/getTransRecords/:user_id', getAllTransRecords);
router.get('/getUsers/:user_id', getAllUsers);
router.get('/getWallets/:user_id', getAllWallets);

router.get('/getWACategories/:user_id', getAllWACategories);
router.get('/getWACollections/:user_id', getAllWACollections);
router.get('/getWADebtRecords/:user_id', getAllWADebtRecords);
router.get('/getWALedgers/:user_id', getAllWALedgers);
router.get('/getWATransJoinedLists/:user_id', getAllWATransJoinedLists);
router.get('/getWATransRecords/:user_id', getAllWATransRecords);
router.get('/getWAUsers/:user_id', getAllWAUsers);
router.get('/getWAWallets/:user_id', getAllWAWallets);

router.post('/deleterecord', async (req, res, next) => {
    console.log(req.body.trans_id);

    await TransRecord.destroy({where: {
        trans_id: req.body.trans_id
    }})
    .catch(err => {
        console.log('error', err);
    });
    
    
})

router.get('/getOneCategory/:category_id', getOneCategory);
router.get('/getOneCollection/:trans_id', getOneCollection);
router.get('/getOneDebtRecord/:debt_id', getOneDebtRecord);
router.get('/getOneLedger/:ledger_id', getOneLedger);
router.get('/getOneMember/:member_id', getOneMember);
router.get('/getOneTransJoinedList/:joined_id', getOneTransJoinedList);
router.get('/getOneTransRecord/:trans_id', getOneTransRecord);
router.get('/getOneUser/:user_id', getOneUser);
router.get('/getOneWallet/:wallet_id', getOneWallet);

//create table record
router.post('/createCategory', createCategory);
router.post('/createCollection',createCollection);
router.post('/createDebtRecord',createDebtRecord);
router.post('/createJoinedList',createJoinedList);
router.post('/createLedger',createLedger);
router.post('/createMember',createMember);
router.post('/createTransRecord',createTransRecord);
router.post('/createWallet',createWallet);


router.get('/private', isAuth);

router.get('/public', (req, res, next) => {
    res.status(200).json({ message: "here is your public resource" });
});

// will match any other path
router.use('/', (req, res, next) => {
    res.status(404).json({error : "page not found"});
});

export default router;