export enum userStatus {
    NEGATIVE = 0,
    WAITING = 1,
    POSITIVE = 2
}

export default interface FormData {
    firstName: string
    lastName: string
    healthId: string
    status: userStatus
};