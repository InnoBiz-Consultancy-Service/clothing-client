import React from 'react';

const cartPage = () => {
      const [cartData, setCartData] = useState<CartItem[]>([]);
    
      useEffect(() => {
        axios.get("cartData.json").then((res) => setCartData(res.data));
      }, []);
    return (
        <div>
            
        </div>
    );
};

export default cartPage;