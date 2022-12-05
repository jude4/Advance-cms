// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class LogoutsController {
  public async index({ response, auth }) {
    auth.logout()
    return response.redirect().toRoute('login')
  }
}
