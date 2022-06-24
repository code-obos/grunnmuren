const opts = {};

// Fixes font loading for GH pages where the site path is {org}.github.io/{repo}
if (process.env.GITHUB_ACTION) {
  opts.fontBasePath = '/grunnmuren/fonts';
}

module.exports = {
  presets: [require('@obosbbl/grunnmuren-tailwind')(opts)],
  content: ['./src/**/*.{ts,tsx}'],
};
