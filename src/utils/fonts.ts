import { Roboto, Inter } from 'next/font/google';

export const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '800', '900'],
  variable: '--font-inter',
  preload: false,
});

export const roboto = Roboto({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  style: ['italic', 'normal'],
  variable: '--font-roboto',
  preload: false,
});
