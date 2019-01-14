import LoanPolicy from '../Models/LoanPolicy';
import FormValidator from './FormValidator';

export default function (policy) {
  const loanPolicy = new LoanPolicy(policy);

  const config = {
    'name': {
      rules: ['isNotEmpty'],
      shouldValidate: true,
    },
    'loansPolicy.period.duration': {
      rules: ['isNotEmpty', 'isIntegerGreaterThanOne'],
      shouldValidate: loanPolicy.isProfileRolling(),
    },
    'loansPolicy.fixedDueDateScheduleId': {
      rules: ['isNotEmptySelect'],
      shouldValidate: loanPolicy.isProfileFixed(),
    },
    'loansPolicy.openingTimeOffset.duration': {
      rules: ['isNotEmpty', 'isIntegerGreaterThanOne'],
      shouldValidate: loanPolicy.isOpeningTimeOffsetActive(),
    },
    'renewalsPolicy.alternateFixedDueDateScheduleId': {
      rules: ['isNotEmptySelect'],
      shouldValidate: loanPolicy.isAlternateFixedDueDateScheduleIdRequired(),
    },
    'renewalsPolicy.period.duration': {
      rules: ['isNotEmpty'],
      shouldValidate: loanPolicy.isRenewalsPolicyPeriodRequired(),
    },
    'renewalsPolicy.numberAllowed': {
      rules: ['isNotEmpty'],
      shouldValidate: loanPolicy.isNumberOfRenewalsAllowedActive(),
    },
  };
  const formValidator = new FormValidator(config);
  return formValidator.validate(policy);
}
