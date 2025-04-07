import Cookies from 'js-cookie';

export const clientAuth = {
    setToken(token: string) {
        Cookies.set('auth_token', token, {
            expires: 1,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax'
        });
    },

    logout() {
        Cookies.remove('auth_token');
        window.location.href = '/login';
    }
};