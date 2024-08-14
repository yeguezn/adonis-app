import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Product from 'App/Models/Product'
import Sale from 'App/Models/Sale'
import SaleDetail from 'App/Models/SaleDetail'
import UnitConversionService from 'App/Service/UnitConversionService'
import SaleValidator from 'App/Validators/SaleValidator'
import Database from '@ioc:Adonis/Lucid/Database'

export default class SalesController {
    public async finishSale({request, response}:HttpContextContract){
        let payload = await request.validate(SaleValidator)
        let product = await Product.findOrFail(payload.params.id)
        let quantityDetail:number = -1
        await product.load("meassure")

        quantityDetail = UnitConversionService.unitConvertion(payload.meassure, product.meassure.symbol, payload.quantity)

        response.abortIf(quantityDetail < 0, 
            "It wasn't possible to complete your sale because you request an invalid product quantity",
            400
        )

        await Database.transaction(async (trx)=>{
            const newSale = new Sale()

            newSale.operation_number=payload.operation_number
            newSale.person_bank=payload.person_bank
            newSale.person_id=payload.person
            newSale.bank_id=payload.receptor_bank

            newSale.useTransaction(trx)
            newSale.save()

            const newSaleDetail = await SaleDetail.create({
            
                sale_id:newSale.id,
                product_id:product.id,
                product_quantity:quantityDetail

            })

            return newSaleDetail

        })


    }
}
