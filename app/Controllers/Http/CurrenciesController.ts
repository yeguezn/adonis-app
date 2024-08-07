// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Currency from "App/Models/Currency"
import CreateCurrencyValidator from "App/Validators/CreateCurrencyValidator"
import CurrencyValidator from "App/Validators/CurrencyValidator"
import UpdateCurrencyValidator from "App/Validators/UpdateCurrencyValidator"

export default class CurrenciesController {
    public async index({response}){
      const currencies = await Currency.all()
      response.ok(currencies)
    }

    public async show({request, response}){
      const payload = await request.validate(CurrencyValidator)
      const currency = await Currency.find(payload.params.id)
      response.ok(currency)
    }

    public async store({request, response}){
      const payload = await request.validate(CreateCurrencyValidator)
      const newCurrency = await Currency.create({
        name:payload.name,
        currentValue:payload.currentValue,
        symbol:payload.symbol
      })

      response.ok(newCurrency)
    }

    public async update({request, response}){
      const payload = await request.validate(UpdateCurrencyValidator)
      const currency = await Currency.findOrFail(request.param("id"))

      currency.name = payload.name
      currency.currentValue=payload.currentValue,
      currency.symbol=payload.symbol
      await currency.save()

      response.ok(currency)

    }

    public async destroy({request, response}){
      const payload = await request.validate(CurrencyValidator)
      const currency = await Currency.findOrFail(payload.params.id)
      await currency.delete()
      response.ok(currency)
    }
}
