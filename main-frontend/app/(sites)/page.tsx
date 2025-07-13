import React from 'react'
import { Footer, Header } from '../components/common'
import { CallToAction, Hero, LogoTicker, ProductShowCase } from '../components/landing-page'

const Home =() => {

  return (
    <main id='home'>
      <Header />
      <Hero />
      <LogoTicker />
      <ProductShowCase />
      {/* <Pricing />
      <Testimonials /> */}
      <CallToAction />
      <Footer />
    </main>
  )
}

export default Home