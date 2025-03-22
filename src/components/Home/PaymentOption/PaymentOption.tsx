import { Bus, Lock, Smile } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const PaymentOption = () => {
    return (
        <div className='bg-[#F3F3F3]'>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-gray-100 rounded-lg">
                {/* Secure Payment Methods */}
                <div className="flex flex-col items-center text-center p-4 shadow-lg rounded-lg bg-white">
                    <span className="text-2xl mb-2"><Lock /></span>
                    <h3 className="text-lg font-semibold">All Secure Payment Methods</h3>
                    <div className="flex flex-wrap justify-center mt-3 gap-2">
                        {/* Payment Icons */}
                        <Image src={'https://fabrilife.com/img/sslcommerz.png'} height={200} width={200} alt='Ten Rush' />
                    </div>
                </div>

                {/* Satisfaction Guaranteed */}
                <div className="flex flex-col items-center text-center p-4 shadow-lg rounded-lg bg-white">
                    <span className="text-2xl mb-2"><Smile /></span>
                    <h3 className="text-lg font-semibold mb-3">Satisfaction Guaranteed</h3>
                    <p className="text-gray-600 text-sm">Made with premium quality materials. <br /> <span className='font-bold'>Cozy yet lasts the test of time.</span></p>
                </div>

                {/* Worldwide Delivery */}
                <div className="flex flex-col items-center text-center p-4 shadow-lg rounded-lg bg-white">
                    <span className="text-2xl mb-2"><Bus /></span>
                    <h3 className="text-lg font-semibold mb-3">Worldwide Delivery</h3>
                    <div className="">
                        <Image src={'https://fabrilife.com/img/delivery.png'} height={200} width={200} alt='Courier Company' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PaymentOption
