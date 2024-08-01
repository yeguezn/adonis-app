// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Product from "App/Models/Product";
import Category from "App/Models/Category";
import Meassure from "App/Models/Meassure";
import Database from "@ioc:Adonis/Lucid/Database";

export default class ProductsController {
    public async index({response}){
        const products = await Product.query().has('category').has('meassure')

        response.send(products)
    }

    public async show({request, response}){
        const product = await Database.from("products")
        .join("categories", "products.category_id", "=", "categories.id")
        .select("products.name as product_name")
        .select("products.stock")
        .select("products.price")
        .select("categories.name as category_name")

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

      const category = await Category.find(request.body().category)
      const meassure = await Meassure.find(request.body().meassure)

      if (category && meassure) {
        await category.related("products").save(newProduct)
        await meassure.related("products").save(newProduct)
      }


      response.send(newProduct)
    }

    public async update({request, response}){
        const product = await Product.findOrFail(request.param("id"))

        if (product) {
            product.name = request.body().name
            product.code = request.body().code
            product.price = request.body().price
            product.stock = request.body().stock
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
