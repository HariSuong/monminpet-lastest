import FeatureTemplate from '@/components/common/feature-template'
import Title from '@/components/title'
import React from 'react'

const PetCommit = () => {
  return (
    <div className='xl:py-24 lg:py-12 py-8 xl:px-[4.5rem] container'>
      <Title
        title='đặt thú cưng của bạn lên hàng đầu'
        subtitle='cam kết của tôi'
      />

      <div className='lg:flex-row flex-col justify-between flex xl:gap-0 lg:px-0 gap-6 mt-5 container'>
        <FeatureTemplate
          title='Hương vị'
          content='Hương vị thức ăn thơm ngon, kích thích vị giác của chó mèo dù là kén ăn nhất. Thực phẩm bổ sung / thuốc dễ uống.'
          image='/home/pet-commit/1.png'
        />
        <div className='lg:block hidden'>
          <FeatureTemplate
            title='Ngăn ngừa &lt;br/&gt; sỏi thận'
            content='Hạn chế các sản phẩm tạo sỏi. Ưu tiên cấp nước, ngăn ngừa sỏi thận, sỏi bàng quang,…'
            image='/home/pet-commit/2.png'
          />
        </div>
        <div className='block lg:hidden'>
          <FeatureTemplate
            title='Ngăn ngừa sỏi thận'
            content='Hạn chế các sản phẩm tạo sỏi. Ưu tiên cấp nước, ngăn ngừa sỏi thận, sỏi bàng quang,…'
            image='/home/pet-commit/2.png'
          />
        </div>
        <FeatureTemplate
          // title='tăng chất &lt;br/&gt; lượng sống'
          title='Bác sĩ thú y kiểm nghiệm'
          content='Các sản phẩm được kiểm nghiệm kỹ càng bởi đội ngũ Bác sĩ Thú Y giàu kinh nghiệm.'
          image='/home/pet-commit/3.png'
        />
      </div>
    </div>
  )
}

export default PetCommit
