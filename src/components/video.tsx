'use client'

import { TouchEvent, useEffect, useRef } from 'react'

const Video = ({
  url,
  time,
  playsInline = true,
  loop,
  className = ''
}: {
  url: string
  time?: number
  playsInline?: boolean
  loop?: boolean
  className?: string
}) => {
  const videoRef = useRef<HTMLVideoElement>(null)

  // Xử lý autoplay cho iOS
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playsInline = true
      videoRef.current.setAttribute('muted', '')
      videoRef.current.setAttribute('playsinline', '') // Cần cả camelCase và lowercase
      videoRef.current.setAttribute('webkit-playsinline', '') // Cho Safari cũ
    }
  }, [])

  const handleVideoEnd = () => {
    if (videoRef.current) {
      setTimeout(() => {
        videoRef.current?.play()
      }, time) // 1 giây
    }
  }

  return (
    <>
      <div className='aspect-video w-full pointer-events-none relative overflow-hidden'>
        <video
          ref={videoRef}
          className={`video-element ${className}`} // Thêm class name cho CSS global
          style={{
            transform: 'translateZ(0)',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
          src={url}
          autoPlay
          muted
          loop={loop}
          playsInline={playsInline}
          onEnded={handleVideoEnd}
          preload='auto'
          disablePictureInPicture
          disableRemotePlayback
          {...{ 'webkit-playsinline': 'true' }} // Cú pháp đúng cho TS
          onTouchStart={(e: TouchEvent<HTMLVideoElement>) => e.preventDefault()}
        />

        {/* Thêm lớp phủ để chặn tương tác */}
        <div
          className='absolute inset-0 z-10'
          style={{ touchAction: 'none' }}
        />
      </div>

      {/* <div className='flex justify-center'>
      <video
        ref={videoRef}
        className='w-full object-cover'
        src={url}
        autoPlay
        // loop={true}
        muted
        playsInline={playsInline ? true : false}
        onEnded={handleVideoEnd}
      />
    </div> */}
    </>
  )
}

export default Video
