import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'sales'

  public async up () {
    this.schema.alterTable(this.tableName, (table)=>{
      table.integer("person_id").unsigned().references("id").inTable("people")
      .onDelete("CASCADE").notNullable()
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table)=>{
      table.dropColumn("person_id")
    })
  }
}
