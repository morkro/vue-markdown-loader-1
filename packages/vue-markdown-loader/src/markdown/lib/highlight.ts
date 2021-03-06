import prism from 'prismjs'
import loadLanguages from 'prismjs/components/index'
import escapeHtml from 'escape-html'
import chalk from 'chalk'
import { logger } from '../../utils'

// required to make embedded highlighting work...
loadLanguages(['markup', 'css', 'javascript'])

function wrap(code, lang) {
  if (lang === 'text') {
    code = escapeHtml(code)
  }
  return `<pre v-pre class="language-${lang}"><code>${code}</code></pre>`
}

export default (str, lang) => {
  if (!lang) {
    return wrap(str, 'text')
  }
  lang = lang.toLowerCase()
  const rawLang = lang
  if (lang === 'vue' || lang === 'html') {
    lang = 'markup'
  }
  if (lang === 'md') {
    lang = 'markdown'
  }
  if (lang === 'rb') {
    lang = 'ruby'
  }
  if (lang === 'ts') {
    lang = 'typescript'
  }
  if (lang === 'py') {
    lang = 'python'
  }
  if (lang === 'sh') {
    lang = 'bash'
  }
  if (lang === 'yml') {
    lang = 'yaml'
  }
  if (lang === 'styl') {
    lang = 'stylus'
  }

  if (!prism.languages[lang]) {
    try {
      loadLanguages([lang])
    } catch (e) {
      logger.warn(chalk.yellow(`[vuepress] Syntax highlight for language "${lang}" is not supported.`))
    }
  }
  if (prism.languages[lang]) {
    const code = prism.highlight(str, prism.languages[lang], lang)
    return wrap(code, rawLang)
  }
  return wrap(str, 'text')
}
