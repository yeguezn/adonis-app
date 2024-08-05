// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'


/*
    +--------------------------------------------+
    |                    UNIT                    |
    |                  SYMBOLOGY                 |
    |                  EXPLAINED                 |     
    +--------------------------------------------+

    cu = each unit
    kg = Kilogram
    oz = Ounce
    lb = Pound
    m = Meter
    km = Kilometer
    ft = Inches
    t = Ton


*/ 

export default class UnitConvertionsController {
    private static convertionTable:object = {
        cu:1,
        kg:{kg:1, t:0.001, oz:35.27, lb:2.2},
        oz:{kg:0.028349, t:0.000028, oz:1, lb:0.0625},
        lb:{kg:0.45359, t:0.000454, oz:16, lb:1},
        m:{m:1, km:0.001, "in":39.3701, ft:3.28084},
        km:{m:1000, km:1, "in":39370.1, ft:3280.84},
        ft:{m:0.025399, km:0.000025, "in":1, ft:0.08333}

    }

    public static unitConvertion(){
        console.log(UnitConvertionsController.convertionTable)
    }
}