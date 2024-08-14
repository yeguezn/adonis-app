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

            const quantityDetail = UnitConversionService.unitConvertion(payload.meassure, product.meassure.symbol, payload.quantity)

            const newSale = await Sale.create({
                operation_number:payload.operation_number,
                person_bank:payload.person_bank,
                person_id:payload.person,
                bank_id:payload.receptor_bank
            })
    
            const newSaleDetail = await SaleDetail.create({
                
                sale_id:newSale.id,
                product_id:product?.id,
                product_quantity:quantityDetail
    
            })
            
        }
    }
}
