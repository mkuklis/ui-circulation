import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

import { ConfigManager } from '@folio/stripes/smart-components';
import {
  withStripes,
} from '@folio/stripes/core';

import TitleLevelRequestsForm from './TitleLevelRequestsForm';
import {
  getInitialValues,
  normalizeData,
} from './utils';
import {
  MODULE_NAMES,
  CONFIG_NAMES,
} from '../../constants';

const TitleLevelRequests = ({
  stripes,
  intl: {
    formatMessage,
  },
}) => {
  const ConnectedConfigManager = stripes.connect(ConfigManager);

  return (
    <ConnectedConfigManager
      label={formatMessage({ id: 'ui-circulation.settings.titleLevelRequests.paneTitle' })}
      moduleName={MODULE_NAMES.SETTINGS}
      configName={CONFIG_NAMES.TLR}
      configFormComponent={TitleLevelRequestsForm}
      stripes={stripes}
      getInitialValues={getInitialValues}
      onBeforeSave={normalizeData}
    />
  );
};

TitleLevelRequests.propTypes = {
  stripes: PropTypes.shape({
    connect: PropTypes.func.isRequired,
  }).isRequired,
  intl: PropTypes.object.isRequired,
};

export default withStripes(injectIntl(TitleLevelRequests));
