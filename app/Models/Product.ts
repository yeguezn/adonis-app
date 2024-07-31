import { BaseModel, BelongsTo, belongsTo, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
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

  @column()
  public category_id:number

  @column()
  public meassure_id:number

  @belongsTo(()=> Category)
  public category: BelongsTo<typeof Category>

  @belongsTo(()=> Meassure)
  public meassure: BelongsTo<typeof Meassure>

  @hasMany(()=> Sale)
  public sales:HasMany<typeof Sale>

}
