"use client"; // Add this at the top for Next.js 13+

import { useEffect, useState } from 'react';

const PaymentCancel = () => {
    const [message, setMessage] = useState('');

    useEffect(() => {
        const searchData = new URLSearchParams(window.location.search);
        setMessage(searchData.get("message"));
    }, []);

    return (
        <div className="my-20 text-center font-bold text-5xl text-red-400">
            <h1>
                Payment Cancel {message}
            </h1>
        </div>
    );
};

export default PaymentCancel;