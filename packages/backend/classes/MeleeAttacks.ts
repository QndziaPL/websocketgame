import { MeleeAttack } from "@websocketgame/shared/dist/types/meleeAttack";

export default class MeleeAttacks {
  private meleeAttacks: MeleeAttack[] = [];

  getMeleeAttacks = () => {
    return [...this.meleeAttacks];
  };

  addMeleeAttack = (meleeAttack: MeleeAttack) => {
    this.meleeAttacks.push(meleeAttack);
  };

  setDealtDamageToTrue = (id: string) => {
    const newAttacks = [...this.meleeAttacks];
    const indexOfAttack = newAttacks.findIndex((attack) => attack.id === id);

    newAttacks[indexOfAttack].dealtDamage = true;

    this.meleeAttacks = newAttacks;
  };

  updateMeleeAttacks = () => {
    const newAttacks: MeleeAttack[] = [];
    for (let i = 0; i < this.meleeAttacks.length; i++) {
      const attack = this.meleeAttacks[i];
      if (Date.now() - attack.animationTime >= attack.whenPerformed) {
        continue;
      }
      newAttacks.push(attack);
    }
    this.meleeAttacks = newAttacks;
  };
}
