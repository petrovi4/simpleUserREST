import { sequelize } from '../src/dto';

export default async () => {
	await sequelize.close();

	process.exit();
};
