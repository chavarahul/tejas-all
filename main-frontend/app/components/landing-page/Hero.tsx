'use client';
import React, { useRef } from 'react';
import ArrowIcon from '@/app/assets/arrow-right.svg';
import Cog from '@/app/assets/cog.png';
import CylinderImage from '@/app/assets/cylinder.png';
import NoodleImage from '@/app/assets/noodle.png';
import { motion, useScroll, useTransform } from 'framer-motion';

const Hero = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start end", "end start"],
  });
  const translateY = useTransform(scrollYProgress, [0, 1], [150, -150]);

  return (
    <section ref={heroRef} className='pt-8 pb-20 md:pt-5 md:pb-10 overflow-x-clip bg-[radial-gradient(ellipse_200%_100%_at_bottom_left,#183EC2,#EAEEFE_100%)]'>
      <div className='container xl:px-20 md:px-10 max-md:px-5'>
        <div className="md:flex items-center">
          <div className='md:w-[478px] 2xl:w-[650px]'>
            <div className="tag">Work Smarter with Your Flow</div>
            <h1 className='text-5xl md:text-7xl font-bold tracking-tighter bg-gradient-to-b from-black to-[#001E80] text-transparent bg-clip-text mt-6'>
              Staar AI: Your Desktop Companion
            </h1>
            <p className='text-xl text-[#010D3E] tracking-tight mt-6'>
              Download Staar AI and let it adapt to your workflow—assisting with code, files, and any screen task in real time.
            </p>
            <div className="flex gap-1 items-center mt-[30px]">
              <button className='btn btn-primary'>Download for Free</button>
              <button className='btn btn-text gap-1'>
                <span>Explore Features</span>
                <ArrowIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
          <div className="mt-20 md:mt-0 md:h-[648px] md:flex-1 2xl:ml-20 relative">
            <motion.img
              src={Cog.src}
              alt='Cog Image'
              className='md:absolute md:h-full md:w-auto md:max-w-none md:-left-6 lg:left-0'
              animate={{ translateY: [-30, 30] }}
              transition={{
                repeat: Infinity,
                repeatType: 'mirror',
                duration: 3,
                ease: 'easeInOut'
              }}
            />
            <motion.img
              src={CylinderImage.src}
              alt='Cylinder Image'
              width={220}
              height={220}
              className='hidden md:block -top-8 -left-32 md:absolute'
              style={{ translateY: translateY }}
            />
            <motion.img
              src={NoodleImage.src}
              alt='Noodle Image'
              width={220}
              height={220}
              className='hidden md:block md:absolute top-[524px] left-[448px] rotate-[30deg]'
              style={{ translateY: translateY , rotate : 30 }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;