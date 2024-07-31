import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'
import Sale from './Sale'

export default class Person extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public identity_document: string

  @column()
  public email:string

  @column.date()
  public birthday: DateTime

  @hasMany(()=>Sale)
  public sales:HasMany<typeof Sale>

}
