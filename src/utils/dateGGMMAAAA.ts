export const dateGGMMAAAA = (timestamp: number): string => {
  let date = new Date(timestamp * 1000);
  let day = date.getDate();
  let month = date.getMonth() + 1; // I mesi in JavaScript sono 0-indexed
  let year = date.getFullYear();
  return (
    day.toString().padStart(2, "0") +
    "/" +
    month.toString().padStart(2, "0") +
    "/" +
    year.toString()
  );
};
