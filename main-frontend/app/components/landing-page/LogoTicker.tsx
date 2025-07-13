'use client';
import React from 'react'
import AcmeLogo from '@/app/assets/logo-acme.png';
import Image from 'next/image';
import { motion } from 'framer-motion'

const LogoTicker = () => {
  return (
    <section className='py-8 md:py-12 bg-white'>
      <div className="flex items-center justify-center">
        <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black,transparent)]">
          <motion.div
            className="flex gap-14 flex-none pr-14"
            animate={{
              translateX: '-50%'
            }}
            transition={{
              duration: 20,
              repeat:Infinity,
              ease:'linear',
              repeatType:'loop'
            }}
          >
            <Image className='logo-ticker-Image' src={AcmeLogo} alt='Logo' />
            <Image className='logo-ticker-Image' src={AcmeLogo} alt='Logo' />
            <Image className='logo-ticker-Image' src={AcmeLogo} alt='Logo' />
            <Image className='logo-ticker-Image' src={AcmeLogo} alt='Logo' />
            <Image className='logo-ticker-Image' src={AcmeLogo} alt='Logo' />
            <Image className='logo-ticker-Image' src={AcmeLogo} alt='Logo' />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default LogoTicker