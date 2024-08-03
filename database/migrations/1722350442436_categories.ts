import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'categories'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id").primary()
      table.string("name", 30).notNullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
