import { Sequelize } from 'sequelize';
import sequelize from '../utils/database.js';

const Category = sequelize.define('mst_categories', {
    category_id: {
        type: Sequelize.STRING(36),
        allowNull: false,
        primaryKey: true,
    },
    category_name: {
        type: Sequelize.STRING(50),
        allowNull: false,
    },
    icon_name: {
        type: Sequelize.STRING(45),
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

export default Category;