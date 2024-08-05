import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Person from "App/Models/Person"
import CreatePersonValidator from 'App/Validators/CreatePersonValidator'
import UpdatePersonValidator from 'App/Validators/UpdatePersonValidator'

export default class PeopleController {
    public async index({response}:HttpContextContract){
        const people = await Person.all()
        response.ok(people)
    }

    public async show({request, response}:HttpContextContract){
        const person = await Person.find(request.param("id"))

        response.ok(person)
    }

    public async store({request, response}:HttpContextContract){
      const payload = await request.validate(CreatePersonValidator)

      const newPerson = await Person.create({
        name:payload.name,
        identity_document:payload.identity_document,
        email:payload.email,
        birthday:payload.birthday

      })

      response.ok(newPerson)
    }

    public async update({request, response}:HttpContextContract){

        const payload = await request.validate(UpdatePersonValidator)
        const person = await Person.findOrFail(payload.params.id)

        person.name = payload.name,
        person.identity_document=payload.identity_document,
        person.email=payload.email,
        person.birthday=payload.birthday

        await person.save()
        response.ok(person)

    }

    public async destroy({request, response}:HttpContextContract){
        const person = await Person.findOrFail(request.param("id"))
        await person.delete()
        response.ok(person)
    }
}