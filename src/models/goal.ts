export enum Goal {
    MaintainWeight = 0,
    GainWeight = 1,
    LoseWeight = 2
}

export const GoalLabels: { [key in Goal]: string } = {
    [Goal.MaintainWeight]: "Maintain Weight",
    [Goal.GainWeight]: "Gain Weight",
    [Goal.LoseWeight]: "Lose Weight",
};