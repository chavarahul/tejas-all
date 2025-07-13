'use client';
import { testimonials } from '@/app/constants/data'
import { TestimonialsProps } from '@/app/constants/type';
import Image from 'next/image';
import React from 'react'
import { motion } from 'framer-motion';

const TestimonialCard = ({ column, className, duration }: {
  column: TestimonialsProps[],
  className?: string,
  duration?: number
}) => {
  return (
    <div className={className}>
      <motion.div
        className={"flex flex-col gap-6 pb-6"}
        animate={{ translateY: '-50%' }}
        transition={{
          duration: duration || 10,
          repeatType: 'loop',
          repeat: Infinity,
          ease: 'linear'
        }}
      >
        {[...new Array(2)].fill(0).map((_, index: number) => (
          <React.Fragment key={index}>
            {column.map((testimonial: TestimonialsProps, index: number) => (
              <div className="card" key={index}>
                <div className="">{testimonial.text}</div>
                <div className="flex items-center gap-2 mt-5">
                  <Image
                    src={testimonial.imageSrc}
                    alt={testimonial.name}
                    width={40}
                    height={40}
                    className='h-10 w-10 rounded-full'
                  />
                  <div className="">
                    <div className="font-medium">{testimonial.name}</div>
                    <div className="text-sm">{testimonial.username}</div>
                  </div>
                </div>
              </div>
            ))}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  )
}

const Testimonials = () => {

  const firstColumn = testimonials.slice(0, 3);
  const secondColumn = testimonials.slice(3, 6);
  const thirdColumn = testimonials.slice(6, 9);

  return (
    <section className='bg-white py-0'>
      <div className="px-5">
        <div className="mx-auto max-w-[540px]">
          <div className="flex justify-center">
            <div className="tag">User Reviews</div>
          </div>
          <h2 className='section-title mt-5'>What Our Users Say</h2>
          <p className='section-description mt-5'>
            Hear how our free and premium models are empowering users to achieve more.
          </p>
        </div>
        <div className="flex justify-center mt-10 gap-6 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[738px] overflow-hidden">
          <TestimonialCard
            column={firstColumn}
            duration={15}
          />
          <TestimonialCard
            column={secondColumn}
            className='hidden md:block'
            duration={19}
          />
          <TestimonialCard
            column={thirdColumn}
            className='hidden lg:block'
            duration={17}
          />
        </div>
      </div>
    </section>
  )
}

export default Testimonials;
