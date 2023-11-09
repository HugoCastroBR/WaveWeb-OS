export function getExtensionFromFileName(fileName: string): string {
  const match = fileName.match(/\.([0-9a-z]+)(?:[?#]|$)/i);
  if (match) {
    return match[1];
  }
  return fileName; // Retorna uma string vazia se não encontrar uma extensão.
}

export function verifyIfIsFile(fileName: string): boolean {
  return fileName.includes('.');
}