import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'products'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id").primary()
      table.string("code", 5)
      table.string("name", 20)
      table.float("price", 9, 2)
      table.float("stock", 9, 2)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
