import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Person from './Person'
import Bank from './Bank'

export default class Sale extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.date()
  public date: DateTime

  @belongsTo(()=>Person)
  public person: BelongsTo<typeof Person>

  @column()
  public operation_number:string

  @column()
  public person_bank:string

  @belongsTo(()=>Bank)
  public bank_id: BelongsTo<typeof Bank>
}
