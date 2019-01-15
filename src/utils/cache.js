import {en} from './en.json'
import {cn} from './cn.json'

 class Cache {
   constructor() {
    
    this.lang = {
        'US': en,
        'CN': cn,
    }
    this.locale = 'US'
   }
  getLang(code) {
      if (!code)
          return "";
      // this.locale has a lot of variation like 'ko_US', thus take first 2 language code
      var langPack = this.lang[this.locale.substring(0, 2)];
      if (!langPack) langPack = this.lang['US']
      return langPack[code]
  }

  getLangCode() {
      return this.locale.substring(0, 2)
  }
 }
 
 export default new Cache();