import { BaseModel, column, HasMany, hasMany, beforeSave } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'
import Sale from './Sale'
import Hash from '@ioc:Adonis/Core/Hash'

export default class Person extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public identity_document: string

  @column()
  public email:string

  @column({serializeAs:null})
  public password:string

  @column.date()
  public birthday: DateTime

  @column()
  public role:string

  @hasMany(()=>Sale)
  public sales:HasMany<typeof Sale>

  @beforeSave()
  public static async hasPassword(person: Person){
    if (person.$dirty.password){

      person.password = await Hash.make(person.password)
      
    }
  }

}
