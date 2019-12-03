'use strict'
const bcrypt = require('bcrypt-nodejs')
const faker = require('faker')
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Users',
      [
        {
          email: 'root@example.com',
          password: bcrypt.hashSync('12345678', bcrypt.genSaltSync(10), null),
          role: 'admin',
          name: 'root',
          avatar: 'https://fakeimg.pl/300x300/',
          introduction: faker.lorem.sentences(),
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          email: 'user1@example.com',
          password: bcrypt.hashSync('12345678', bcrypt.genSaltSync(10), null),
          role: null,
          name: 'user1',
          avatar: 'https://fakeimg.pl/300x300/',
          introduction: faker.lorem.sentences(),
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          email: 'user2@example.com',
          password: bcrypt.hashSync('12345678', bcrypt.genSaltSync(10), null),
          role: null,
          name: 'user2',
          avatar: 'https://fakeimg.pl/300x300/',
          introduction: faker.lorem.sentences(),
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {})
  }
}
