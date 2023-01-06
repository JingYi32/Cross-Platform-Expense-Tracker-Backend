import { Sequelize } from 'sequelize';

import sequelize from '../utils/database.js';

const TransRecord = sequelize.define('trans_Records', {
   trans_id: {
      type: Sequelize.STRING(36),
      allowNull: false,
      primaryKey: true,
   },
   transname: {
      type: Sequelize.STRING(100),
      allowNull: false,
   },
   date: {
      type: Sequelize.DATE,
      allowNull: false,
   },
   cashflow: {
      type: Sequelize.STRING(3),
   },
   ledger_id: {
      type: Sequelize.STRING(36),
      allowNull: false,
      references: {
         model: 'mst_ledgers',
         key: 'id',
      },
   },
   wallet_id: {
      type: Sequelize.STRING(36),
      allowNull: false,
      references: {
         model: 'mst_wallets',
         key: 'id',
      },
   },
   price: {
      type: Sequelize.DECIMAL(10,2),
      allowNull: false,
   },
   category_id: {
      type: Sequelize.STRING(36),
      references: {
         model: 'mst_categories',
         key: 'id',
      },
   },
   collection_id: {
      type: Sequelize.STRING(36),
      references: {
         model: 'mst_collections',
         key: 'id',
      },
   },
   remark: {
      type: Sequelize.TEXT,
   },
   platform: {
      type: Sequelize.STRING(20),
   },
   venue: {
      type: Sequelize.STRING(50),
   },
   orderid: {
      type: Sequelize.STRING(30),
   },
   method: {
      type: Sequelize.STRING(10),
      allowNull: false,
   },
   personPaid_id: {
      type: Sequelize.STRING(36),
      references: {
         model: 'mst_members',
         key: 'id',
      },
   },
   amountPaid: {
      type: Sequelize.DECIMAL(10,2),
   },
   user_id: {
      type: Sequelize.STRING(36),
      references: {
         model: 'mst_users',
         key: 'id',
      },
   }
});

export default TransRecord;