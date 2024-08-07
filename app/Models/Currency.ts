import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Currency extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name:string

  @column()
  public currentValue: number

  @column()
  public symbol: string 
}
