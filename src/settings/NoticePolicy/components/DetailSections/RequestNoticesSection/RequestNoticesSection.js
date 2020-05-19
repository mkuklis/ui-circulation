import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import {
  map,
  values,
} from 'lodash';

import { Accordion } from '@folio/stripes/components';

import NoticeCard from '../components';
import {
  requestTimeBasedEventsIds,
  requestTimeBasedNoticesSendEvents,
  requestNoticesTriggeringEvents,
} from '../../../../../constants';

class RequestNoticesSection extends React.Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    policy: PropTypes.object.isRequired,
    templates: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })).isRequired,
    getNotificationContent: PropTypes.func.isRequired,
    onToggle: PropTypes.func.isRequired,
  };

  render() {
    const {
      isOpen,
      policy,
      templates,
      getNotificationContent,
      onToggle,
    } = this.props;

    return (
      <div data-test-notice-policy-detail-request-notices-section>
        <Accordion
          id="requestNotices"
          open={isOpen}
          label={<FormattedMessage id="ui-circulation.settings.noticePolicy.requestNotices" />}
          onToggle={onToggle}
        >
          {map(policy.requestNotices, (notice, index) => (
            <NoticeCard
              key={index}
              index={index}
              notice={notice}
              sendEvents={requestTimeBasedNoticesSendEvents}
              sendEventTriggeringIds={values(requestTimeBasedEventsIds)}
              templates={templates}
              triggeringEvents={requestNoticesTriggeringEvents}
              getNotificationContent={getNotificationContent}
            />
          ))}
        </Accordion>
      </div>
    );
  }
}

export default RequestNoticesSection;
