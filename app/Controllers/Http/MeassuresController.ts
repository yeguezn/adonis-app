// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Meassure from "App/Models/Meassure"
import MeassureValidator from "App/Validators/MeassureValidator"

export default class MeassuresController {
    public async index({response}){
        const meassures = await Meassure.all()

        response.ok(meassures)
    }

    public async show({request, response}){
        const payload = await request.validate(MeassureValidator)
        const meassure = await Meassure.find(payload.params.id)

        response.ok(meassure)
    }
}
