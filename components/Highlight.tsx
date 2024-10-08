import React from 'react'
import { ContainerScroll } from './ui/container-scroll-animation'

const Highlight = () => {
  return (
    <div id='demo' className="flex flex-col overflow-hidden">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl font-semibold text-black dark:text-white">
              Unleash the power of <br />
              <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-emerald-500 to-blue-500">
                Crypto Innovation
              </span>
            </h1>
          </>
        }
      >
        <video
          src='/blockchain2.mp4'
          height={1080}
          width={1920}
          autoPlay
          loop
          muted
          className="mx-auto rounded-2xl object-cover h-full object-left-top"
          draggable={false}
        />
        {/* <Spline
          scene="https://prod.spline.design/Pyma7ykZHXuDPcBZ/scene.splinecode" 
        /> */}
      </ContainerScroll>
    </div>
  )
}

export default Highlight