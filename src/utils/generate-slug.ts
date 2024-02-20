export function generateSlug(ctn: string) {
  return ctn.toLowerCase().replace(' ', '-').replace('!', '').replace('.', '')
}
