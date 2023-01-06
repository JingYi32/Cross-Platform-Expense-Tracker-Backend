import { Sequelize } from 'sequelize';

import sequelize from '../utils/database.js';

const User = sequelize.define('mst_users', {
   user_id: {
      type: Sequelize.STRING(36),
      allowNull: false,
      primaryKey: true,
   },
   email: {
      type: Sequelize.STRING(100),
      allowNull: false,
   },
   name: {
      type: Sequelize.STRING(50),
   },
   password: {
      type: Sequelize.STRING,
      allowNull: false,
   },
});

export default User;