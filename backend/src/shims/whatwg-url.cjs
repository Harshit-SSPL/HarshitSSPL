"use strict";

const whatwgUrl = {
  URL: globalThis.URL,
  URLSearchParams: globalThis.URLSearchParams,
};

module.exports = whatwgUrl;
module.exports.default = whatwgUrl;
module.exports.URL = globalThis.URL;
module.exports.URLSearchParams = globalThis.URLSearchParams;
