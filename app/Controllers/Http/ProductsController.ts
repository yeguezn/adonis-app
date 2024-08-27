import  { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Product from "App/Models/Product";
import CreateProductValidator from 'App/Validators/CreateProductValidator';
import ProductValidator from 'App/Validators/ProductValidator';
import CategoryValidator from 'App/Validators/CategoryValidator';
import UpdateProductValidator from 'App/Validators/UpdateProductValidator';

export default class ProductsController {
    public async index({response}: HttpContextContract){
       let products = await Product.query().preload("category").preload("meassure")

        response.ok(products)
    }

    public async show({request, response}){

        let payload = await request.validate(ProductValidator)

        let product = await Product.find(payload.params.id)

        await product?.load("category")
        await product?.load("meassure")
        

        response.ok(product)
    }

    public async store({request, response, bouncer}:HttpContextContract){
      let payload = await request.validate(CreateProductValidator)
      await bouncer.authorize("manageResourceAsAdmin")

      let newProduct = await Product.create({

        code:payload.code,
        name:payload.name,
        stock:payload.stock,
        price:payload.price,
        category_id:payload.category,
        meassure_id:payload.meassure

      })
      

      response.ok(newProduct)
    }

    public async update({request, response, bouncer}){
        let payload = await request.validate(UpdateProductValidator)
        let product = await Product.findOrFail(payload.params.id)
        await bouncer.authorize("manageResourceAsAdmin")

        product.name = payload.name
        product.code = payload.code
        product.price = payload.price
        product.stock = payload.stock
        product.category_id = payload.category
        product.meassure_id = payload.meassure
        await product.save()

        response.ok(product)

    }

    public async destroy({request, response, bouncer}){
        let payload = await request.validate(ProductValidator)
        let product = await Product.findOrFail(payload.params.id)
        await bouncer.authorize("manageResourceAsAdmin")
        await product.delete()
        response.ok(product)
    }

    public async filterProductsByCategory({request, response, bouncer}:HttpContextContract){
        let payload = await request.validate(CategoryValidator)
        let products = await Product.query().whereHas("category", (query)=>{
            query.where("id", payload.params.id)
        })
        await bouncer.authorize("manageResourceAsAdmin")

        response.ok(products)
        
    }
}
