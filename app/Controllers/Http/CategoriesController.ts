//import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Category from "App/Models/Category"

export default class CategoriesController {
    public async index({response}){
        const categories = await Category.all()

        response.send(categories)
    }

    public async show({request, response}){
        const category = await Category.find(request.param("id"))

        response.send(category)
    }

    public async store({request, response}){
      const newCategory = await Category.create({
        name:request.body().name
      })

      response.send(newCategory)
    }

    public async update({request, response}){
        const category = await Category.findOrFail(request.param("id"))

        if (category) {
            category.name = request.body().name
            await category.save()
        }

        response.send(category)

    }

    public async destroy({request, response}){
        const category = await Category.findOrFail(request.param("id"))
        await category.delete()
        response.send(category)
    }
}
