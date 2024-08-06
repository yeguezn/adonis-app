import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'currencies'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string("name", 20)
      table.float("current_value", 9, 2)
      table.string("symbol", 2)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
