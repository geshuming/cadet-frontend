import { AssessmentCategories } from '../assessment/assessmentShape';
import { Notification } from './notificationShape';

type filterByTypeOptions = AssessmentCategories | 'Grading';

/**
 * @param assessmentId the assessment id to filter the notifications with.
 *
 * @return A function that takes in an array of notification and filters it.
 */
export function filterNotificationsByAssessment(assessmentId: number) {
  return (notifications: Notification[]) =>
    notifications.filter(n => !n.submission_id && n.assessment_id === assessmentId);
}

/**
 * @param submissionId the submission id to filter the notifications with.
 *
 * @return A function that takes in an array of notification and filters it.
 */
export function filterNotificationsBySubmission(submissionId: number) {
  return (notifications: Notification[]) =>
    notifications.filter(n => n.submission_id === submissionId);
}

/**
 * Notifications will be filtered to either one of the Assessment Category, or the Grading Category.
 *
 * Notifications with a submission id belongs to the Grading category.
 *
 * @param submissionId the submission id to filter the notifications with.
 *
 * @return A function that takes in an array of notification and filters it.
 */
export function filterNotificationsByType(assessmentType: filterByTypeOptions) {
  return (notifications: Notification[]) =>
    notifications.filter(n => {
      if (assessmentType === 'Grading') {
        return n.submission_id !== undefined;
      }
      return !n.submission_id && assessmentType === n.assessment_type;
    });
}
