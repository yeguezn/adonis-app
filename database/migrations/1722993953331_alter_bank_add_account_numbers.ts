import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'banks'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.string("account_number", 20)
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn("account_number")
    })
  }
}
