export const formatDate = (date) => {
  if (!date) return;

  const dateOnly = date.split("T").shift();

  const y = dateOnly.split("-")[0];
  const m = dateOnly.split("-")[1];
  const d = dateOnly.split("-")[2];

  return `${d}.${m}.${y}`;
};
