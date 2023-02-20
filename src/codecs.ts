import * as T from "io-ts";

export const definitionsCodec = T.type({
  antonyms: T.array(T.string),
  synonyms: T.array(T.string),
  definition: T.string,
});

export const itemCodec = T.type({
  antonyms: T.array(T.string),
  synonyms: T.array(T.string),
  partOfSpeech: T.string,
  definitions: T.array(definitionsCodec),
});

export type Item = T.TypeOf<typeof itemCodec>;

export const responseCodec = T.array(itemCodec);