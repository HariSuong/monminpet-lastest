'use client'

import HotPost from '@/components/post/hot-post'
import Title from '../title'

import PostSlider from '@/components/post/post-slider'
import slugify from 'slugify'
import { NewPost } from '@/types/posts'

interface CategoryPost {
  id: number
  name: string
  thumb: string
  posts: {
    id: number
    title: string
    desc: string
    thumb: string
    count_view: number
  }[]
}

const PostCat: React.FC<{ postsCat: CategoryPost[]; newPost: NewPost }> = ({
  postsCat,
  newPost
}) => {
  const posts = postsCat?.map(cat => {
    if (cat.posts.length === 0) return null

    return (
      <div key={cat.id}>
        <div className='container'>
          <Title
            title={cat.name}
            subtitle=''
            to={`/posts/${slugify(cat?.name || '', {
              lower: true,
              strict: true,
              locale: 'vi'
            })}?catId=${cat.id}&page=1`}
          />
        </div>
        <div>
          <div className='px-4 py-0 lg:py-4 w-full lg:max-w-7xl sm:max-w-full md:mb-12 mb-6'>
            <PostSlider posts={cat.posts} />
          </div>
        </div>
      </div>
    )
  })

  return (
    <div className='py-4 lg:mx-auto lg:max-w-7xl lg:px-8 pt-24 lg:pt-40 lg:container'>
      <HotPost newPost={newPost} />
      <div>{posts}</div>
    </div>
  )
}

export default PostCat
