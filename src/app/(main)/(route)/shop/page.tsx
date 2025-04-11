import { Suspense } from 'react';
import ShopContent from '@/components/Shop/ShopPageContent/ShopContent';

const ShopPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ShopContent />
    </Suspense>
  );
};

export default ShopPage;