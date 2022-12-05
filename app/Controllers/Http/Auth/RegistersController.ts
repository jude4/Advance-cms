// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import UserValidator from 'App/Validators/UserValidator'

export default class RegistersController {
  public async index({ view }) {
    return view.render('pages.auth.register')
  }

  public async store({ request, auth, response }) {
    const payload = await request.validate(UserValidator)
    try {
      const user = await User.create(payload)

      await auth.login(user)
    } catch (error) {
      return error.message
    }

    return response.redirect('/')
  }
}
