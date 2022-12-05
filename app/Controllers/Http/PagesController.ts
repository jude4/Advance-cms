import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Post from 'App/Models/Post'

export default class PagesController {
  public async home({ request, view }, ctx: HttpContextContract) {

     const page = request.input('page', 1)
     const limit = 5
     const posts = await Post.query().paginate(page, limit)

    posts.baseUrl('/')
    
    return view.render('pages/home', { posts })
  }

  public async aboutUs({ view }) {
    return view.render('pages/about')
  }

  public async contactUs({ view }) {
    return view.render('pages/contact')
  }
}
