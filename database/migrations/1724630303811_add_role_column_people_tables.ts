import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'people'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.string("role", 20).defaultTo("client")
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn("role")
    })
  }
}
