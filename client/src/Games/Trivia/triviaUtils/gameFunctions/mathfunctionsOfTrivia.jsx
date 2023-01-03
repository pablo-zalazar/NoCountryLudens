// export const randomNumber = ({ items }) => {
//   const itemsLength = items.length;
//   return Math.floor(Math.random() * itemsLength);
// };

export const progressPercentage = ({ progressTime, totalTime }) => {
  const percentage = (progressTime * 100) / totalTime;
  return percentage;
};

export const convertMillisecondsToMinutesAndSeconds = ({ milliseconds }) => {
  const seconds = Math.round((milliseconds / 1000) % 60)
    .toString()
    .padStart(2, 0);
  const minutes = parseInt(milliseconds / 1000 / 60)
    .toString()
    .padStart(2, 0);
  return { minutes, seconds };
};
