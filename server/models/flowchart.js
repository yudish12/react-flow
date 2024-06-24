import { DataTypes } from "sequelize";
import { sequelize } from "../utils/index.js";
import { User } from "./User.js";

export const FlowChart = sequelize.define("flowchart", {
  nodes: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  edges: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

User.hasOne(FlowChart, {
  foreignKey: "userid",
  onDelete: "CASCADE",
});
