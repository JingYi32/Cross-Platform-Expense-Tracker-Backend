import jwt from 'jsonwebtoken';
import User from '../models/mst_user.js';
import Wallet from '../models/mst_wallet.js';
import Category from '../models/mst_category.js';
import Collection from '../models/mst_collection.js';
import Ledger from '../models/mst_ledgers.js';
import TransRecord from '../models/transRecord.js';
import JoinedList from '../models/trans_joined_list.js';
import DebtRecord from '../models/debt_record.js';
import Member from '../models/mst_members.js';
import sequelize from '../utils/database.js';

const getAllWallets = async (req, res, next) => {
  const WalletData = await Wallet.findAll({
    where: {
      user_id: req.params.user_id
    }
  });
  res.json({success: true, wallets: WalletData});
}

const getAllUsers = async (req, res, next) => {
  const UserData = await User.findAll();
  res.json({success: true, users: UserData});
}

const getAllCategories = async (req, res, next) => {

  const CategoryData = await Category.findAll({
    where: {
      user_id: req.params.user_id
    }
  });
  res.json({success: true, categories: CategoryData});
}


const getAllCollections = async (req, res, next) => {
  const CollectionData = await Collection.findAll({
    where: {
      user_id: req.params.user_id
    }
  });
  res.json({success: true, collections: CollectionData});
}

const getAllLedgers = async (req, res, next) => {
  const LedgerData = await Ledger.findAll({
    where: {
      user_id: req.params.user_id
    }
  });
  res.json({success: true, ledgers: LedgerData});
}

const getAllTransRecords = async (req, res, next) => {
  const TransRecordData = await TransRecord.findAll({
    where: {
      user_id: req.params.user_id
    }
  });
  res.json({success: true, transrecords: TransRecordData});
}

const getAllMembers = async (req, res, next) => {
  const TransRecordData = await Member.findAll({
    where: {
      user_id: req.params.user_id
    }
  });
  res.json({success: true, members: TransRecordData});
}

const getAllTransJoinedLists = async (req, res, next) => {
  const JoinedListData = await JoinedList.findAll({
    where: {
      user_id: req.params.user_id
    }
  });
  res.json({success: true, joinedlists: JoinedListData});
}

const getAllDebtRecords = async (req, res, next) => {
  const DebtRecordData = await DebtRecord.findAll({
    where: {
      user_id: req.params.user_id
    }
  });
  res.json({success: true, debtrecords: DebtRecordData});
}

export {
    getAllWallets,
    getAllUsers,
    getAllCategories,
    getAllCollections,
    getAllLedgers,
    getAllTransRecords,
    getAllTransJoinedLists,
    getAllDebtRecords,
    getAllMembers,
};