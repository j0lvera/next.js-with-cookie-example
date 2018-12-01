import Router from 'next/router';
import cookie from 'js-cookie';
import fetch from 'isomorphic-unfetch';

export const login = async ({ username }) => {
    try {
        const url = 'https://moor-crush.glitch.me/login';
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username }),
        });

        console.log(response);

        if (response.ok) {
            const { token } = await response.json();

            cookie.set('token', token, { expires: 1 });
            Router.push('/profile');
        } else {
            console.log('Login failed');

            // https://github.com/developit/unfetch#caveats
            let error = new Error(response.statusText);
            error.response = response;
            return Promise.reject(error);
        }
    } catch (error) {
        console.error('You have an error in your code or there are Network issues.', error);
        throw new Error(error);
    }
}

export const logout = () => {
    cookie.remove('token');
    Router.push('/login');
}