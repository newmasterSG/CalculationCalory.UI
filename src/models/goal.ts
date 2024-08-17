export enum Goal {
    MaintainWeight = 1,
    GainWeight = 2,
    LoseWeight = 3
}

export const GoalLabels: { [key in Goal]: string } = {
    [Goal.MaintainWeight]: "Maintain Weight",
    [Goal.GainWeight]: "Gain Weight",
    [Goal.LoseWeight]: "Lose Weight",
};