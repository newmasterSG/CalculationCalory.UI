import { Goal } from "./goal";

export enum Gender {
    Male = 0,
    Female = 1,
}

export const GenderLabels: { [key in Gender]: string } = {
    [Gender.Male]: "Male",
    [Gender.Female]: "Female",
};

export enum ActivityLevel {
    Sedentary = 1,
    LightlyActive = 2,
    ModeratelyActive = 3,
    VeryActive = 4,
    ExtremelyActive = 5
}

export const ActivityLevelLabels: { [key in ActivityLevel]: string } = {
    [ActivityLevel.Sedentary]: "Sedentary",
    [ActivityLevel.LightlyActive]: "Lightly Active",
    [ActivityLevel.ModeratelyActive]: "Moderately Active",
    [ActivityLevel.VeryActive]: "Very Active",
    [ActivityLevel.ExtremelyActive]: "Extremely Active",
};

export interface UserProfile {
    gender: Gender;
    height: number;
    weight: number;
    goal: Goal;
    activityLevel: ActivityLevel;
}