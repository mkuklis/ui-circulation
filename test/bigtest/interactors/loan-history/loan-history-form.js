import {
  interactor,
  isPresent,
  clickable,
} from '@bigtest/interactor';

import ButtonInteractor from '@folio/stripes-components/lib/Button/tests/interactor';
import TextFieldInteractor from '@folio/stripes-components/lib/TextField/tests/interactor';
import SelectInteractor from '@folio/stripes-components/lib/Select/tests/interactor';
import CalloutInteractor from '@folio/stripes-components/lib/Callout/tests/interactor';

  @interactor class LoanHistoryForm {
    isLoaded = isPresent('#never-radio-button');

    whenLoaded() {
      return this.when(() => this.isLoaded);
    }

    clickImmediatelyRadioButton = clickable('#immediately-radio-button');
    clickIntervalRadioButton = clickable('#interval-radio-button');
    clickNeverRadioButton = clickable('#never-radio-button');
    clickTreatEnabledCheckbox = clickable('#treatEnabled-checkbox');
    callout = new CalloutInteractor();
    saveButton = new ButtonInteractor('[data-test-loan-history-save-button]');
    intervalValue = new TextFieldInteractor('[data-test-period-duration]');
    intervalType = new SelectInteractor('[data-test-period-interval]');
  }

export default new LoanHistoryForm();