import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'sale_details'

  public async up () {
    this.schema.alterTable(this.tableName, (table)=>{

      table.integer("currency_id").unsigned().references("currencies.id")
      

    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table)=>{
      table.dropColumn("currency_id")
    })
  }
}
