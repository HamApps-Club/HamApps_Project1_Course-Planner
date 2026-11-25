/// <reference path="./.sst/platform/config.d.ts" />

// Hosting for the HamApps homepage: the built Vite site in a private S3 bucket,
// served through CloudFront at https://hamapps.dev (www.hamapps.dev redirects there).
//
//   npx sst deploy --stage production
//
// Needs CLOUDFLARE_API_TOKEN and CLOUDFLARE_DEFAULT_ACCOUNT_ID in .env (git-ignored) so SST
// can add the DNS records in Cloudflare. With `aws login`, first run:
//   eval "$(aws configure export-credentials --profile hamapps --format env)"

export default $config({
  app(input) {
    return {
      name: 'hamapps-homepage',
      home: 'aws',
      removal: input?.stage === 'production' ? 'retain' : 'remove',
      protect: input?.stage === 'production',
      providers: {
        aws: { region: 'us-east-2', ...(process.env.AWS_ACCESS_KEY_ID ? {} : { profile: 'hamapps' }) },
        cloudflare: '6.15.0',
      },
    }
  },
  async run() {
    if (!process.env.CLOUDFLARE_API_TOKEN || !process.env.CLOUDFLARE_DEFAULT_ACCOUNT_ID) {
      throw new Error('Set CLOUDFLARE_API_TOKEN and CLOUDFLARE_DEFAULT_ACCOUNT_ID in .env.')
    }
    const site = new sst.aws.StaticSite('Homepage', {
      build: { command: 'npm run build', output: 'dist' },
      // Unknown addresses show the homepage (the canonical tag in index.html tells search engines it's all
      // https://hamapps.dev/). Don't set `errorPage` here: with SST 4.17 CloudFront then fetches the error page
      // from SST's placeholder origin and visitors get a 502.
      domain: {
        name: 'hamapps.dev',
        redirects: ['www.hamapps.dev'],
        dns: sst.cloudflare.dns(),
      },
    })
    return { url: site.url }
  },
})
