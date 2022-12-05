import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UserValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string(),
    email: schema.string({}, [rules.email(), rules.unique({ table: 'users', column: 'email' })]),
    password: schema.string({}, [rules.confirmed(), rules.minLength(4)]),
  })

  public messages: CustomMessages = {
    'name.required': 'Name is required.',
    'email.required': 'Email address is required.',
    'password.required': 'Password is required.',
  }
}
