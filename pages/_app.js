import App from 'next/app';
import * as Sentry from '@sentry/node';

console.log('sentry check..',process.env.NEXT_PUBLIC_SENTRY_DSN);
if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
  console.log('sentry prod..');
  Sentry.init({
    enabled: process.env.NODE_ENV === 'production',
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN
  });
}

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <div>
        <Component {...pageProps} />
      </div>
    );
  }
}
export default MyApp;