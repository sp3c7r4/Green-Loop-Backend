import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/database";
import { ulid } from "ulid";

class Address extends Model { }

Address.init({
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    defaultValue: () => ulid(),
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
    set(value: string) {
      this.setDataValue("address", value.toLowerCase());
    },
  },
  state: {
    type: DataTypes.STRING,
    allowNull: false,
    set(value: string) {
      this.setDataValue("state", value.toLowerCase());
    },
  },
  lga: {
    type: DataTypes.STRING,
    allowNull: false,
    set(value: string) {
      this.setDataValue("lga", value.toLowerCase());
    },
  },
  country: {
    type: DataTypes.STRING,
    allowNull: false,
    set(value: string) {
      this.setDataValue("country", value.toLowerCase());
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
  modelName: "address",
  timestamps: true,
});

await Address.sync({});
export default Address;