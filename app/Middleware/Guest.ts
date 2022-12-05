import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class Guest {
  public async handle({ auth, session, response }: HttpContextContract, next: () => Promise<void>) {
    if (await auth.use('web').isLoggedIn) {
      session.flash('success', 'You are logged in already.')

      return response.redirect('/')
      
    }
    await next()
  }
}
