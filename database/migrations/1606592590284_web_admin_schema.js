'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class WebAdminSchema extends Schema {
  up () {
    this.create('web_admins', (table) => {
      table.increments()
      table.string('name', 80).notNullable().unique()
      table.string('email', 254).notNullable().unique()
      table.string('password', 60).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('web_admins')
  }
}

module.exports = WebAdminSchema
