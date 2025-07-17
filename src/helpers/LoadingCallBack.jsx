import { useEffect } from 'react'
import { useNavigate } from 'react-router';
import { urls } from '../routes';
import { useAuthValidator } from '../store';
export const LoadingCallBack = () => {
    const { isAuthenticate } = useAuthValidator((state) => state.isAuthenticate);

    const navigate = useNavigate()
    useEffect(() => {
        if (isAuthenticate) {
            navigate(urls.BASE_URL)
        } else {
            navigate(urls.LOGIN)
        }
    }, [])
    return null
}