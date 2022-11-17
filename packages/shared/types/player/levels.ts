export const getExperienceForLevelUpSteps = (currentLevel: number): number => {
  const maxLevel = 100;
  const firstLevelExp = 50;

  const steps: number[] = [firstLevelExp];
  for (let i = 1; i <= maxLevel; i++) {
    const prevLevelExp = steps[i - 1];
    const scaleFactor = (maxLevel - i - 1) / maxLevel;
    console.log(scaleFactor);
    steps.push(Math.floor(prevLevelExp + prevLevelExp * scaleFactor));
  }

  console.log(steps, "STEPS");
  return steps[currentLevel - 1];
}; //TODO: i need to find better way for it
