import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/database";
import { ulid } from "ulid";

class Product extends Model { }

Product.init({
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    defaultValue: () => ulid(),
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  image_url: {
    type: DataTypes.STRING,
    allowNull: false
  },
  about: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  brand: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  issue: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false
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
  modelName: "product",
  timestamps: true,
});

await Product.sync({});
export default Product;