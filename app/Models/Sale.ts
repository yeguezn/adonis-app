import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import Person from './Person'
import Bank from './Bank'

export default class Sale extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.date({autoCreate:true})
  public date: DateTime

  @column()
  public person_id: number

  @column()
  public bank_id: number

  @column()
  public operation_number:string

  @belongsTo(()=>Person)
  public person: BelongsTo<typeof Person>

  @belongsTo(()=>Bank)
  public bank: BelongsTo<typeof Bank>

  @manyToMany(()=> Sale, {
    localKey:"id",
    relatedKey:"id",
    pivotForeignKey:"sale_id",
    pivotTable:"sale_details"
  })
  public sales: ManyToMany<typeof Sale>

}

