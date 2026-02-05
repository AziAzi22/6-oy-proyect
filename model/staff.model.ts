import { DataTypes, Model } from "sequelize";
import sequelize from "../config/config.js";

export class Staff extends Model {
  full_name!: string;
  phone_number!: string;
  profession!: string;
  image_url!: string;
}

Staff.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    full_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    profession: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "staff",
    timestamps: true,
    sequelize,
  },
);
