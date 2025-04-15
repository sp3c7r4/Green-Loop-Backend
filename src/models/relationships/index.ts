import User from "../user.model";
import Address from "../address.model";
import Product from "../product.model";
import Auction from "../auction.model";

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

User.hasMany(Auction, {
  foreignKey: { name: 'userId' },
  onDelete: 'CASCADE',
});
Auction.belongsTo(User, { foreignKey: 'userId' });

Product.hasMany(Auction, {
  foreignKey: { name: 'productId' },
  onDelete: 'CASCADE',
});
Auction.belongsTo(Product, { foreignKey: 'productId' });

export { User, Address , Product}