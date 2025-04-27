import User from "../user.model";
import Address from "../address.model";
import Product from "../product.model";
import Auction from "../auction.model";

User.hasOne(Address, {
  foreignKey: { name: 'userId' },
  onDelete: 'CASCADE', // Deletes the address if the user is deleted
});

User.hasMany(Product, {
  foreignKey: { name: 'userId' },
  onDelete: 'CASCADE',
});

User.hasMany(Auction, {
  foreignKey: { name: 'userId' },
  onDelete: 'CASCADE',
});
Auction.belongsTo(User, { foreignKey: 'userId' });

Product.hasMany(Auction, {
  foreignKey: { name: 'productId' },
  onDelete: 'CASCADE',
});

export { User, Address , Product, Auction}