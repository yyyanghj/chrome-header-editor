import { WebRequest } from 'webextension-polyfill'

export class Headers {
  lowerNameMap = new Map<string, string>()

  headers = new Map<string, WebRequest.HttpHeadersItemType>()

  constructor(requestHeaders: WebRequest.HttpHeaders) {
    for (let i = 0; i < requestHeaders.length; i++) {
      const h = requestHeaders[i]
      this.headers.set(h.name, h)
      this.lowerNameMap.set(h.name.toLowerCase(), h.name)
    }
  }

  setHeader(name: string, value: string) {
    const lowerCaseName = name.toLowerCase()

    if (this.lowerNameMap.has(lowerCaseName)) {
      const header = this.headers.get(this.lowerNameMap.get(lowerCaseName)!)!
      header.value = value
    }
    else {
      this.headers.set(name, {
        name,
        value,
      })
      this.lowerNameMap.set(lowerCaseName, name)
    }
  }

  toArray() {
    return Array.from(this.headers.values())
  }
}
