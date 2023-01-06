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

const getAllWAWallets = async (req, res, next) => {
  const user_id = req.params.user_id;
  const query = "SELECT w.*, SUM(tr.price) AS Total_Amount FROM mst_wallets w" +
    " JOIN trans_records tr ON w.wallet_id = tr.wallet_id" +
    " WHERE tr.user_id = '"+ user_id +"'"+
    " GROUP BY tr.wallet_id"+
    " UNION "+
    " SELECT w1.*, '0.00' AS Total_Amount FROM mst_wallets w1"+
    " WHERE w1.wallet_id not in (SELECT wallet_id FROM trans_records WHERE user_id = '"+ user_id +"' GROUP BY wallet_id) "+
    " AND w1.user_id = '"+ user_id +"'";

  con.query(query, function (err, result, fields) {
      if (err) throw err;
      res.json({success: true, wallets: result});
  });

}

const getAllWAUsers = async (req, res, next) => {
  const UserData = await User.findAll();
  res.json({success: true, users: UserData});
}

const getAllWACategories = async (req, res, next) => {

  const user_id = req.params.user_id;
  const query = "SELECT w.*, SUM(tr.price) AS Total_Amount FROM mst_categories w" +
    " JOIN trans_records tr ON w.category_id = tr.category_id" +
    " WHERE tr.user_id = '"+ user_id +"'"+
    " GROUP BY tr.category_id"+
    " UNION "+
    " SELECT w1.*, '0.00' AS Total_Amount FROM mst_categories w1"+
    " WHERE w1.category_id not in (SELECT w3.category_id FROM mst_categories w3" +
    " JOIN trans_records tr ON w3.category_id = tr.category_id" +
    " WHERE tr.user_id = '"+ user_id +"')"+
    " AND w1.user_id = '"+ user_id +"'";

  con.query(query, function (err, result, fields) {
      if (err) throw err;
      res.json({success: true, categories: result});
  });
}


const getAllWACollections = async (req, res, next) => {

  const user_id = req.params.user_id;
  const query = "SELECT w.*, SUM(tr.price) AS Total_Amount FROM mst_collections w" +
    " JOIN trans_records tr ON w.collection_id = tr.collection_id" +
    " WHERE tr.user_id = '"+ user_id +"'"+
    " GROUP BY tr.collection_id"+
    " UNION "+
    " SELECT w1.*, '0.00' AS Total_Amount FROM mst_collections w1"+
    " WHERE w1.collection_id not in (SELECT w.collection_id FROM mst_collections w JOIN trans_records tr ON w.collection_id = tr.collection_id WHERE tr.user_id = '"+ user_id +"')"+
    " AND w1.user_id = '"+ user_id +"'";

  con.query(query, function (err, result, fields) {
      if (err) throw err;
      res.json({success: true, collections: result});
  });
}

const getAllWALedgers = async (req, res, next) => {
  const user_id = req.params.user_id;
  const query = "SELECT w.*, SUM(tr.price) AS Total_Amount FROM mst_ledgers w" +
    " JOIN trans_records tr ON w.ledger_id = tr.ledger_id" +
    " WHERE tr.user_id = '"+ user_id +"'"+
    " GROUP BY tr.ledger_id"+
    " UNION "+
    " SELECT w1.*, '0.00' AS Total_Amount FROM mst_ledgers w1"+
    " WHERE w1.ledger_id not in (SELECT ledger_id FROM trans_records WHERE user_id = '"+ user_id +"' GROUP BY ledger_id) "+
    " AND w1.user_id = '"+ user_id +"'";

  con.query(query, function (err, result, fields) {
      if (err) throw err;
      res.json({success: true, ledgers: result});
  });
}

const getAllWAMembers = async (req, res, next) => {
  const InAmount = await Member.findOne({
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

const getAllWATransRecords = async (req, res, next) => {
  const TransRecordData = await TransRecord.findAll({
    where: {
      user_id: req.params.user_id
    }
  });
  res.json({success: true, transrecords: TransRecordData});
}

const getAllWATransJoinedLists = async (req, res, next) => {
  const JoinedListData = await JoinedList.findAll({
    where: {
      user_id: req.params.user_id
    }
  });
  res.json({success: true, joinedlists: JoinedListData});
}

const getAllWADebtRecords = async (req, res, next) => {
  const user_id = req.params.user_id;
  const query = "SELECT *, m.member_name FROM budgetapp.debt_records dr JOIN mst_members m On m.member_id = dr.member_id WHERE dr.user_id = '"+ user_id +"';";

  con.query(query, function (err, result, fields) {
      if (err) throw err;
      res.json({success: true, debtrecords: result});
  });
}

export {
    getAllWAWallets,
    getAllWAUsers,
    getAllWACategories,
    getAllWACollections,
    getAllWALedgers,
    getAllWAMembers,
    getAllWATransRecords,
    getAllWATransJoinedLists,
    getAllWADebtRecords,
};