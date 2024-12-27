// --- isToday()
/**
 * Questa funzione serve per capire se una data in formato number
 * corrisponde alla data di oggi.
 *
 * @param date number - Data in formato number
 * @returns boolean - TRUE: si è oggi - FALSE: è un altro giorno
 */
export function isToday(date: number): boolean {
  const today = new Date();
  const notificationDate = new Date(date);
  return (
    notificationDate.getDate() === today.getDate() &&
    notificationDate.getMonth() === today.getMonth() &&
    notificationDate.getFullYear() === today.getFullYear()
  );
}
