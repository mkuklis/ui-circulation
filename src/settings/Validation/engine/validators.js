import React from 'react';
import { FormattedMessage } from 'react-intl';

import {
  isNotEmpty,
  isIntegerGreaterThanOne,
  isIntegerGreaterThanZero,
  isPositiveNumber,
  isInInterval,
} from './handlers';

export default {
  isNotEmpty: {
    validate: isNotEmpty,
    message: <FormattedMessage id="ui-circulation.settings.validate.fillIn" />,
  },
  isNotEmptySelect: {
    validate: isNotEmpty,
    message: <FormattedMessage id="ui-circulation.settings.validate.select" />,
  },
  isIntegerGreaterThanOne: {
    validate: isIntegerGreaterThanOne,
    message: <FormattedMessage id="ui-circulation.settings.validate.greaterThanOne" />,
  },
  isIntegerGreaterThanZero: {
    validate: isIntegerGreaterThanZero,
    message: <FormattedMessage id="ui-circulation.settings.validate.greaterThanZero" />,
  },
  isPositiveNumber: {
    validate: isPositiveNumber,
    message: <FormattedMessage id="ui-circulation.settings.validate.isPositiveNumber" />,
  },
  isFromOneToHundred: {
    validate: isInInterval.bind(null, 1, 100),
    message: <FormattedMessage id="ui-circulation.settings.validate.isFromOneToHundred" />,
  },
};
