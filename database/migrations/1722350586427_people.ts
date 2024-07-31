import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'people'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id").primary()
      table.string("identity_document", 8).notNullable().unique()
      table.string("name", 50).notNullable()
      table.string("email",255).notNullable().unique()
      table.date("birthday").notNullable()

    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
