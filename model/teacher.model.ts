import { DataTypes, Model } from "sequelize";
import sequelize from "../config/config.js";

export class Teacher extends Model {
  full_name!: string;
  phone_number!: string;
  profession!: string;
  image_url!: string;
  added_by!: number;
}

Teacher.init(
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
    added_by: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "staff",
        key: "id",
      }
    },
  },
  {
    tableName: "teacher",
    timestamps: true,
    sequelize,
  },
);
