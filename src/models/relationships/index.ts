import User from "../user.model";
import Address from "../address.model";

User.hasMany(Address, {
  foreignKey: { name: 'userId' },
  onDelete: 'CASCADE',
});
Address.belongsTo(User, { foreignKey: 'userId' });

export { User, Address }