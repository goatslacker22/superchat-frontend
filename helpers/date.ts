export const convertDate = (dateString: string) => {
  const date = new Date(dateString);
  const day = date.getDay();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${year}:${month < 10 ? `0` + month : month}:${
    day < 10 ? '0' + day : day
  }`;
};
