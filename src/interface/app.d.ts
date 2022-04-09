declare module 'download-git-repo' {
  export default function (
    repo: string,
    dest: string,
    opts: { clone: boolean },
    fn: (error?: Error) => void
  ): void
}
