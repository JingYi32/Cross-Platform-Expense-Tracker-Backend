import { Sequelize } from 'sequelize';
import sequelize from '../utils/database.js';

const Member = sequelize.define('mst_members', {
    member_id: {
        type: Sequelize.STRING(36),
        allowNull: false,
        primaryKey: true,
    },
    member_name: {
        type: Sequelize.STRING(50),
        allowNull: false,
    },
    user_id: {
        type: Sequelize.STRING(36),
        references: {
            model: 'mst_users',
            key: 'id',
        }
    },
});

export default Member;