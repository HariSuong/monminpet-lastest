import ServiceTemplate from '@/components/common/service-template'
import React from 'react'

const AboutSection = () => {
  return (
    <>
      <ServiceTemplate title='From love' image='/about/our-story/1.png'>
        <p className='font-light md:text-xl text-sm md:mb-6 mb-2'>
          <strong className='font-bold'>Mon</strong>, chú mèo hiền lành và trầm
          lặng, dường như hiểu chuyện, luôn an ủi gia đình và đồng hành trong
          những lúc tâm trạng xuống dốc.{' '}
          <strong className='font-bold'>Min</strong>, chú mèo tinh nghịch và
          hiếu động, luôn mang đến những khoảnh khắc vui vẻ bằng những trò đùa
          nghịch ngợm.
        </p>
        <p className='font-light md:text-xl text-sm '>
          Mỗi ngày bên cạnh MonMin là những khoảnh khắc vô giá mà tôi luôn trân
          trọng. MonMin không chỉ là thú cưng, mà còn là những người bạn thân
          thiết, những thành viên không thể thiếu trong gia đình. Và chắc hẳn
          gia đình nào có BOSS đều có cảm giác này!
        </p>
      </ServiceTemplate>

      <ServiceTemplate
        title='for the best thing'
        image='/about/our-story/2.png'
        position='right'>
        <p className='font-light md:text-xl text-sm md:mb-6 mb-2'>
          Và chúng tôi hiểu, khi thời gian trôi đi, MonMin cũng dần già yếu.
        </p>
        <p className='font-light md:text-xl text-sm md:mb-6 mb-2'>
          Chính vì vậy, chúng tôi càng trân trọng hơn từng khoảnh khắc bên cạnh
          MonMin, cố gắng mang đến cho chúng cuộc sống tốt đẹp và hạnh phúc
          nhất.
        </p>
        <p className='font-light md:text-xl text-sm '>
          Từ đó, tôi ấp ủ ước mơ mang đến những thương hiệu thực phẩm tốt và
          thực phẩm bảo vệ sức khỏe dành cho thú cưng, với mong muốn giúp đỡ
          những người bạn bốn chân khác cũng có được cuộc sống khỏe mạnh và vui
          vẻ bên gia đình.
        </p>
      </ServiceTemplate>

      <ServiceTemplate title='created with love' image='/about/our-story/3.jpg'>
        <p className='font-light md:text-xl text-sm md:mb-6 mb-2'>
          Là một chuyên gia trong lĩnh vực thú y, tôi luôn đặt{' '}
          <strong className='font-bold'>AN TOÀN - KHOA HỌC</strong> lên hàng
          đầu. Với tình yêu chó mèo đủ lớn, quan tâm đủ nhiều và sự tự tin vào
          kinh nghiệm nghiên cứu, xây dựng các sản phẩm bảo vệ sức khoẻ thú
          cưng, phác đồ chuẩn y khoa. Chúng tôi phát triển MonMin Pet, tin rằng,
          mỗi chú mèo, chú chó đều xứng đáng được yêu thương, chăm sóc và tận
          hưởng một cuộc sống khỏe mạnh bên gia đình.
        </p>
        <div className='text-right text-sm space-y-1 italic'>
          <p className='font-bold text-sm not-italic'>
            Chuyên Gia Thú Y- Minh Duy
          </p>
          <p>Chứng chỉ chẩn đoán và điều trị bệnh lý trên thú nhỏ</p>
          <p>Chứng chỉ Châm cứu Động Vật Nhỏ</p>
          <p>Chứng chỉ Dinh dưỡng trên thú nhỏ</p>
        </div>
      </ServiceTemplate>
    </>
  )
}

export default AboutSection
