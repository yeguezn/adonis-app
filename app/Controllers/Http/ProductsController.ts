import  { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Product from "App/Models/Product";

export default class ProductsController {
    public async index({response}: HttpContextContract){
       const products = await Product.query().preload("category").preload("meassure")

        response.ok(products)
    }

    public async show({request, response}){

        const product = await Product.find(request.param("id"))

        await product?.load("category")
        await product?.load("meassure")
        

        response.send(product)
    }

    public async store({request, response}){
       
      const newProduct = new Product()

      newProduct.code = request.body().code
      newProduct.name = request.body().name
      newProduct.stock = request.body().stock
      newProduct.price = request.body().price
      newProduct.category_id = request.body().category
      newProduct.meassure_id = request.body().meassure
      

      response.send(newProduct)
    }

    public async update({request, response}){
        const product = await Product.findOrFail(request.param("id"))

        if (product) {
            product.name = request.body().name
            product.code = request.body().code
            product.price = request.body().price
            product.stock = request.body().stock
            product.category_id = request.body().category
            product.meassure_id = request.body().meassure
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
