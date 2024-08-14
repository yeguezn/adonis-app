// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Bank from "App/Models/Bank"
import BankValidator from "App/Validators/BankValidator"
import CreateBankValidator from "App/Validators/CreateBankValidator"
import UpdatePersonValidator from "App/Validators/UpdatePersonValidator"

export default class BanksController {
  public async index({response}){
    let banks = await Bank.all()
    response.ok(banks)
  }

  public async show({request, response}){
    let payload = await request.validate(BankValidator)
    let bank = await Bank.find(payload.params.id)
    response.ok(bank)
  }

  public async store({request, response}){
    let payload = request.validate(CreateBankValidator)
    let newCurrency = await Bank.create({
      name:payload.name,
      account_number:payload.account_number
    })

    response.ok(newCurrency)
	}

  public async update({request, response}){
		let payload = await request.validate(UpdatePersonValidator)
    let bank = await Bank.findOrFail(payload.params.id)

		bank.name = request.body().name
    bank.account_number = request.body().account_number
    await bank.save()
			
    response.ok(bank)

  }

  public async destroy({request, response}){
		let payload = await request.validate(BankValidator)
    let bank = await Bank.findOrFail(payload.params.id)
    await bank.delete()
    response.ok(bank)
  }
}
