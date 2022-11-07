export const getExperienceForLevelUpSteps = (): number[] => {
  const maxLevel = 100;
  const firstLevelExp = 50;
  const steps: number[] = [firstLevelExp];
  for (let i = 1; i <= maxLevel; i++) {
    steps.push(steps[i - 1] * 5);
  }

  console.log(steps);
  return steps;
};
