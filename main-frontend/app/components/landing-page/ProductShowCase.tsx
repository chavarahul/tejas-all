'use client';
import React, { useRef } from 'react';
import PyramidImage from '@/app/assets/pyramid.png';
import TubeImage from '@/app/assets/tube.png';
import { motion, useTransform, useScroll } from 'framer-motion';

const ProductShowCase = () => {
  const productRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: productRef,
    offset: ["start end", "end start"]
  });
  const translateY = useTransform(scrollYProgress, [0, 1], [-150, 150]);

  return (
    <section ref={productRef} className='bg-gradient-to-b overflow-x-clip from-[#FFFFFF] to-[#D2DCFF] py-24'>
      <div className="md:px-10 px-5">
        <div className="max-w-[900px] mx-auto">
          <div className="flex justify-center items-center">
            <div className="tag">Get Started with Staar AI</div>
          </div>
          <h2 className='my-5 section-title'>Install and Run Your Workflow Companion</h2>
          <p className='section-description'>
            Download Staar AI as a zip file, unzip it, and run it on your desktop to start working smarter—code, files, and more, all in your flow.
          </p>
        </div>
        <div className="relative">
          <video
            src="/path/to/Staar-demo.mp4"
            autoPlay
            loop
            muted
            className='mt-10 w-full max-w-[2000px] mx-auto rounded-lg shadow-lg'
          />
          <motion.img
            src={PyramidImage.src}
            alt='Pyramid Decoration'
            height={262}
            width={262}
            className='max-md:hidden absolute -right-36 -top-32'
            style={{ translateY: translateY }}
          />
          <motion.img
            src={TubeImage.src}
            alt='Tube Decoration'
            height={248}
            width={248}
            className='max-md:hidden absolute -left-36 bottom-20'
            style={{ translateY: translateY }}
          />
        </div>
      </div>
    </section>
  );
}

export default ProductShowCase;