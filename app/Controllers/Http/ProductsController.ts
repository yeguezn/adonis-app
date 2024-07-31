// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Product from "App/Models/Product";

export default class ProductsController {
    public async index({response}){
        const products = await Product.all()

        response.send(products)
    }

    public async show({request, response}){
        const product = await Product.find(request.param("id"))

        response.send(product)
    }

    public async store({request, response}){
      const newProduct = await Product.create({
        code:request.body().code,
        name:request.body().name,
        price:request.body().price,
        stock:request.body().stock,
        category_id:request.body().category,
        meassure_id:request.body().meassure
      })

      response.send(newProduct)
    }

    public async update({request, response}){
        const product = await Product.findOrFail(request.param("id"))

        if (product) {
            product.name = request.body().name
            await product.save()
        }

        response.send(product)

    }

    public async destroy({request, response}){
        const product = await Product.findOrFail(request.param("id"))
        await product.delete()
        response.send(product)
    }
}
