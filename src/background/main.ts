import { onMessage } from 'webext-bridge'
import { Headers } from './headers'
import { Rule } from '~/types'
import { useStorageLocal } from '~/composables/useStorageLocal'

const rulesRef = useStorageLocal<Rule[]>('rules', [], { listenToStorageChanges: true })

onMessage('request-rules', () => {
  return rulesRef.value
})

onMessage('update-rules', (message) => {
  const data = message.data as any
  rulesRef.value = data
})

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
    const headers = new Headers(details.requestHeaders || [])
    const rules = rulesRef.value

    for (let i = 0; i < rules.length; i++) {
      const rule = rules[i]

      if (!rule.enabled)
        continue

      const url = rule.matcher.value

      if (!url || !details.url.includes(url))
        continue

      const ruleHeaderName = rule.action.headerName
      const ruleHeaderValue = rule.action.headerValue

      if (!ruleHeaderName)
        continue

      headers.setHeader(ruleHeaderName, ruleHeaderValue)
    }

    return {
      requestHeaders: headers.toArray(),
    }
  },
  {
    urls: ['<all_urls>'],
  },
  ['blocking', 'requestHeaders', 'extraHeaders'],
)
