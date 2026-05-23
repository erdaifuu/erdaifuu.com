// next.config.js
module.exports = {
  async redirects() {
    return [
      {
        source: '/blog',
        destination: 'https://erdaifuu.substack.com',
        permanent: true,
      },
      {
        source: '/blog/:slug',
        destination: 'https://erdaifuu.substack.com',
        permanent: true,
      },
    ]
  },
  // ... your other config
  output: 'standalone', // For Next.js 12.2.x and later
  // experimental: { outputStandalone: true, }, // For Next.js 12.1.x and earlier
}
