// nodebb-plugin-amazon-affiliate
// Converts Amazon links to affiliate links in posts

const plugin = {
  name: 'Amazon Affiliate',
  version: '1.0.0',
  description: 'Converts Amazon links to affiliate links in posts.',
  init: async function() {
    // Get the Amazon affiliate tag
    const affiliateTag = await this.config('amazon.affiliateTag');

    // Register a hook to convert Amazon links in posts
    this.hooks.register('render:post', async function(post) {
      // Regex to match Amazon links
      const amazonLinkRegex = /(https?:\/\/[a-z]+\.amazon\.com\/[^\s]+)/g;

      // Replace all Amazon links in the post with affiliate links
      post.content = post.content.replace(amazonLinkRegex, `https://www.amazon.com/${affiliateTag}/$1`);
    });
  }
};

module.exports = plugin;
