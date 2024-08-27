// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Currency from "App/Models/Currency"
import CreateCurrencyValidator from "App/Validators/CreateCurrencyValidator"
import CurrencyValidator from "App/Validators/CurrencyValidator"
import UpdateCurrencyValidator from "App/Validators/UpdateCurrencyValidator"

export default class CurrenciesController {
  public async index({response, bouncer}){
    let currencies = await Currency.all()
    await bouncer.authorize("manageResourceAsAdmin")
    response.ok(currencies)
  }

  public async show({request, response, bouncer}){
    let payload = await request.validate(CurrencyValidator)
    let currency = await Currency.find(payload.params.id)
    await bouncer.authorize("manageResourceAsAdmin")
    response.ok(currency)
  }

  public async store({request, response, bouncer}){
    let payload = await request.validate(CreateCurrencyValidator)
    await bouncer.authorize("manageResourceAsAdmin")
    let newCurrency = await Currency.create({
      name:payload.name,
      currentValue:payload.currentValue,
      symbol:payload.symbol
    })

    response.ok(newCurrency)
  }

  public async update({request, response, bouncer}){
    let payload = await request.validate(UpdateCurrencyValidator)
    let currency = await Currency.findOrFail(payload.params.id)
    await bouncer.authorize("manageResourceAsAdmin")

    currency.name = payload.name
    currency.currentValue=payload.currentValue,
    currency.symbol=payload.symbol
    await currency.save()

    response.ok(currency)

  }

  public async destroy({request, response, bouncer}){
    let payload = await request.validate(CurrencyValidator)
    let currency = await Currency.findOrFail(payload.params.id)
    await bouncer.authorize("manageResourceAsAdmin")
    await currency.delete()
    response.ok(currency)
  }
}
