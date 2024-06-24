'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('books', {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
        unique: true,
        validate: {
          notNull: {
            msg: 'ID is required'
          }
        }
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: {
            msg: 'Name is required'
          }
        }
      },
      year: {
        type: Sequelize.INTEGER,
        allowNull: true,
        validate: {
          isInt: {
            msg: 'Year must be an integer'
          }
        }
      },
      author: {
        type: Sequelize.STRING,
        allowNull: true
      },
      summary: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Summary is required'
          }
        }
      },
      publisher: {
        type: Sequelize.STRING,
        allowNull: true
      },
      pageCount: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Page count is required'
          },
          isInt: {
            msg: 'Page count must be an integer'
          }
        }
      },
      readPage: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Read page is required'
          },
          isInt: {
            msg: 'Read page must be an integer'
          }
        }
      },
      finished: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      reading: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      insertedAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    }, {
      timestamps: false
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('books')
  }
}
