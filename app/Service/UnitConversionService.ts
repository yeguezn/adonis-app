/*
    +--------------------------------------------+
    |                    UNIT                    |
    |                  SYMBOLOGY                 |
    |                  EXPLAINED                 |     
    +--------------------------------------------+

    kg = Kilogram
    oz = Ounce
    lb = Pound
    m = Meter
    km = Kilometer
    ft = Feet
    t = Ton
    in = Inches
    g = Gram


*/ 
export default class UnitConversionService{
    private static conversionTable:object = {
        kg:{kg:1, t:0.001, oz:35.27, lb:2.2, g:1000},
        oz:{kg:0.028349, t:0.000028, oz:1, lb:0.0625, g:28.3495},
        lb:{kg:0.45359, t:0.000454, oz:16, lb:1, g:453.592},
        m:{m:1, km:0.001, "in":39.3701, ft:3.28084},
        km:{m:1000, km:1, "in":39370.1, ft:3280.84},
        ft:{m:0.304794, km:0.000304, "in":12, ft:1},
        g:{kg:0.001, lb:0.00220462, oz:0.035274, t:0.000001, g:1},
        "in":{m:0.025399, km:0.000025, "in":1, ft:0.08333}
    }

    public static unitConvertion(unitChosenByUser:string, unitToConvert:string, meassureValue:number)
    {
        if (unitChosenByUser in this.conversionTable && unitToConvert in this.conversionTable[unitChosenByUser]){

            return this.conversionTable[unitChosenByUser][unitToConvert] * meassureValue
            
        }

        return -1
    }
    
}