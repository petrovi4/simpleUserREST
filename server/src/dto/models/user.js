import { Model, DataTypes } from 'sequelize';


export default sequelize => {
	class User extends Model { }

	User.init({
		email: { type: DataTypes.STRING, allowNull: false, comment: 'User\'s email' },
		name: { type: DataTypes.STRING, allowNull: false, comment: 'User\'s name' },
		hpassword: { type: DataTypes.STRING, allowNull: false, comment: 'Hashed password' },
	}, {
		sequelize,
		modelName: 'User',
		tableName: 'user',
		comment: 'Registered User',
		timestamps: true,
		createdAt: 'created',
		updatedAt: false,
	});

	return User;
};
