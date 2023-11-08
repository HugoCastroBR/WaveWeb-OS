export function formatDateToString(date: Date | undefined): string {
  if(!date) return '';
  return date.toLocaleString(); 
}