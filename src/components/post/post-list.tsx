import React from 'react'

import { Product } from '../../types/products'
import { PostItemProps } from '@/types/posts'
import PostItem from '@/components/post/post-item'

const PostList: React.FC<{ posts: PostItemProps[] }> = ({ posts }) => {
  return (
    <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-xl:gap-4 gap-6'>
      {posts.map(post => (
        <PostItem
          key={post.id}
          id={post.id} // Add this line
          title={post.title}
          desc={post.desc}
          thumb={post.thumb}
          count_view={post.count_view} // Add this line
        />
      ))}
    </div>
  )
}

export default PostList
