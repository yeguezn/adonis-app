import { BaseModel, BelongsTo, belongsTo, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Category from './Category'
import Meassure from './Meassure'
import Sale from './Sale'

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public code: string

  @column()
  public name: string

  @column()
  public price:number

  @column()
  public stock: number

  @column({serializeAs:null})
  public category_id: number

  @column({serializeAs:null})
  public meassure_id: number

  @belongsTo(()=> Category, {
    foreignKey:"category_id"
  })
  public category: BelongsTo<typeof Category>

  @belongsTo(()=> Meassure, {
    foreignKey:"meassure_id"
  })
  public meassure: BelongsTo<typeof Meassure>

  @manyToMany(()=> Sale,{
    localKey:"id",
    relatedKey:"id",
    pivotForeignKey:"product_id",
    pivotTable:"sale_details",
    pivotColumns:["quantity"]
  })
  public products: ManyToMany<typeof Sale>

}
