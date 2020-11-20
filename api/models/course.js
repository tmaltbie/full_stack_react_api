'use strict';

const Sequelize = require('sequelize');

module.exports = sequelize => {
    class Course extends Sequelize.Model {}
    Course.init({
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Please add a course title'
                },
                notEmpty: {
                    msg: 'Please enter a course title'
                }
            },
        },
        description: {
            type: Sequelize.TEXT,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Please add a course description'
                },
                notEmpty: {
                    msg: 'Please enter a course description'
                }
            },
        },
        estimatedTime: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        materialsNeeded: {
            type: Sequelize.STRING,
            allowNull: true,
        },
    }, { sequelize,
         validate: {
            titleAndDesc() {
                if ((this.title === null) || (this.description === null)) {
                    throw new Error('Title and description are required')
                }
            }
         }
     });
  
    Course.associate = (models) => {
        Course.belongsTo(models.User, { foreignKey: 'userId'});
    };

    return Course;
};