export const getExperienceForLevelUpSteps = (): number[] => {
  const maxLevel = 100;
  const firstLevelExp = 50;
  const steps: number[] = [firstLevelExp];
  for (let i = 1; i <= maxLevel; i++) {
    steps.push(Math.floor(steps[i - 1] * 1.3));
  }
  return steps;
}; //TODO: i need to find better way for it
