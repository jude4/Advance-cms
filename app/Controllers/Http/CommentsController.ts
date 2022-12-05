// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Post from 'App/Models/Post'

export default class CommentsController {
  public async store({ params: { id }, request, auth, response, session }) {
    const body = request.input('comment')

    const post = await Post.findOrFail(id)
    await post.related('comment').create({
      body: body,
      commentable_type: 'App/Models/Post',
      user_id: auth.user.id,
    })
    session.flash('success', 'Comment successful.')
    return response.redirect().back()
  }
}
