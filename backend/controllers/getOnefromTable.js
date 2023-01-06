import jwt from 'jsonwebtoken';
import User from '../models/mst_user.js';
import Wallet from '../models/mst_wallet.js';
import Category from '../models/mst_category.js';
import Collection from '../models/mst_collection.js';
import Ledger from '../models/mst_ledgers.js';
import TransRecord from '../models/transRecord.js';
import JoinedList from '../models/trans_joined_list.js';
import DebtRecord from '../models/debt_record.js';
import sequelize from '../utils/database.js';
import { createConnection } from 'mysql';

var con = createConnection({
  host: "localhost",
  user: "root",
  password: "Venus-08042",
  database: "budgetapp"
});

con.connect(function(err) {
    if (err) throw err;
});

const getOneWallet = async (req, res, next) => {
  
  const WalletData = await Wallet.findOne({
    where: {
      wallet_id: req.params.wallet_id
    }
  });
  console.log(WalletData);
  res.json({success: true, wallet: WalletData});
}

const getOneUser = async (req, res, next) => {
  const UserData = await User.findAll();
  res.json({success: true, users: UserData});
}

const getOneCategory = async (req, res, next) => {

  const CategoryData = await Category.findAll({
    where: {
      user_id: req.params.user_id
    }
  });
  res.json({success: true, categories: CategoryData});
}


const getOneCollection = async (req, res, next) => {
  const CollectionData = await Collection.findAll({
    where: {
      user_id: req.params.user_id
    }
  });
  res.json({success: true, collections: CollectionData});
}

const getOneLedger = async (req, res, next) => {
  const LedgerData = await Ledger.findAll({
    where: {
      user_id: req.params.user_id
    }
  });
  res.json({success: true, ledgers: LedgerData});
}

const getOneMember = async (req, res, next) => {
  const InAmount = await TransRecord.findOne({
    attributes:[
      [sequelize.fn('sum', sequelize.col('price')), 'total_amount']
    ],
    where: {
      user_id: req.params.user_id,
      cashflow: 'In',
    }
  });


  res.json({success: true, members: MemberData});
}

const getOneTransRecord = async (req, res, next) => {

  const query = "SELECT tr.*, l.ledger_name, c.category_name, col.collection_name, w.wallet_name FROM trans_records tr "+
  "LEFT JOIN mst_ledgers l ON tr.ledger_id = l.ledger_id LEFT JOIN mst_categories c ON c.category_id = tr.category_id "+
  "LEFT JOIN mst_collections col ON col.collection_id = tr.collection_id LEFT JOIN mst_wallets w ON w.wallet_id = tr.wallet_id where tr.trans_id = '"+ req.params.trans_id +"'";

  con.query(query, function (err, result, fields) {
      if (err) throw err;
      res.json({success: true, transrecord: result});
  });
}

const getOneTransJoinedList = async (req, res, next) => {
  const JoinedListData = await JoinedList.findAll({
    where: {
      user_id: req.params.user_id
    }
  });
  res.json({success: true, joinedlists: JoinedListData});
}

const getOneDebtRecord = async (req, res, next) => {
  const DebtRecordData = await DebtRecord.findAll({
    where: {
      user_id: req.params.user_id
    }
  });
  res.json({success: true, debtrecords: DebtRecordData});
}

export {
    getOneWallet,
    getOneUser,
    getOneCategory,
    getOneCollection,
    getOneLedger,
    getOneMember,
    getOneTransRecord,
    getOneTransJoinedList,
    getOneDebtRecord,
};