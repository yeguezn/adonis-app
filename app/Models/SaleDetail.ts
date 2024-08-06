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

  @belongsTo(()=> Sale)
  public sales: BelongsTo<typeof Sale>

  @belongsTo(()=> Product)
  public products: BelongsTo<typeof Product>

  @column()
  public product_quantity: number
}
