const { Plugin } = require('nodebb-plugin');

module.exports = class AmazonAffiliateLinksPlugin extends Plugin {
  constructor() {
    super();

    this.affiliateTag = 'oppo-20'; // Replace this with your Amazon affiliate tag
  }

  async init() {
    const hook = 'filter:post.content';

    this.app.filter(hook, async (content) => {
      // Find all Amazon links in the post content
      const amazonLinks = content.match(/https?:\/\/([a-z]+\.)?amazon\.com\/[a-zA-Z0-9]+/g);

      // Convert each Amazon link to an affiliate link
      amazonLinks.forEach((link) => {
        content = content.replace(link, `${link}?tag=${this.affiliateTag}`);
      });

      return content;
    });
  }
}
