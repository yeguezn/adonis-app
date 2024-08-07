// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Bank from "App/Models/Bank"

export default class BanksController {
    public async index({response}){
        const banks = await Bank.all()

        response.ok(banks)
    }

    public async show({request, response}){
        const bank = await Bank.find(request.param("id"))

        response.ok(bank)
    }

    public async store({request, response}){
      const newCurrency = await Bank.create({
        name:request.body().name,
        account_number:request.body().account_number
      })

      response.ok(newCurrency)
    }

    public async update({request, response}){
        const bank = await Bank.findOrFail(request.param("id"))

        if (bank) {
            bank.name = request.body().name
            bank.account_number = request.body().account_number
            await bank.save()
        }

        response.ok(bank)

    }

    public async destroy({request, response}){
        const bank = await Bank.findOrFail(request.param("id"))
        await bank.delete()
        response.ok(bank)
    }
}
