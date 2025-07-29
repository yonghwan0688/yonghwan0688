export interface Schedule {
    id: string;
    title: string;
    startTime: Date;
    endTime: Date;
    description?: string;
}

export interface SchedulerProps {
    schedules: Schedule[];
    onScheduleAdd: (schedule: Schedule) => void;
    onScheduleUpdate: (schedule: Schedule) => void;
    onScheduleDelete: (id: string) => void;
}