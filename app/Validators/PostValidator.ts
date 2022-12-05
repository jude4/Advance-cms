import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class PostValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    title: schema.string({ trim: true }, [rules.minLength(10)]),
    content: schema.string(),
    cover_image: schema.file({
      size: '2mb',
      extnames: ['jpg', 'png', 'PNG', 'JPG'],
    }),
  })

  public messages: CustomMessages = {
    'title.required': 'Title is required.',
    'content.required': 'Post Content is required.',
    'cover_image.required': 'Post Cover image is required.',
  }
}
