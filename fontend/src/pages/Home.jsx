import React from 'react'
import Hero from '../components/Hero'
import LastestCollection from '../components/LastestCollection'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'
import NewLetterBox from '../components/NewLetterBox'
const Home = () => {
  return (
    <div>
      <Hero/>
      <LastestCollection />
      <BestSeller/>
      <OurPolicy/>
      <NewLetterBox/>
    </div>
  )
}

export default Home
