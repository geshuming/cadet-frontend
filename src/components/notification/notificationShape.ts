export interface Notification {
    assessmentId?: number;
    id: number;
    questionId?: number;
    read: boolean;
    role: UserType;
    submissionId?: number;
    type: NotificationType;
    user: {
        name: string;
        id: number;
    };
}

export enum NotificationTypes {
    new = 'new',
    deadline = 'deadline',
    autograded = 'autograded',
    manually_graded = 'manually_graded',
    submitted = 'submitted'
  }

export type NotificationType = keyof typeof NotificationTypes;

export enum UserTypes {
    admin = 'admin',
    staff = 'staff',
    student = 'student'
  }

export type UserType = keyof typeof UserTypes;
