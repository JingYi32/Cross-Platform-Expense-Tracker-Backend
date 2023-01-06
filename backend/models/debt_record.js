import { Sequelize } from 'sequelize';
import sequelize from '../utils/database.js';

const DebtRecord = sequelize.define('debt_records', {
    debt_id: {
        type: Sequelize.STRING(36),
        allowNull: false,
        primaryKey: true,
    },
    trans_id: {
        type: Sequelize.STRING(36),
        allowNull: false,
        references: {
            model: 'trans_Records',
            key: 'id',
        }
    },
    member_id: {
        type: Sequelize.STRING(36),
        allowNull: false,
        references: {
            model: 'mst_members',
            key: 'id',
        }
    },
    price: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: false,
    },
    paid_status: {
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

export default DebtRecord;