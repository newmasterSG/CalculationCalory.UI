import { CALORIES_UPDATE_EVENT } from "../constants";

export const dispatchCaloriesNormUpdate = (totalEatCal: number = 0) => {
    const updateCaloriesNormEvent = new CustomEvent(CALORIES_UPDATE_EVENT, {
        detail: { totalEatCal },
    });

    // Dispatch the event
    window.dispatchEvent(updateCaloriesNormEvent);
};