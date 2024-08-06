import { BaseModel, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Sale from './Sale'

export default class Currency extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name:string

  @column()
  public currentValue: number

  @column()
  public symbol: string

  @manyToMany(()=>Sale, {
    localKey:"id",
    relatedKey:"id",
    pivotForeignKey:"currency_id",
    pivotTable:"sale_details"
  })
  public sales: ManyToMany<typeof Sale>

  
}
