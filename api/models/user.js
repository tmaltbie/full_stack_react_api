'use strict';

const Sequelize = require('sequelize');

module.exports = sequelize => {
    class User extends Sequelize.Model {};
    User.init({
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        firstName: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'First name is required'
                },
                notEmpty: {
                    msg: 'First name is required'
                },
            },
        },
        lastName: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Last name is required'
                },
                notEmpty: {
                    msg: 'Last name is required'
                },
            }
        },
        emailAddress: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: {
                msg: "The email you entered already exists"
            },
            validate: {
                // notEmpty: {
                //     msg: "An email address is required"
                // },
                notNull: {
                    msg: "An email address is required"
                },
                isEmail: {
                    msg: 'Email address is required'
                },
            },
    
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'A password is required'
                },
                notEmpty: {
                    msg: 'Password is required'
                },
                len: {
                    args: [[8, 20]],
                    msg: 'Password must be between 8 and 20 characters'
                },
            },
        },
    }, { sequelize });

    User.associate = (models) => {
        User.hasMany(models.Course, { foreignKey: 'userId' })
    }

    return User;
};
