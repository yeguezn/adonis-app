import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Product from './Product'

export default class Meassure extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public symbol: string

  @hasMany(()=> Product, {
    foreignKey:"meassure_id"
  })
  public products: HasMany<typeof Product>
}
