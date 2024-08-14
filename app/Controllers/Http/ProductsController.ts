import  { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Product from "App/Models/Product";
import CreateProductValidator from 'App/Validators/CreateProductValidator';
import ProductValidator from 'App/Validators/ProductValidator';
import CategoryValidator from 'App/Validators/CategoryValidator';
import UpdateProductValidator from 'App/Validators/UpdateProductValidator';

export default class ProductsController {
    public async index({response}: HttpContextContract){
       const products = await Product.query().preload("category").preload("meassure")

        response.ok(products)
    }

    public async show({request, response}){

        const payload = await request.validate(ProductValidator)

        const product = await Product.find(payload.params.id)

        await product?.load("category")
        await product?.load("meassure")
        

        response.ok(product)
    }

    public async store({request, response}:HttpContextContract){
      const payload = await request.validate(CreateProductValidator)

      const newProduct = await Product.create({

        code:payload.code,
        name:payload.name,
        stock:payload.stock,
        price:payload.price,
        category_id:payload.category,
        meassure_id:payload.meassure

      })
      

      response.ok(newProduct)
    }

    public async update({request, response}){
        const payload = await request.validate(UpdateProductValidator)
        const product = await Product.findOrFail(payload.params.id)

        product.name = payload.name
        product.code = payload.code
        product.price = payload.price
        product.stock = payload.stock
        product.category_id = payload.category
        product.meassure_id = payload.meassure
        await product.save()

        response.ok(product)

    }

    public async destroy({request, response}){
        const payload = await request.validate(ProductValidator)
        const product = await Product.findOrFail(payload.params.id)
        await product.delete()
        response.ok(product)
    }

    public async filterProductsByCategory({request, response}:HttpContextContract){
        const payload = await request.validate(CategoryValidator)
        const products = await Product.query().whereHas("category", (query)=>{
            query.where("id", payload.params.id)
        })

        response.ok(products)
        
    }
}
