import { useEffect, useState } from 'react';
import { FC, ComponentType } from 'react';
import useAdmin from '@/hooks/useAdmin';
import { useRouter } from 'next/navigation';
import { Loader } from '../Loader/Loader';

interface WithAdminAuthProps {
    [key: string]: unknown;
}

const withAdminAuth = <P extends WithAdminAuthProps>(WrappedComponent: ComponentType<P>): FC<P> => {
    const ComponentWithAdminAuth: FC<P> = (props) => {
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
            return <div className='flex h-screen justify-center items-center'><Loader /></div>
        }

        return admin ? <WrappedComponent {...props} /> : null;
    };

    return ComponentWithAdminAuth;
};

export default withAdminAuth;