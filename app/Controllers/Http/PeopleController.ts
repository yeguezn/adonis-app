// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Person from "App/Models/Person"

export default class PeopleController {
    public async index({response}){
        const people = await Person.all()
        response.send(people)
    }

    public async show({request, response}){
        const person = await Person.find(request.param("id"))

        response.send(person)
    }

    public async store({request, response}){
      const newPerson = await Person.create({
        name:request.body().name,
        identity_document:request.body().identity_document,
        email:request.body().email,
        birthday:request.body().birthday

      })

      response.send(newPerson)
    }

    public async update({request, response}){
        const person = await Person.findOrFail(request.param("id"))

        if (person) {
            person.name = request.body().name,
            person.identity_document=request.body().identity_document,
            person.email=request.body().email,
            person.birthday=request.body().birthday

            await person.save()
        }

        response.send(person)

    }

    public async destroy({request, response}){
        const person = await Person.findOrFail(request.param("id"))
        await person.delete()
        response.send(person)
    }
}