import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Person from './Person'
import Bank from './Bank'
import SaleDetail from './SaleDetail'

export default class Sale extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.date({autoCreate:true})
  public date: DateTime

  @column()
  public person_id: number

  @column()
  public person_bank:string

  @column()
  public bank_id: number

  @column()
  public operation_number:string

  @belongsTo(()=>Person, {
    foreignKey:"person_id"
  })
  public person: BelongsTo<typeof Person>

  @belongsTo(()=>Bank, {
    foreignKey:"bank_id"
  })
  public bank: BelongsTo<typeof Bank>

  @hasMany(()=> SaleDetail)
  public saleDetails: HasMany<typeof SaleDetail>
}

