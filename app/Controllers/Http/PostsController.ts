import Application from '@ioc:Adonis/Core/Application'
// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Post from 'App/Models/Post'
import PostValidator from 'App/Validators/PostValidator'

export default class PostsController {
  public async index({ request, view }) {
    const page = request.input('page', 1)
    const limit = 5
    const posts = await Post.query().paginate(page, limit)

    posts.baseUrl('/posts')
    return view.render('pages.posts.index', { posts })
  }

  public async show({ params, view }) {
    const post = (await Post.findOrFail(params.id))
    const comments = await post.related('comment').query().preload('user')

    return view.render('pages.posts.show', { post, comments })
  }

  public async create({ view }) {
    return view.render('pages.posts.create')
  }

  public async edit({ params, view, bouncer }) {
    const post = (await Post.findOrFail(params.id)).serialize()
    await bouncer.with('PostPolicy').authorize('edit', post)
    return view.render('pages.posts.edit', { post })
  }

  public async update({ params: { id }, request, response, session, auth, bouncer }) {
    const payload = await request.validate(PostValidator)

    if (payload.cover_image) {
      const imageName = new Date().getTime().toString() + `.${request.file('cover_image').extname}`
      await payload.cover_image.move(Application.publicPath('images'), {
        name: imageName,
      })

      payload.cover_image = `/images/${imageName}`
    }

    const post = await Post.findOrFail(id)
    await bouncer.with('PostPolicy').authorize('update', post)
    
    payload.user_id = auth.user.id

    await post.merge(payload).save()

    session.flash('success', 'Post Updated!')

    return response.redirect().toRoute('PostsController.index')
  }

  public async store({ request, session, response, auth }) {
    const payload = await request.validate(PostValidator)

    if (payload.cover_image) {
      const imageName = new Date().getTime().toString() + `.${request.file('cover_image').extname}`
      await payload.cover_image.move(Application.publicPath('images'), {
        name: imageName,
      })

      payload.cover_image = `/images/${imageName}`
    }

    await auth.user.related('post').create(payload)

    session.flash('success', 'Post created!')

    return response.redirect().toRoute('PostsController.index')
  }

  public async destroy({ params: { id }, response, session }) {
    const post = await Post.findOrFail(id)
    await post.delete()

    session.flash('success', 'Post deleted!')

    return response.redirect().toRoute('PostsController.index')
  }
}
