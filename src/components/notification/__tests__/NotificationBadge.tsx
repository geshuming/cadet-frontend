import * as React from 'react';

import { mount } from 'enzyme';
import NotificationBadge from '../NotificationBadge';
import { Notification } from '../notificationShape';

const studentNotifications: Notification[] = [
  {
    id: 1,
    type: 'new',
    assessment_id: 1,
    assessment_type: 'Mission',
    assessment_title: 'The Secret to Streams'
  },
  {
    id: 2,
    type: 'graded',
    assessment_id: 1,
    assessment_type: 'Mission',
    assessment_title: 'The Secret to Streams'
  },
  {
    id: 3,
    type: 'autograded',
    assessment_id: 1,
    assessment_type: 'Mission',
    assessment_title: 'The Secret to Streams'
  },
  {
    id: 4,
    type: 'unsubmitted',
    assessment_id: 1,
    assessment_type: 'Mission',
    assessment_title: 'The Secret to Streams'
  }
];

const avengerNotifications: Notification[] = [
  {
    id: 1,
    type: 'submitted',
    assessment_id: 1,
    assessment_type: 'Mission',
    assessment_title: 'The Secret to Streams',
    submission_id: 1
  }
];

describe('Badge', () => {
  test('renders properly for students', () => {
    const tree = mount(<NotificationBadge number={studentNotifications.length} />);

    expect(tree.debug()).toMatchSnapshot();
  });

  test('renders properly for avengers', () => {
    const tree = mount(<NotificationBadge number={avengerNotifications.length} />);

    expect(tree.debug()).toMatchSnapshot();
  });

  test('does not render with no notifications', () => {
    const tree = mount(<NotificationBadge number={0} />);

    expect(tree.debug()).toMatchSnapshot();
  });
});