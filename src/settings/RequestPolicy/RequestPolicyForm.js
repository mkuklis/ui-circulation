import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { find } from 'lodash';

import stripesFinalForm from '@folio/stripes/final-form';
import {
  Col,
  ExpandAllButton,
  Pane,
  Paneset,
  Row,
} from '@folio/stripes/components';

import { GeneralSection } from './components';
import {
  CancelButton,
  FooterPane,
} from '../components';

import RequestPolicy from '../Models/RequestPolicy';
import { RequestPolicy as validateRequestPolicy } from '../Validation'; 

class RequestPolicyForm extends React.Component {
  static propTypes = {
    okapi: PropTypes.object.isRequired,
    initialValues: PropTypes.object,
    pristine: PropTypes.bool.isRequired,
    submitting: PropTypes.bool.isRequired,
    form: PropTypes.object.isRequired,
    onCancel: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
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
    this.setState((state) => {
      const sections = { ...state.sections };
      sections[id] = !sections[id];
      return { sections };
    });
  };

  handleExpandAll = (sections) => {
    this.setState({ sections });
  };

  checkUniqueName = (name) => {
    const { okapi } = this.props;

    return fetch(`${okapi.url}/request-policy-storage/request-policies?query=(name=="${name}")`,
      {
        headers: {
          'X-Okapi-Tenant': okapi.tenant,
          'X-Okapi-Token': okapi.token,
          'Content-Type': 'application/json',
        }
      });
  };

  validate = async (name) => {
    let error;

    if (name) {
      try {
        const response = await this.checkUniqueName(name);
        const { requestPolicies = [] } = await response.json();
        const matchedPolicy = find(requestPolicies, ['name', name]);
        if (matchedPolicy && matchedPolicy.id !== this.props.initialValues.id) {
          error = <FormattedMessage id="ui-circulation.settings.requestPolicy.errors.nameExists" />;
        }
      } catch (e) {
        throw new Error(e);
      }
    }

    return error;
  };

  render() {
    const {
      pristine,
      form: { getState },
      submitting,
      handleSubmit,
      onCancel,
    } = this.props;

    const { sections } = this.state;

    const { values = {} } = getState();
    const policy = new RequestPolicy(values);

    const panelTitle = policy.id
      ? policy.name
      : <FormattedMessage id="ui-circulation.settings.requestPolicy.createEntryLabel" />;

    const footerPaneProps = {
      pristine,
      submitting,
      onCancel,
    };

    return (
      <form
        noValidate
        data-test-request-policy-form
        onSubmit={handleSubmit}
      >
        <Paneset isRoot>
          <Pane
            defaultWidth="100%"
            paneTitle={panelTitle}
            firstMenu={<CancelButton onCancel={onCancel} />}
            footer={<FooterPane {...footerPaneProps} />}
          >
            <>
              <Row end="xs">
                <Col xs>
                  <ExpandAllButton
                    accordionStatus={sections}
                    onToggle={this.handleExpandAll}
                  />
                </Col>
              </Row>
              <GeneralSection
                isOpen={sections.general}
                metadata={policy.metadata}
                onToggle={this.handleSectionToggle}
                validateName={this.validate}
              />
            </>
          </Pane>
        </Paneset>
      </form>
    );
  }
}

export default stripesFinalForm({
  navigationCheck: true,
  validateOnBlur: true,
  validate: validateRequestPolicy,
})(RequestPolicyForm);
