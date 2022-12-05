import Route from '@ioc:Adonis/Core/Route'

Route.get('/', 'PagesController.home')
Route.get('/about-us', 'PagesController.aboutUs')
Route.get('/contact-us', 'PagesController.contactUs')

Route.get('/posts', 'PostsController.index')

Route.group(() => {
  Route.post('posts', 'PostsController.store').as('posts.store')
  Route.put('posts/:id', 'PostsController.update').as('posts.update')
  Route.get('posts/:id/edit', 'PostsController.edit').as('posts.edit')
  Route.delete('posts/:id', 'PostsController.destroy').as('posts.destroy')
  Route.get('posts/create', 'PostsController.create').as('posts.create')
  Route.get('logout', 'Auth/LogoutsController.index').as('logout')
  
  Route.post('posts/comments/:id', 'CommentsController.store')
}).middleware('auth')

Route.get('posts/:id', 'PostsController.show').as('posts.show')
Route.group(() => {
  Route.get('login', 'Auth/LoginController.index').as('login')
  Route.post('login', 'Auth/LoginController.store')

  Route.get('register', 'Auth/RegistersController.index')
  Route.post('register', 'Auth/RegistersController.store').as('register')
}).middleware('guest')
