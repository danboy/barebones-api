'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Client extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Client.belongsToMany(models.User, {
        as: "users",
        through: "client_users",
        foreignKey: "client_id",
        otherKey: "user_id"
      });
    }
  };
  Client.init({
    id: {
      primaryKey: true,
      allowNull: false,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4()
    },
    name: DataTypes.STRING,
    deleted: DataTypes.BOOLEAN,
    handle: DataTypes.STRING,
    parent_handle: DataTypes.STRING,
    client_details: DataTypes.JSONB,
    config: DataTypes.JSONB,
    website: DataTypes.STRING,
    contact_email: DataTypes.STRING,
    contact_name: DataTypes.STRING,
    contact_phone: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Client',
    tableName: "clients"
  });
  return Client;
};
