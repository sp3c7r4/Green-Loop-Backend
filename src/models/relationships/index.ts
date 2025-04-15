import User from "../user.model";
import Address from "../address.model";
import Product from "../product.model";

User.hasOne(Address, {
  foreignKey: { name: 'userId' },
  onDelete: 'CASCADE',
});
Address.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Product, {
  foreignKey: { name: 'userId' },
  onDelete: 'CASCADE',
});
Product.belongsTo(User, { foreignKey: 'userId' });

export { User, Address , Product}