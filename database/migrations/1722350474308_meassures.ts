import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'meassures'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id").primary()
      table.string("name", 10).notNullable()
      table.string("symbol", 5).nullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
