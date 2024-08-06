import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Product from 'App/Models/Product'
import Sale from 'App/Models/Sale'
import SaleDetail from 'App/Models/SaleDetail'
import UnitConversionService from 'App/Service/UnitConversionService'
import SaleValidator from 'App/Validators/SaleValidator'

export default class SalesController {
    public async finishSale({request, response}:HttpContextContract){
        const payload = await request.validate(SaleValidator)
        const product = await Product.find(payload.params.id)
        await product?.load("meassure")

        if (product) {
            const quantityDetail = UnitConversionService.unitConvertion(request.body().meassure, product.meassure.symbol, request.body().quantity)

            const newSale = await Sale.create({
                operation_number:request.body().operationNumber,
                bank_id:request.body().personBank,
                person_id:request.body().person
            })
    
            const newSaleDetail = await SaleDetail.create({
                sale_id:newSale.id,
                product_id:product?.id,
                product_quantity:quantityDetail
    
            })

        }
        
    }
}
