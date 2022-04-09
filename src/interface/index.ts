export interface CollectInfoOptions {
  target: 'styles' | 'utils' | 'cli'
  commandOptions: {
    clone: boolean
  }
  replaceData: {
    name: string
    description?: string
    [key: string]: unknown
  }
}
