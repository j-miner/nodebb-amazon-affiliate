(function(module) {
    "use strict";

    // domain used to attempt to isolate errors to just the plugin
    var domain = require('domain'),
        d = domain.create();

    d.on('error', function(err) {
        console.error('nodebb-plugin-amazon-affiliate error: ' + err);
    });

    d.run(function () {
        var url = module.parent.require('url'), // https://nodejs.org/api/url.html
            Entities = module.parent.require('html-entities').Html5Entities, // https://www.npmjs.com/package/html-entities
            entities = new Entities(),
            AmazonAffiliate = {},
            affiliateCode = 'oppositelock-20';

        module.exports = AmazonAffiliate;

        // common replacement code
        AmazonAffiliate.replaceAmazonLinks = function(fromText) {
            var link_rewrite = function (match, p1, offset, search_string) {
                    var parsed_matched_url = url.parse(entities.decode(p1), true, true),
                        match1_len = p1.length,
                        p1_match_offset = match.indexOf(p1);
                    parsed_matched_url.query['tag']= affiliateCode;
                    parsed_matched_url.search = undefined; // required to get "url" module to use the "query" dict instead of the "search" string

                    // glue the new html entitized URL inside matchdaviwort05
                    return match.substring(0, p1_match_offset) + entities.encode(url.format(parsed_matched_url)) + match.substring(p1_match_offset + match1_len);
                };

            return fromText.replace(/<a href="((?:https?:\/\/)?(?:www\.)?amazon\.com\/[^"]*)".*>.+<\/a>/ig, link_rewrite);
        };

        // for posts
        AmazonAffiliate.parse = function(data, callback) {
            if (data.hasOwnProperty('postData')) {
                data.postData.content = AmazonAffiliate.replaceAmazonLinks(data.postData.content);
            } else if (data.hasOwnProperty('userData') && data.userData.hasOwnProperty('signature')) {
                data.userData.signature = AmazonAffiliate.replaceAmazonLinks(data.userData.signature);
            } else if (data.hasOwnProperty('parsedMessage')) {
                data.parsedMessage = AmazonAffiliate.replaceAmazonLinks(data.parsedMessage);
            }

            callback(null, data);
        };
    });

}(module));
