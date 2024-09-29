export interface GetDailyLogUserDTO {
    date: string;
    userId?: number | null;
}

export type GetDailyLogByUserQuery = {
    dto: GetDailyLogUserDTO;
}