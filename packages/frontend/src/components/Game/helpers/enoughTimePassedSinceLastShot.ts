export const enoughTimePassedSinceLastShot: (
  fireRatePerSecond: number,
  lastTimePlayerShot: number
) => boolean = (fireRatePerSecond, lastTimePlayerShot) => {
  const timeForOneShot = 1000 / fireRatePerSecond;
  return timeForOneShot < Date.now() - lastTimePlayerShot;
};
