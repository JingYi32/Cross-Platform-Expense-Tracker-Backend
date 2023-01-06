import { Sequelize } from 'sequelize';

import sequelize from '../utils/database.js';

const Wallet = sequelize.define('mst_wallets', {
    wallet_id: {
        type: Sequelize.STRING(36),
        allowNull: false,
        primaryKey: true,
    },
    wallet_name: {
        type: Sequelize.STRING(50),
        allowNull: false,
    },
    user_id: {
        type: Sequelize.STRING(36),
        allowNull: false,
        references: {
            model: 'mst_users',
            key: 'id',
        }
    },
    icon_url: {
        type: Sequelize.STRING(100),
        allowNull: false,
    }
});

export default Wallet;