import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'sale_details'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer("sale_id").unsigned().references("id").inTable("sales").onDelete("CASCADE").notNullable()
      table.integer("product_id").unsigned().references("id").inTable("products").onDelete("CASCADE").notNullable()
      table.float("product_quantity", 9, 2).notNullable()
      table.float("subtotal", 9, 2)
      table.string("currency_symbol", 5)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
