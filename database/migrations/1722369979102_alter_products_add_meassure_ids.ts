import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'products'

  public async up () {

    this.schema.alterTable(this.tableName, (table)=>{
      table.integer("meassure_id").unsigned().references("id").inTable("meassures")
      .onDelete("CASCADE").notNullable()
    })
   
  }

  public async down () {

    this.schema.alterTable(this.tableName, (table)=>{

      table.dropColumns("meassure_id")

    })
   
  }
}
