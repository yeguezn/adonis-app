import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Person from "App/Models/Person"
import CreatePersonValidator from 'App/Validators/CreatePersonValidator'
import UpdatePersonValidator from 'App/Validators/UpdatePersonValidator'
import PersonValidator from 'App/Validators/PersonValidator'

export default class PeopleController {
    public async index({response}:HttpContextContract){
        let people = await Person.all()
        response.ok(people)
    }

    public async show({request, response}:HttpContextContract){
        let payload = await request.validate(PersonValidator)
        let person = await Person.find(payload.params.id)

        response.ok(person)
    }

    public async store({request, response}:HttpContextContract){
      let payload = await request.validate(CreatePersonValidator)

      let newPerson = await Person.create({
        name:payload.name,
        identity_document:payload.identityDocument,
        email:payload.email,
        birthday:payload.birthday

      })

      response.ok(newPerson)
    }

    public async update({request, response}:HttpContextContract){

        let payload = await request.validate(UpdatePersonValidator)
        let person = await Person.findOrFail(payload.params.id)

        person.name = payload.name
        person.identity_document=payload.identityDocument
        person.email=payload.email
        person.birthday=payload.birthday

        await person.save()
        response.ok(person)

    }

    public async destroy({request, response}:HttpContextContract){
        let payload = await request.validate(PersonValidator)
        let person = await Person.findOrFail(payload.params.id)
        await person.delete()
        response.ok(person)
    }
}