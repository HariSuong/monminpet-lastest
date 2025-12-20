const ProductContent = ({ content }: { content?: string }) => {
  if (!content) return null

  return (
    <div className=' w-full mt-6'>
      <h2 className='text-gray-900 md:text-3xl text-xl title-font font-medium mb-1'>
        CHI TIẾT SẢN PHẨM
      </h2>
      {/* Tạo 1 div chứa nội dung bài viết, thông tin chi tiết sản phẩm  */}
      <div
        className='mt-6 text-gray-900 md:text-lg text-sm font-extralight mb-1 content-container'
        dangerouslySetInnerHTML={{ __html: content }}></div>
    </div>
  )
}

export default ProductContent
