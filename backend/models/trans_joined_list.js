import { Sequelize } from 'sequelize';
import sequelize from '../utils/database.js';

const JoinedList = sequelize.define('trans_joined_list', {
    joined_id: {
        type: Sequelize.STRING(36),
        allowNull: false,
        primaryKey: true,
    },
    price: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: false,
    },
    member_id:{
        type: Sequelize.STRING(36),
        references: {
            model: 'mst_members',
            key: 'id',
        },
    },
    record_id:{
        type: Sequelize.STRING(36),
        allowNull: false,
        references: {
            model: 'trans_Records',
            key: 'id',
        },
    }
});

export default JoinedList;