import Banner from '@/components/banner'
import React from 'react'
import { motion } from 'framer-motion'
import TopToBotAnimation from '@/components/common/top-to-bot'
import RightToLeftAnimation from '@/components/common/right-to-left'
import EnterAnimation from '@/components/common/enter-animation'
import ButtonService from '@/components/common/button-service'

// Tạo một motion mà h2 sẽ đi từ trên xuống và p sẽ đi từ phải vào
// const banner = {
//   initial: { opacity: 0, y: -100 },
//   animate: { opacity: 1, y: 0 },
//   transition: { duration: 1 }
// }

const ThingsPetNeed = () => {
  return (
    <div className='flex xl:flex-row flex-col justify-center items-center md:mt-8 lg:mt-0'>
      <div className='xl:w-1/2 w-full'>
        <Banner type='video' url='/home/food-pet.mp4' time={1000} />
      </div>

      <div className='xl:w-1/2 w-full container xl:pl-20 xl:pr-28'>
        <TopToBotAnimation delay={0}>
          <h2 className='uppercase text-lg md:text-2xl lg:text-[2.6rem]/[3.5rem] font-semibold text-center md:text-left md:pt-10 pt-5'>
            bí quyết nuôi dưỡng thú cưng khoẻ mạnh
          </h2>
        </TopToBotAnimation>

        <div
          className='hidden lg:block text-2xl 
          md:pt-5 pt-3
          text-justify
          text-gray-700
        '>
          <RightToLeftAnimation delay={0.25}>
            <p className='mb-4'>
              Chế độ ăn của thú cưng cần được bổ sung thêm các thực phẩm chức
              năng để cải thiện sức khỏe, cũng như con người chúng ta vậy. Tuy
              nhiên, làm sao để những sản phẩm này phát huy tối đa hiệu quả lại
              là một vấn đề khác.
            </p>
            <p>
              Chúng tôi ưu tiên lựa chọn kỹ càng những sản phẩm trên thế giới đã
              được kiểm nghiệm lâm sàng. Nhờ vậy, MonMin Pet đảm bảo thú cưng
              của bạn nhận được sức khoẻ toàn diện để có một cuộc sống vui vẻ,
              khỏe mạnh và cân bằng nhất. Đặc biệt là thân thiện với vị giác của
              các bé.
            </p>
          </RightToLeftAnimation>

          <EnterAnimation delay={0.5} className='flex justify-center pt-5'>
            <ButtonService title='Tìm hiểu thêm' linkUrl='#' />
          </EnterAnimation>
        </div>

        <div
          className='lg:hidden block md:text-lg text-sm
          md:pt-5 pt-3
          text-justify
          text-gray-700
        '>
          <div>
            <p className='mb-4'>
              Chế độ ăn của thú cưng cần được bổ sung thêm các thực phẩm chức
              năng để cải thiện sức khỏe, cũng như con người chúng ta vậy. Tuy
              nhiên, làm sao để những sản phẩm này phát huy tối đa hiệu quả lại
              là một vấn đề khác.
            </p>
            <p>
              Chúng tôi ưu tiên lựa chọn kỹ càng những sản phẩm trên thế giới đã
              được kiểm nghiệm lâm sàng. Nhờ vậy, MonMin Pet đảm bảo thú cưng
              của bạn nhận được sức khoẻ toàn diện để có một cuộc sống vui vẻ,
              khỏe mạnh và cân bằng nhất. Đặc biệt là thân thiện với vị giác của
              các bé.
            </p>
          </div>

          <EnterAnimation delay={0.5} className='flex justify-center pt-5'>
            <ButtonService title='Tìm hiểu thêm' linkUrl='/products' />
          </EnterAnimation>
        </div>
      </div>
    </div>
  )
}

export default ThingsPetNeed
