// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Meassure from "App/Models/Meassure"

export default class MeassuresController {
    public async index({response}){
        const meassures = await Meassure.all()

        response.send(meassures)
    }

    public async show({request, response}){
        const meassure = await Meassure.find(request.param("id"))

        response.send(meassure)
    }

    public async store({request, response}){
      const newMeassure = await Meassure.create({
        name:request.body().name,
        symbol:request.body().symbol
      })

      response.send(newMeassure)
    }

    public async update({request, response}){
        const meassure = await Meassure.findOrFail(request.param("id"))

        if (meassure) {
            meassure.name = request.body().name
            meassure.symbol = request.body().symbol
            await meassure.save()
        }

        response.send(meassure)

    }

    public async destroy({request, response}){
        const meassure = await Meassure.findOrFail(request.param("id"))
        await meassure.delete()
        response.send(meassure)
    }
}
