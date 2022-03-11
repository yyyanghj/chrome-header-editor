import { WebRequest } from 'webextension-polyfill'
import { useStorageLocal } from '~/composables/useStorageLocal'
import { Rule } from '~/types'

const rules = useStorageLocal<Rule[]>('rules', [], { listenToStorageChanges: true })

// only on dev mode
if (import.meta.hot) {
  // @ts-expect-error for background HMR
  import('/@vite/client')
  // load latest content script
  import('./contentScriptHMR')
}

browser.runtime.onInstalled.addListener((): void => {
  // eslint-disable-next-line no-console
  console.log('Extension installed')
})

browser.webRequest.onBeforeSendHeaders.addListener(
  (details) => {
    const requestHeaders = details.requestHeaders || []
    const _rules = rules.value

    const headerNameMap: Record<string, string> = {}
    const headers = new Map<string, WebRequest.HttpHeadersItemType>()

    for (let i = 0; i < requestHeaders.length; i++) {
      const h = requestHeaders[i]
      headers.set(h.name, h)
      headerNameMap[h.name.toLowerCase()] = h.name
    }

    for (let i = 0; i < _rules.length; i++) {
      const rule = _rules[i]

      if (!rule.enabled)
        continue

      const url = rule.matcher.value

      if (!details.url.includes(url))
        continue

      const lower = rule.action.headerName.toLowerCase()
      const originName = headerNameMap[lower]
      if (originName) {
        const origin = headers.get(originName)!
        origin.value = rule.action.headerValue
      }
      else {
        headers.set(rule.action.headerName, {
          name: rule.action.headerName,
          value: rule.action.headerValue,
        })
      }
    }

    return {
      requestHeaders: Array.from(headers.values()),
    }
  },
  {
    urls: ['<all_urls>'],
  },
  ['blocking', 'requestHeaders', 'extraHeaders'],
)
