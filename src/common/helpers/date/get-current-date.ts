export default function getCurrentDate(): Date {
  let auxDate = new Date();
  return new Date(auxDate.getFullYear(), auxDate.getMonth(), auxDate.getDate());
}
