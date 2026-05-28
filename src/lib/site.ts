function readSiteUrl(): string {
  const env = process.env.NEXT_PUBLIC_SITE_URL;
  if (env && !/localhost|127\.0\.0\.1/.test(env)) return env.replace(/\/$/, '');
  if (process.env.NODE_ENV === 'development') return 'http://localhost:3000';
  return 'https://temitopesaliu.vercel.app';
}

export const SITE_URL = readSiteUrl();
export const SITE_DISPLAY = SITE_URL.replace(/^https?:\/\//, '');
