'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ClientUsers extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    ;
    ClientUsers.init({
        client_id: DataTypes.STRING,
        user_id: DataTypes.STRING,
        identity_service: DataTypes.STRING,
        enabled: DataTypes.BOOLEAN
    }, {
        sequelize,
        modelName: 'ClientUsers',
        tableName: "client_users"
    });
    return ClientUsers;
};
