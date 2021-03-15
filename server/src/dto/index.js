import Sequelize from 'sequelize';
import { db as config } from '../../config';

import UserInitializer from './models/user.js';

const configByEnv = config[process.env.NODE_ENV || 'development'];

let params = {};
if (process.env.NODE_ENV === 'test') params.logging = false;

export let sequelize = new Sequelize({ ...configByEnv, ...params });

export const User = UserInitializer(sequelize);


// Relations could be defined here.
// For example, if there was a table with post, the relation might look like this
// Users.hasMany(Post, { foreignKey: 'userId' });
