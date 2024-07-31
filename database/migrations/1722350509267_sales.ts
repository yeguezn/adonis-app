import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'sales'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id").primary()
      table.date("date").notNullable()
      table.string("operation_number", 10).notNullable()
      table.string("person_bank").notNullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
