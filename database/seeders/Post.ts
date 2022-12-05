import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Post from 'App/Models/Post'

export default class extends BaseSeeder {
  public async run() {
    await Post.createMany([
      {
        title: 'Post One',
        content: 'This is my first post',
      },
      {
        title: 'Post Two',
        content: 'This is my second post',
      },
    ])
  }
}
