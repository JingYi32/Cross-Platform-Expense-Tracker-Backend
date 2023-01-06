import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('budgetapp', 'root', 'Venus-08042', {
    dialect: 'mysql',
    host: 'localhost', 
});

export default sequelize;