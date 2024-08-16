import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Sale from './Sale'

export default class Bank extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public accountNumber: string

  @hasMany(()=> Sale)
  public sales: HasMany<typeof Sale>
}
