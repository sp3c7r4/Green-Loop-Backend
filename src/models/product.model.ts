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
    allowNull: false,
    set(value: string) {
      this.setDataValue("name", value.toLowerCase());
    },
  },
  image_url: {
    type: DataTypes.STRING,
    allowNull: false
  },
  about: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  brand: {
    type: DataTypes.TEXT,
    allowNull: true,
    set(value: string) {
      this.setDataValue("brand", value.toLowerCase());
    },
  },
  issue: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  condition: {
    type: DataTypes.STRING,
    allowNull: false,
    set(value: string) {
      this.setDataValue("condition", value.toLowerCase());
    },
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
    set(value: string) {
      this.setDataValue("address", value.toLowerCase());
    },
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