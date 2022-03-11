export type Action = {
  type: 'append' | 'replace' | 'remove'
  headerName: string
  headerValue: string
}

export type Rule = {
  id: string
  name: string
  matcher: {
    type: 'regexp' | 'include' | '*'
    value: string
  }
  action: Action
  enabled: boolean
}
