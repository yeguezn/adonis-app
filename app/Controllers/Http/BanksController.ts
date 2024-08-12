// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Bank from "App/Models/Bank"
import BankValidator from "App/Validators/BankValidator"
import CreateBankValidator from "App/Validators/CreateBankValidator"
import UpdatePersonValidator from "App/Validators/UpdatePersonValidator"

export default class BanksController {
  public async index({response}){
    const banks = await Bank.all()
    response.ok(banks)
  }

  public async show({request, response}){
    const payload = await request.validate(BankValidator)
    const bank = await Bank.find(payload.params.id)
    response.ok(bank)
  }

  public async store({request, response}){
    const payload = request.validate(CreateBankValidator)
    const newCurrency = await Bank.create({
      name:payload.name,
      account_number:payload.account_number
    })

    response.ok(newCurrency)
	}

  public async update({request, response}){
		const payload = await request.validate(UpdatePersonValidator)
    const bank = await Bank.findOrFail(payload.params.id)

		bank.name = request.body().name
    bank.account_number = request.body().account_number
    await bank.save()
			
    response.ok(bank)

  }

  public async destroy({request, response}){
		const payload = await request.validate(BankValidator)
    const bank = await Bank.findOrFail(payload.params.id)
    await bank.delete()
    response.ok(bank)
  }
}
