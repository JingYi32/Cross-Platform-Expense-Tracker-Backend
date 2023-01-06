import jwt from 'jsonwebtoken';
import Wallet from '../models/mst_wallet.js';
import Category from '../models/mst_category.js';
import Collection from '../models/mst_collection.js';
import Ledger from '../models/mst_ledgers.js';
import Member from '../models/mst_members.js';
import TransRecord from '../models/transRecord.js';
import JoinedList from '../models/trans_joined_list.js';
import DebtRecord from '../models/debt_record.js';
import {v4 as uuidv4} from 'uuid';
import { createConnection } from 'mysql';

const createTransRecord = async (req, res, next) => {

    const trans_new_id= uuidv4();

    await TransRecord.create(({
        trans_id: trans_new_id,
        transname: req.body.transname,
        date: req.body.transDate,
        cashflow: req.body.cashflow,
        ledger_id: req.body.ledger,
        wallet_id: req.body.wallet,
        price: req.body.price,
        category_id: req.body.category,
        subCategory_id: req.body.subCategory,
        collection_id: req.body.collection,
        remark: req.body.remark,
        platform: req.body.platform,
        venue: req.body.venue,
        orderid: req.body.orderid,
        method: req.body.method,
        personPaid_id: req.body.personPaid,
        amountPaid: req.body.amountPaid,
        user_id: req.body.user_id,
    }))
    .then(() => {
        res.status(200).json({message: "Transaction reacord created"});
        const member = req.body.memberJoin;

        if (member != []){
            for (let i = 0; i < member.length; i++) {
                JoinedList.create(({
                    joined_id: uuidv4(),
                    price: req.body.price / member.length,
                    member_id: member[i],
                    trans_id: trans_new_id,
                }))
                .catch(err => {
                    console.log('error', err);
                });
            }
        }

        if (req.body.personPaid != req.body.user_id && req.body.personPaid != null) {
            DebtRecord.create(({
                debt_id: uuidv4(),
                trans_id: trans_new_id,
                member_id: req.body.personPaid,
                price: req.body.amountPaid,
                paid_status: 'N',
                user_id: req.body.user_id
            }))
        }


    })
    .catch(err => {
        console.log('error', err);
        res.status(502).json({message: "error while creating the transaction reacord"});
    });
}

const createWallet = async (req, res, next) => {
    await Wallet.create(({
        wallet_id: uuidv4(),
        wallet_name: req.body.name,
        user_id: req.body.user_id,
        icon_url: "../assets/icons/TransactionRecords.png",
    }))
    .catch(err => {
        console.log('error', err);
    });
}

const createCategory = async(req, res, next) => {
    await Category.create(({
        category_id: uuidv4(),
        category_name: req.body.name,
        icon_name: req.body.iconName,
        user_id: req.body.user_id,
    }))
    .catch(err => {
        console.log('error', err);
    });
}

const createCollection = async(req, res, next) => {
    await Collection.create(({
        collection_id: uuidv4(),
        collection_name: req.body.name,
        user_id: req.body.user_id,
    }))
    .catch(err => {
        console.log('error', err);
    });
}

const createLedger = async(req, res, next) => {
    await Ledger.create(({
        ledger_id: uuidv4(),
        ledger_name: req.body.name,
        count: 'N',
        user_id: req.body.user_id,
    }))
    .catch(err => {
        console.log('error', err);
    });
}

const createMember = async(req, res, next) => {
    await Member.create(({
        member_id: uuidv4(),
        member_name: req.body.name,
        user_id: req.body.user_id,
    }))
    .catch(err => {
        console.log('error', err);
    });
}

const createJoinedList = async(req, res, next) => {
    await JoinedList.create(({
        joined_id: uuidv4(),
        price: req.body.price,
        member_id: req.body.member,
        record_id: req.body.record,
    }))
    .catch(err => {
        console.log('error', err);
    });
}

const createDebtRecord = async(req, res, next) => {
    await DebtRecord.create(({
        debt_id: uuidv4(),
        price: req.body.price,
        member_id: req.body.member,
        record_id: req.body.record,
        paid_status: req.body.paid_status,
        user_id: req.body.user_id,
    }))
    .catch(err => {
        console.log('error', err);
    });
}

export {
    createTransRecord,
    createWallet,
    createCategory,
    createCollection,
    createLedger,
    createMember,
    createJoinedList,
    createDebtRecord,
}