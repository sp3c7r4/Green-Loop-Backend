import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/database";
import { ulid } from "ulid";

class Auction extends Model { }

Auction.init({
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    defaultValue: () => ulid(),
    allowNull: false,
  },
  price: {
    type: DataTypes.STRING,
    allowNull: false
  },
  productId: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: "products",
      key: "id",
    },
    onDelete: "CASCADE",
  },
  userId: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: "users",
      key: "id",
    },
    onDelete: "CASCADE",
  }
}, {
  sequelize,
  modelName: "auction",
  timestamps: true,
});

export default Auction;