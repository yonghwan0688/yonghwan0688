export interface Schedule {
    id: string;
    title: string;
    description?: string;
    startTime: Date;
    endTime: Date;
    createdAt: Date;
    updatedAt: Date;
}

export interface CreateScheduleRequest {
    title: string;
    description?: string;
    startTime: Date;
    endTime: Date;
}

export interface UpdateScheduleRequest {
    title?: string;
    description?: string;
    startTime?: Date;
    endTime?: Date;
}

export interface ScheduleResponse {
    schedule: Schedule;
}

export interface ErrorResponse {
    message: string;
    statusCode: number;
}