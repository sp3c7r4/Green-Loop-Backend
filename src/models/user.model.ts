import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/database";
import { ulid } from "ulid";

class User extends Model { }

User.init({
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    defaultValue: () => ulid(),
    allowNull: false,
  },
  firstname: {
    type: DataTypes.STRING,
    allowNull: false,
    set(value: string) {
      this.setDataValue("firstname", value.toLowerCase());
    },
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false,
    set(value: string) {
      this.setDataValue("lastname", value.toLowerCase());
    },
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true,
    },
    set(value: string) {
      this.setDataValue("email", value.toLowerCase());
    },
  },
  mobile: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
    set(value: string) {
      this.setDataValue("type", value.toLowerCase());
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: true,
  }
}, {
  sequelize,
  modelName: "user",
  timestamps: true,
})

export default User;