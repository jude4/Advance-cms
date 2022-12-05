// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class LoginController {
  public async index({ view }) {
    return view.render('auth/login')
  }

  public async store({ request, auth, session, response }) {
    const { email, password } = request.only(['email', 'password'])

    try {
      await auth.attempt(email, password)
    } catch (error) {
      session.flash('errors.email', 'Your email or password is incorrect')

      return response.redirect().back()
    }

    return response.redirect().toRoute('PagesController.home')
  }
}
