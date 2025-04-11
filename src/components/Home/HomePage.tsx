import React from 'react'
import Banner from '../Banner/Banner'
import FeatureSection from './FeatureSection/FeatureSection'
import NewArrivals from './NewArrivals/NewArrivals'
import PaymentOption from './PaymentOption/PaymentOption'
import WomenCollection from './WomenCollection/WomenCollection'
import MenCollection from './MenCollection/MenCollection'
import KidsCollection from './KidsCollection/KidsCollection'
import Faq from './Faq/Faq'

const HomePage = () => {
  return (
    <div>
      <Banner />
      <div className='container mx-auto'>
        <FeatureSection />
      </div>
      <div>
        <header className="mb-6 text-center">
          <h2 className="text-3xl font-semibold tracking-wider text-gray-800 uppercase">
            New Arrivals
          </h2>
          <div className="w-20 h-[4px] rounded-2xl bg-red-500 mx-auto mt-1 mb-2"></div>
        </header>
        <div className='container mx-auto px-4 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4'>
          <NewArrivals _id={''} name={''} price={''} description={''} category={''} subCategory={''} images={[]} colors={''} sizes={[]} />
        </div>
      </div>
      <div>
        <WomenCollection />
      </div>
      <div>
        <MenCollection />
      </div>
      <div>
        <KidsCollection />
      </div>
      <div>
        <Faq />
      </div>
      <div>
        <PaymentOption />
      </div>
    </div>
  )
}
export default HomePage

