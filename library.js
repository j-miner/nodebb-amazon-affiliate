const nodebb = require('nodebb');

const plugin = nodebb.plugin();

plugin.init = function() {
  // Register a post filter to convert Amazon links to affiliate links.
  nodebb.filters.register('prePostRender', function(post) {
    // Find all Amazon links in the post content.
    const amazonLinks = post.content.match(/https:\/\/www\.amazon\.(com|co\.uk|de|fr|es|it|jp|ca|cn|in)\/dp\/([A-Z0-9]+)/g);

    // Convert each Amazon link to an affiliate link.
    amazonLinks.forEach(amazonLink => {
      const affiliateLink = `https://affiliate-link.com/${amazonLink.split('/')[3]}`;
      post.content = post.content.replace(amazonLink, affiliateLink);
    });

    return post;
  });
};

module.exports = plugin;
