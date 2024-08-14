import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Category from "App/Models/Category"
import CategoryValidator from "App/Validators/CategoryValidator"
import CreateCategoryValidator from 'App/Validators/CreateBankValidator'
import UpdateCategoryValidator from 'App/Validators/UpdateCategoryValidator'

export default class CategoriesController {
  public async index({response}:HttpContextContract){
    let categories = await Category.all()
    response.ok(categories)
  }

  public async show({request, response}:HttpContextContract){
    let payload = await request.validate(CategoryValidator)
    let category = await Category.find(payload.params.id)
    response.ok(category)
  }

  public async store({request, response}:HttpContextContract){
    let payload = await request.validate(CreateCategoryValidator)
    let newCategory = await Category.create({
      name:payload.name
    })

    response.ok(newCategory)
  }

  public async update({request, response}:HttpContextContract){
    let payload = await request.validate(UpdateCategoryValidator)
    let category = await Category.findOrFail(payload.params.id)
    category.name = request.body().name
    await category.save()

    response.ok(category)

  }

  public async destroy({request, response}:HttpContextContract){
    let payload = await request.validate(CategoryValidator)
    let category = await Category.findOrFail(payload.params.id)
    await category.delete()
    response.ok(category)
  }
}
