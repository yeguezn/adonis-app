import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'sale_details'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer("sale_id").unsigned().references("id").inTable("sales").onDelete("CASCADE")
      table.integer("product_id").unsigned().references("id").inTable("products").onDelete("CASCADE")
      table.integer("product_quantity").notNullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
