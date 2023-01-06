import { Sequelize } from 'sequelize';
import sequelize from '../utils/database.js';

const Collection = sequelize.define('mst_collections', {
    collection_id: {
        type: Sequelize.STRING(36),
        allowNull: false,
        primaryKey: true,
    },
    collection_name: {
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
    }
});

export default Collection;