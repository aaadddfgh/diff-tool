//@ts-ignore
import LangZHCN from '../i18n/lang/zh-cn.json'
//@ts-ignore
import LangEN from '../i18n/lang/en.json'


import { createI18n } from "vue-i18n";

const i18n =createI18n({
    legacy:false,
    allowComposition:true,
    locale:"zh-CN",
    fallbackLocale: 'zh-CN',
    messages:{
        'zh-CN':{...LangZHCN},
        'en':{...LangEN}
    }
})



export default i18n
