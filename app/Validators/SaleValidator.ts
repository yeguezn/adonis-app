import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SaleValidator {
  constructor(protected ctx: HttpContextContract) {}

  /*
   * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
   *
   * For example:
   * 1. The username must be of data type string. But then also, it should
   *    not contain special characters or numbers.
   *    ```
   *     schema.string([ rules.alpha() ])
   *    ```
   *
   * 2. The email must be of data type string, formatted as a valid
   *    email. But also, not used by any other user.
   *    ```
   *     schema.string([
   *       rules.email(),
   *       rules.unique({ table: 'users', column: 'email' }),
   *     ])
   *    ```
   */
  public schema = schema.create({
    params:schema.object().members({
      id:schema.number([

        rules.exists({table:"products", column:"id"})

      ])
    }),
    meassure:schema.string([
      rules.exists({table:"meassures", column:"symbol"})
    ]),
    quantity:schema.number([
      rules.range(0.1, 100000)
    ]),
    operationNumber:schema.string([
      rules.minLength(10),
      rules.unique({table:"sales", column:"operation_number"})
    ]),
    personBank:schema.string([
      rules.maxLength(255)
    ]),
    receptorBank:schema.number([
      rules.exists({table:"banks", column:"id"})
    ]),
    currencySymbol:schema.string([
      rules.exists({table:"currencies", column:"symbol"})
    ])
  })

  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   *
   */
  public messages: CustomMessages = {}
}
