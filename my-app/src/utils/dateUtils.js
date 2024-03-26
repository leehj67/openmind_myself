export const getTimeDifference = createdDate => {
  createdDate = new Date(createdDate);
  const currentDate = new Date();

  const differenceInSeconds = Math.floor((currentDate - createdDate) / 1000);
  const secondsInMinute = 60;
  const secondsInHour = 3600;
  const secondsInDay = 86400;
  const secondsInWeek = 604800;
  const secondsInMonth = 2592000;
  const secondsInYear = 31536000;

  if (differenceInSeconds < secondsInMinute) {
    return '1분전';
  }
  if (differenceInSeconds <= secondsInHour) {
    const minutes = Math.floor(differenceInSeconds / secondsInMinute);
    return `${minutes}분전`;
  }
  if (differenceInSeconds < secondsInDay) {
    const hours = Math.floor(differenceInSeconds / secondsInHour);
    return `${hours}시간전`;
  }
  if (differenceInSeconds < secondsInMonth) {
    const days = Math.floor(differenceInSeconds / secondsInDay);
    return `${days}일전`;
  }
  if (differenceInSeconds < secondsInWeek) {
    const days = Math.floor(differenceInSeconds / secondsInWeek);
    return `${days}주전`;
  }
  if (differenceInSeconds < secondsInYear) {
    const months = Math.floor(differenceInSeconds / secondsInMonth);
    return `${months}달전`;
  }
  const years = Math.floor(differenceInSeconds / secondsInYear);
  const remainingMonths = Math.floor(
    (differenceInSeconds % secondsInYear) / secondsInMonth,
  );
  if (remainingMonths > 0) {
    return `${years}년전`;
  }
  return `${years}년전`;
};
