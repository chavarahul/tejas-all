'use client';
import { pricingTiers } from '@/app/constants/data';
import { PricingProps } from '@/app/constants/type';
import React from 'react';
import CheckIcon from '@/app/assets/check.svg';
import { twMerge } from 'tailwind-merge';
import { motion } from 'framer-motion';

const Pricing = () => {
  return (
    <section className='py-24 bg-white' id='pricing'>
      <div className="px-5">
        <div className="max-w-[540px] mx-auto text-center">
          <h2 className="section-title">Our Pricing Plans</h2>
          <p className="section-description mt-5">
            Choose the plan that fits your needs. Start for free, and upgrade for more features and unlimited access.
          </p>
        </div>
        <div className="flex flex-col gap-6 items-center mt-10 lg:flex-row lg:items-end lg:justify-center lg:gap-20">
          {pricingTiers.map((item: PricingProps, index: number) => (
            <div 
              className={twMerge(`card`, 
                item.inverse && 'border-black bg-black text-white'
              )}
              key={index}
            >
              <div className="flex justify-between">
                <h3 className={twMerge('text-lg font-bold text-black/50', item.inverse && 'text-white/60')}>
                  {item.title}
                </h3>
                {item.popular && (
                  <div className="inline-flex text-sm px-4 py-1.5 rounded-xl border border-white/20">
                    <motion.span
                      className='bg-[linear-gradient(to_right,#DD7DDF,#E1CD86,#BBCB92,#71C2EF,#3BFFFF,#DD7DDF,#E1CD86,#BBCB92,#71C2EF,#3BFFFF,#DD7DDF)] [background-size:200%] text-transparent bg-clip-text font-medium'
                      animate={{ backgroundPositionX: '100%' }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                        repeatType: 'loop'
                      }}
                    >
                      Popular
                    </motion.span>
                  </div>
                )}
              </div>
              <div className="flex items-baseline gap-1 mt-[30px]">
                <span className='text-4xl font-bold tracking-tighter leading-none'>${item.monthlyPrice}</span>
                <span className={twMerge('tracking-tighter font-bold text-black/50', item.inverse && 'text-white')}>/month</span>
              </div>
              <button className={twMerge('btn btn-primary w-full mt-[30px]', item.inverse && 'btn-color')}>
                {item.buttonText}
              </button>
              <ul className='flex flex-col gap-5 mt-8'>
                {item.features.map((feature, index: number) => (
                  <li key={index} className='text-sm flex items-center gap-4'>
                    <CheckIcon className="h-6 w-6" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
