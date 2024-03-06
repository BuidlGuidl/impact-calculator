export const abbreviateNumber = (num: number) => {
  if (num >= 1000000) {
    return Number((num / 1000000).toFixed(2)) + "m";
  }
  if (num >= 1000) {
    return Math.round(num / 1000) + "k";
  } else {
    return num.toString();
  }
};
