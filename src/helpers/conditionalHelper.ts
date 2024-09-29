export const isMealDataValid = (data: any): boolean => {
    return (
        data &&
        data.Breakfast?.length > 0 &&
        data.Lunch?.length > 0 &&
        data.Dinner?.length > 0
    );
};