import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Bank from "App/Models/Bank"
import BankValidator from "App/Validators/BankValidator"
import CreateBankValidator from "App/Validators/CreateBankValidator"
import UpdateBankValidator from "App/Validators/UpdateBankValidator"

export default class BanksController {
  public async index({response}:HttpContextContract){
    let banks = await Bank.all()
    response.ok(banks)
  }

  public async show({request, response}:HttpContextContract){
    let payload = await request.validate(BankValidator)
    let bank = await Bank.find(payload.params.id)
    response.ok(bank)
  }

  public async store({request, response, bouncer}:HttpContextContract){
    let payload = await request.validate(CreateBankValidator)
    await bouncer.authorize("manageResourceAsAdmin")
    let newCurrency = await Bank.create({
      name:payload.name,
      accountNumber:payload.accountNumber
    })

    response.ok(newCurrency)
	}

  public async update({request, response, bouncer}:HttpContextContract){
		let payload = await request.validate(UpdateBankValidator)
    let bank = await Bank.findOrFail(payload.params.id)
    await bouncer.authorize("manageResourceAsAdmin")
		bank.name = payload.name
    bank.accountNumber = payload.accountNumber
    await bank.save()
			
    response.ok(bank)

  }

  public async destroy({request, response, bouncer}:HttpContextContract){
		let payload = await request.validate(BankValidator)
    let bank = await Bank.findOrFail(payload.params.id)
    await bouncer.authorize("manageResourceAsAdmin")

    await bank.delete()
    response.ok(bank)
  }
}
