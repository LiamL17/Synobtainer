"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseCodec = exports.itemCodec = exports.definitionsCodec = void 0;
const T = require("io-ts");
exports.definitionsCodec = T.type({
    antonyms: T.array(T.string),
    synonyms: T.array(T.string),
    definition: T.string,
});
exports.itemCodec = T.type({
    antonyms: T.array(T.string),
    synonyms: T.array(T.string),
    partOfSpeech: T.string,
    definitions: T.array(exports.definitionsCodec),
});
exports.responseCodec = T.array(exports.itemCodec);
//# sourceMappingURL=codecs.js.map