import { get } from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { stripesShape } from '@folio/stripes/core';
import { FormattedMessage } from 'react-intl';
import {
  Accordion,
  AccordionSet,
  Col,
  Row,
  KeyValue,
  ExpandAllButton,
  List,
} from '@folio/stripes/components';

import { Metadata } from '../components';

export const requestTypeFormater = (requestType) => <li key={requestType}>{requestType}</li>;

class RequestPolicyDetail extends React.Component {
  static propTypes = {
    stripes: stripesShape.isRequired,
    initialValues: PropTypes.object,
  };

  static defaultProps = {
    initialValues: {},
  };

  constructor(props) {
    super(props);

    this.state = {
      sections: {
        general: true,
      },
    };
  }

  handleSectionToggle = ({ id }) => {
    this.setState(({ sections }) => {
      sections[id] = !sections[id];
      return { sections };
    });
  };

  handleExpandAll = (sections) => {
    this.setState({ sections });
  };

  render() {
    const {
      initialValues: policy,
      stripes,
    } = this.props;

    const {
      sections,
    } = this.state;

    const { requestTypes } = policy;

    return (
      <div data-test-request-policy-detail>
        <Row end="xs">
          <Col data-test-expand-all xs>
            <ExpandAllButton
              data-testid="expandAllButton"
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
            data-testid="generalInformation"
            open={sections.general}
            id="general"
            label={<FormattedMessage id="ui-circulation.settings.requestPolicy.generalInformation" />}
          >
            <Metadata
              connect={stripes.connect}
              metadata={policy.metadata}
            />

            <Row>
              <Col xs={12} data-request-policy-name>
                <KeyValue
                  label={<FormattedMessage id="ui-circulation.settings.requestPolicy.policyName" />}
                  value={policy.name}
                />
              </Col>
            </Row>
            <br />
            <Row>
              <Col xs={12}>
                <KeyValue
                  label={<FormattedMessage id="ui-circulation.settings.requestPolicy.policyDescription" />}
                  value={get(policy, 'description', '-')}
                />
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <KeyValue
                  label={<FormattedMessage id="ui-circulation.settings.requestPolicy.policyTypes" />}
                >
                  <div
                    data-testid="itemsList"
                    data-test-request-types-list
                  >
                    <List
                      items={requestTypes}
                      itemFormatter={requestTypeFormater}
                    />
                  </div>
                </KeyValue>
              </Col>
            </Row>
          </Accordion>
        </AccordionSet>
      </div>
    );
  }
}

export default RequestPolicyDetail;
