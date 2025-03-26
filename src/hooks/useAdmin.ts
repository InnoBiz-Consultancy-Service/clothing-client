"use client"
import getUsers from '@/apiAction/getUsers';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react'


// Check admin user email is admin or not
const useAdmin = () => {
    const { data: session } = useSession();
    const [admin, setAdmin] = useState<boolean>();

    const email = session?.user?.email;
    useEffect(() => {
        const checkAdmin = async () => {
            const response = await getUsers({ admin: `/users/check-admin?email=${email}` })
            const check = response.isAdmin;
            setAdmin(check)
        }
        checkAdmin();
    }, [email])
    return admin

}

export default useAdmin