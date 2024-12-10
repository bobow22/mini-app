export function convertDate(isoDate: any) {
  const date = new Date(isoDate); // Convert ISO string to Date object
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
  const day = String(date.getDate()).padStart(2, '0'); // Day of the month
  return `${year}-${month}-${day}`; // Format as yyyy-MM-dd
}

export function compareDates(date1: Date, date2: string) {
  // Convert the date strings into Date objects
  const d1 = new Date(date1);
  const d2 = new Date(date2);

  // Compare the timestamps (milliseconds since the Unix epoch)
  if (d1.getTime() < d2.getTime()) {
    return 1;
  } else if (d1.getTime() > d2.getTime()) {
    return -1;
  } else {
    return 0;
  }
}
