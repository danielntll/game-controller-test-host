/**
 * Converte un valore di evento di selezione data in una stringa.
 *
 * Questa funzione gestisce i diversi formati di ritorno dell'evento di selezione data
 * e restituisce sempre una stringa.
 *
 * @param eventDetailValue Il valore dell'evento di selezione data.
 * Può essere una stringa, un array di stringhe, undefined o null.
 *
 * @returns Una stringa che rappresenta la data selezionata.
 * Se l'evento è un array, restituisce il primo elemento dell'array.
 * Se l'evento è undefined o null, restituisce una stringa vuota.
 *
 * @example
 * ```typescript
 * const dateString = dateConvertPicketToString("2023-12-25"); // "2023-12-25"
 * const dateStringFromArray = dateConvertPicketToString(["2023-12-25", "2023-12-26"]); // "2023-12-25"
 * const dateStringFromUndefined = dateConvertPicketToString(undefined); // ""
 * ```
 */
export const dateConvertPicketToString = (
  eventDetailValue: string | string[] | undefined | null
) => {
  return Array.isArray(eventDetailValue)
    ? eventDetailValue[0]
    : eventDetailValue || "";
};
