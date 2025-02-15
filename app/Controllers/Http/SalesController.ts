import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Product from 'App/Models/Product'
import Sale from 'App/Models/Sale'
import SaleDetail from 'App/Models/SaleDetail'
import UnitConversionService from 'App/Service/UnitConversionService'
import SaleValidator from 'App/Validators/SaleValidator'
import Database from '@ioc:Adonis/Lucid/Database'
import Currency from 'App/Models/Currency'

export default class SalesController {
    public async finishSale({request, response}:HttpContextContract){
        let payload = await request.validate(SaleValidator)
        let product = await Product.findOrFail(payload.params.id)
        let currency = await Currency.findByOrFail("symbol", payload.currencySymbol)
        let quantityDetail:number = -1
        await product.load("meassure")

        if (product.meassure.name === "unit") {

            quantityDetail = Math.trunc(payload.quantity)
            
        }else{

            quantityDetail = UnitConversionService.unitConvertion(payload.meassure, product.meassure.symbol, payload.quantity)

        }

        response.abortIf(quantityDetail < 0 || (product.stock - quantityDetail) < 0, 
            "It wasn't possible to complete your sale because you request an invalid product quantity",
            400
        )

        const saleCompleted = await Database.transaction(async (trx)=>{
            const newSale = await Sale.create({
                operation_number:payload.operationNumber,
                person_bank:payload.personBank,
                person_id:payload.person,
                bank_id:payload.receptorBank
            }, {client:trx})

           
            const newSaleDetail = await SaleDetail.create({
            
                sale_id:newSale.id,
                product_id:product.id,
                product_quantity:quantityDetail,
                subtotal:Math.round(product.price * currency.currentValue),
                currency_symbol:payload.currencySymbol

            }, {client:trx})

            product.stock -= quantityDetail
            product.save()

            return newSaleDetail

        })


        response.ok(saleCompleted)

    }
}
