import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Sale from './Sale'
import Product from './Product'

export default class SaleDetail extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public sale_id: number

  @column()
  public product_id:number

  @belongsTo(()=> Sale, {
    foreignKey:"sale_id"
  })
  public sales: BelongsTo<typeof Sale>

  @belongsTo(()=> Product, {
    foreignKey:"product_id"
  })
  public products: BelongsTo<typeof Product>

  @column()
  public product_quantity: number

  @column()
  public subtotal: number

  @column()
  public currency_symbol: string
}
