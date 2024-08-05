import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreatePersonValidator {
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
    name:schema.string([
      rules.minLength(10),
      rules.maxLength(50)
    ]),
    identity_document:schema.string([
      rules.maxLength(8),
      rules.minLength(7),
      rules.regex(/^[0-9]{7,8}$/),
      rules.unique({table:"people", column:"identity_document"})
    ]),
    email:schema.string([
      rules.maxLength(255),
      rules.email(),
      rules.unique({table:"people", column:"email"})
    ]),
    birthday:schema.date({format:"dd-MM-yyyy"}, [
      rules.before(18, "years")
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
