import { Sequelize } from 'sequelize';
import sequelize from '../utils/database.js';

const Ledger = sequelize.define('mst_ledgers', {
    ledger_id: {
        type: Sequelize.STRING(36),
        allowNull: false,
        primaryKey: true,
    },
    ledger_name: {
        type: Sequelize.STRING(50),
        allowNull: false,
    },
    count: {
        type: Sequelize.STRING(1),
        allowNull: false,
    },
    user_id: {
        type: Sequelize.STRING(36),
        allowNull: false,
        references: {
            model: 'mst_users',
            key: 'id',
        }
    }
});

export default Ledger;