const getDate = ({
  dayOffset = 0,
  date = new Date(),
}: {
  dayOffset?: number;
  date?: Date;
}): string => {
  date.setDate(date.getDate() + dayOffset);

  const isoString = date.toISOString();

  return isoString.split("T")[0];
};

export default getDate;
