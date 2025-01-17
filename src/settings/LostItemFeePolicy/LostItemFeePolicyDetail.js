import React from 'react';
import PropTypes from 'prop-types';
import {
  injectIntl,
} from 'react-intl';

import {
  get,
  find,
  isEmpty,
} from 'lodash';

import { stripesShape } from '@folio/stripes/core';
import {
  Accordion,
  AccordionSet,
  Col,
  Row,
  ExpandAllButton,
} from '@folio/stripes/components';

import {
  LostItemFeeAboutSection,
  LostItemFeeSection,
} from './components/ViewSections';

import { Metadata } from '../components';
import LostItemFee from '../Models/LostItemFeePolicy';
import { intervalPeriodsLower } from '../../constants';

class LostItemFeePolicyDetail extends React.Component {
  static propTypes = {
    intl: PropTypes.object,
    initialValues: PropTypes.object,
    stripes: stripesShape.isRequired,
    parentResources: PropTypes.shape({
      fixedDueDateSchedules: PropTypes.object,
    }),
  };

  static defaultProps = {
    initialValues: {},
  };

  constructor(props) {
    super(props);

    this.state = {
      sections: {
        LostItemFeeGeneralInformation: true,
        viewLostItemFeeSection: true,
      },
    };
  }

  handleExpandAll = (sections) => {
    this.setState({ sections });
  };

  handleSectionToggle = ({ id }) => {
    this.setState(({ sections }) => {
      sections[id] = !sections[id];
      return { sections };
    });
  };

  getPathToValue = (pathToValue) => {
    const { initialValues: policy } = this.props;
    return get(policy, pathToValue);
  };

  getPeriod = (pathToPeriod) => {
    const {
      intl: {
        formatMessage,
      },
    } = this.props;

    const period = this.getPathToValue(pathToPeriod);

    if (isEmpty(period)) {
      return '-';
    }

    const { label } = find(intervalPeriodsLower, ({ value }) => value === period.intervalId);

    return `${period.duration} ${formatMessage({ id: label })}`;
  };

  render() {
    const {
      initialValues: policy,
      stripes: {
        connect,
      },
      intl: {
        formatMessage,
      },
    } = this.props;

    const { sections } = this.state;

    const LostItemFeePolicy = new LostItemFee(policy);

    return (
      <div data-test-lost-item-fee-policy-detail>
        <Row end="xs">
          <Col data-test-expand-all>
            <ExpandAllButton
              accordionStatus={sections}
              onToggle={this.handleExpandAll}
            />
          </Col>
        </Row>
        <AccordionSet
          data-testid="accordionSet"
          accordionStatus={sections}
          onToggle={this.handleSectionToggle}
        >
          <Accordion
            id="LostItemFeeGeneralInformation"
            label={formatMessage({ id: 'ui-circulation.settings.lostItemFee.generalInformation' })}
            open={sections.LostItemFeeGeneralInformation}
          >
            <Metadata
              connect={connect}
              metadata={policy.metadata}
            />
            <LostItemFeeAboutSection getValue={this.getPathToValue} />
          </Accordion>
          <LostItemFeeSection
            policy={LostItemFeePolicy}
            viewLostItemFeeSection={sections.viewLostItemFeeSection}
            getPeriodValue={this.getPeriod}
            formatMessage={formatMessage}
          />
        </AccordionSet>
      </div>
    );
  }
}

export default injectIntl(LostItemFeePolicyDetail);
