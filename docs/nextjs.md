https://maxschmitt.me/posts/next-js-cookies/
https://maxschmitt.me/posts/next-js-http-only-cookie-auth-tokens/
https://dev.to/debosthefirst/how-to-use-cookies-for-persisting-users-in-nextjs-4617
https://www.npmjs.com/package/next-session
https://nextjs.org/docs/authentication

```
import Cookies from 'cookies'
Homepage.getInitialProps = ({ req, res }) => {
    // Create a cookies instance
    const cookies = new Cookies(req, res)
    // Get a cookie
    cookies.get('myCookieName')
    // Set a cookie
    cookies.set('myCookieName', 'some-value', {
        httpOnly: true // true by default
    })
    // Delete a cookie
    cookies.set('myCookieName')
}

```