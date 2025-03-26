"use client"
import { FC, ComponentType, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader } from '../Loader/Loader';
import useAdmin from '@/hooks/useAdmin';

// Empty interface - don't add any specific props here
type WithAdminAuthProps = object;

const withAdminAuth = <P extends object>(WrappedComponent: ComponentType<P>): FC<P & WithAdminAuthProps> => {
  const ComponentWithAdminAuth: FC<P & WithAdminAuthProps> = (props) => {
    const admin = useAdmin();
    const router = useRouter();
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);

    useEffect(() => {
      if (admin !== undefined) {
        setIsCheckingAuth(false);
        if (admin === false) {
          router.push('/access-denied');
        }
      }
    }, [admin, router]);

    if (isCheckingAuth) {
      return (
        <div className='flex h-screen justify-center items-center'>
          <Loader />
        </div>
      );
    }

    return admin ? <WrappedComponent {...props as P} /> : null;
  };

  // Set display name for debugging
  ComponentWithAdminAuth.displayName = `withAdminAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return ComponentWithAdminAuth;
};

export default withAdminAuth;