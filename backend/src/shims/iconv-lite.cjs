"use strict";

const iconv = {};

iconv.encodingExists = function (enc) {
  try {
    new TextDecoder(enc);
    return true;
  } catch (e) {
    return false;
  }
};

iconv.decode = function (buf, encoding) {
  if (typeof buf === "string") return buf;
  const enc = (encoding || "utf-8").toLowerCase().replace(/[^a-z0-9_-]/g, "");
  try {
    const decoder = new TextDecoder(enc === "utf8" ? "utf-8" : enc);
    return decoder.decode(buf);
  } catch (e) {
    return Buffer.from(buf).toString(enc === "utf-8" || enc === "utf8" ? "utf8" : "latin1");
  }
};

iconv.encode = function (str, encoding) {
  const enc = encoding || "utf-8";
  try {
    const encoder = new TextEncoder();
    return Buffer.from(encoder.encode(str));
  } catch (e) {
    return Buffer.from(str, enc);
  }
};

iconv.getDecoder = function (encoding) {
  const enc = (encoding || "utf-8").toLowerCase().replace(/[^a-z0-9_-]/g, "");
  const normalizedEnc = enc === "utf8" ? "utf-8" : enc;
  let decoder;
  try {
    decoder = new TextDecoder(normalizedEnc);
  } catch (e) {
    decoder = new TextDecoder("utf-8");
  }

  return {
    write: function (buf) {
      if (typeof buf === "string") return buf;
      return decoder.decode(buf, { stream: true });
    },
    end: function () {
      return decoder.decode();
    },
  };
};

iconv.getEncoder = function (encoding) {
  const enc = encoding || "utf-8";
  return {
    write: function (str) {
      return Buffer.from(str, enc);
    },
    end: function () {
      return Buffer.alloc(0);
    },
  };
};

module.exports = iconv;
