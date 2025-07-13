'use client';
import React, { useRef } from 'react';
import Arrow from '@/app/assets/arrow-right.svg';
import StarImage from '@/app/assets/star.png';
import SpringImage from '@/app/assets/spring.png';
import { motion, useScroll, useTransform } from 'framer-motion';

const CallToAction = () => {
  const callActionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: callActionRef,
    offset: ['start end', 'end start']
  });

  const translateY = useTransform(scrollYProgress, [0, 1], [150, -150]);

  return (
    <section 
      ref={callActionRef} 
      className="bg-gradient-to-b from-white to-[#D2DCFF] py-24 overflow-x-clip"
      aria-labelledby="cta-heading"
    >
      <div className="px-5">
        <div className="max-w-[700px] mx-auto relative">
          <h2 id="cta-heading" className="section-title">
            Download Staar AI Today
          </h2>

          <p className="section-description mt-5">
            Get Staar AI for free and let it work with your flow—enhancing code, files, and tasks right on your desktop.
          </p>

          <motion.img
            src={StarImage.src}
            alt="Star decoration"
            width={360}
            className="absolute -left-[350px] -top-[137px] 2xl:-left-[460px]"
            style={{ translateY: translateY }}
            aria-hidden="true"
          />
          <motion.img
            src={SpringImage.src}
            alt="Spring decoration"
            width={360}
            className="absolute -right-[331px] 2xl:-right-[385px] -top-[19px]"
            style={{ translateY: translateY }}
            aria-hidden="true"
          />
        </div>

        <div className="flex gap-2 mt-10 justify-center">
          <button className="btn btn-primary" aria-label="Download Staar AI for free">
            Download Now
          </button>
          <button 
            className="btn btn-text flex gap-2 items-center"
            aria-label="Learn more about Staar AI features"
          >
            <span>Discover Features</span>
            <Arrow className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;