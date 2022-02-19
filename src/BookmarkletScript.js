/**
 * Parse and compress/mangle a Bookmarklet Javascript file.
 *
 * @copyright © Nick Freear, 31-Jan-2022.
 */

// import { minify } from 'https://unpkg.com/terser@5.10.0/main.js';

import { terserViaCdn } from './external-cdn.js';

export class BookmarkletScript {
  constructor () {
    this.$$ = {};
  }

  async parse (rawScript) {
    this.$$.rawScript = rawScript;

    this.$$.minScript = await this._minify(rawScript);
    this.$$.displayScript = await this._beautify(rawScript);
    this.$$.metaData = await this._getMetaData();

    return this.$$;
  }

  get scriptLink () {
    return 'javascript:' + this.$$.minScript;
  }

  /** Wrap in an Immediately-invoked function (IIFE)
  */
  _anonymize (code) {
    return `(()=>{${code}})()`;
  }

  async _minify (rawScript) {
    const Terser = await terserViaCdn();
    const RES = await Terser.minify(rawScript, {
      sourceMap: false,
      compress: {
        // expression: true,
        // side_effects: false,
      },
      mangle: true,
      ecma: 2016,
      format: {
        comments: false
        // wrap_iife: true, // Immediately-invoked functions (IIFE)
      }
    });
    return this._anonymize(RES.code);
  }

  async _beautify (rawScript) {
    const Terser = await terserViaCdn();
    const RES = await Terser.minify(rawScript, {
      sourceMap: false,
      compress: false,
      mangle: false,
      ecma: 2016,
      format: {
        beautify: true, // Legacy.
        braces: true,
        comments: false,
        indent_level: 2
      }
    });
    return RES.code;
  }

  async _getMetaData () {
    const KEYS = ['name', 'author', 'desc', 'license', 'see', 'version'];
    const metaData = {};

    KEYS.forEach(key => { metaData[key] = this._at(key); });

    return metaData;
  }

  _at (key, def = null) {
    const REGEX = new RegExp(`\\* \\@${key} (.+)`);
    const matches = this.$$.rawScript.match(REGEX);

    return matches ? matches[1] : def;
  }

  /** @DEPRECATED
  */
  _stripComments (script) {
    const RES = script.match(/\/\*\*.+\*\/\n{0,}/ms);
    console.debug('Regex:', RES);

    return script.replace(/\/\*\*.+\*\/\n{0,}/msg, '');
  }

  _stripNewlinesSpaces (script) {
    return script.replace(/\n/g, '').replace(/[ ]{2,}/g, ' ');
  }
}
