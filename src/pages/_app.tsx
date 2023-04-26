import '@/styles/globals.scss';
import 'material-symbols';
import { config as fontAwesomeConfig } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';

import { roboto, inter } from '@/utils/fonts';
import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';

fontAwesomeConfig.autoAddCss = false;

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  // Use layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <div className={`${roboto.variable} ${inter.variable}`}>
      {getLayout(<Component {...pageProps} />)}
    </div>
  );
}
