import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'sales'

  public async up () {

    this.schema.alterTable(this.tableName, (table)=>{

      table.integer("bank_id").unsigned().references("id").inTable("banks")
      .onDelete("CASCADE").notNullable()

    })
    
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table)=>{
      table.dropColumn("bank_id")
    })
  }
}
