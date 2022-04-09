export interface CollectInfoOptions {
  target: 'styles' | 'utils'
  commandOptions: {
    clone: boolean
  }
  replaceData: {
    name: string
    description?: string
    [key: string]: unknown
  }
}
