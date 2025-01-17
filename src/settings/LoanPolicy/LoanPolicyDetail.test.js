import React from 'react';
import {
  render,
  screen,
  within,
  fireEvent,
} from '@testing-library/react';

import '../../../test/jest/__mock__';

import {
  Accordion,
  AccordionSet,
  ExpandAllButton,
} from '@folio/stripes/components';

import buildStripes from '../../../test/jest/__mock__/stripes.mock';

import {
  AboutSection,
  LoansSection,
  RenewalsSection,
  RequestManagementSection,
} from './components/ViewSections';
import { Metadata } from '../components';
import LoanPolicy from '../Models/LoanPolicy';
import LoanPolicyDetail from './LoanPolicyDetail';

const mockIntervalPeriodValue = 'testValue';
const mockIntervalPeriodLabel = 'testLabel';
const mockGeneralLoanPolicyDetailId = 'generalLoanPolicyDetail';

const mockIntervalPeriods = [{
  value: mockIntervalPeriodValue,
  label: mockIntervalPeriodLabel,
}];
const mockLoanPolicyReturnValue = {
  loanable: true,
};
const mockTestIds = {
  expandAllButton: 'expandAllButton',
  loansSection: 'loansSection',
  accordion: 'accordion',
};

ExpandAllButton.mockImplementation(({ onToggle }) => (
  // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
  <div
    data-testid={mockTestIds.expandAllButton}
    onClick={() => onToggle({
      generalLoanPolicyDetail: false,
      recalls: false,
      holds: false,
    })}
  />
));

jest.mock('./components/ViewSections', () => ({
  AboutSection: jest.fn(() => null),
  LoansSection: jest.fn(() => null),
  RenewalsSection: jest.fn(() => null),
  RequestManagementSection: jest.fn(() => null),
}));
jest.mock('../components', () => ({
  Metadata: jest.fn(() => null),
}));
jest.mock('../Models/LoanPolicy', () => jest.fn(() => mockLoanPolicyReturnValue));
jest.mock('../../constants', () => ({
  get intervalPeriods() {
    return mockIntervalPeriods;
  },
}));

const testStripes = buildStripes();

describe('LoanPolicyDetail', () => {
  const labelIds = {
    loanPolicyGeneralInformation: 'ui-circulation.settings.loanPolicy.generalInformation',
    commonYes: 'ui-circulation.settings.common.yes',
    commonNo: 'ui-circulation.settings.common.no',
  };
  const testDefaultProps = {
    stripes: testStripes,
  };
  const accordionDefaultStatus = {
    generalLoanPolicyDetail: true,
    recalls: true,
    holds: true,
  };

  const getById = (id) => within(screen.getByTestId(id));

  afterEach(() => {
    Accordion.mockClear();
    AccordionSet.mockClear();
    ExpandAllButton.mockClear();
    AboutSection.mockClear();
    LoansSection.mockClear();
    RenewalsSection.mockClear();
    RequestManagementSection.mockClear();
    Metadata.mockClear();
  });

  describe('with default props', () => {
    beforeEach(() => {
      render(
        <LoanPolicyDetail {...testDefaultProps} />
      );
    });

    it('should render ExpandAllButton component', () => {
      expect(ExpandAllButton).toHaveBeenCalledWith(expect.objectContaining({
        accordionStatus: accordionDefaultStatus,
      }), {});
    });

    it('should render AccordionSet component', () => {
      expect(AccordionSet).toHaveBeenCalled();
    });

    it('should render Accordion component', () => {
      expect(Accordion).toHaveBeenCalledWith(expect.objectContaining({
        id: mockGeneralLoanPolicyDetailId,
        label: labelIds.loanPolicyGeneralInformation,
        open: accordionDefaultStatus.generalLoanPolicyDetail,
      }), {});
    });

    it('should call Metadata component', () => {
      expect(Metadata).toHaveBeenCalledWith(expect.objectContaining({
        connect: testStripes.connect,
        metadata: undefined,
      }), {});
    });

    it('should render AboutSection component', () => {
      expect(AboutSection).toHaveBeenCalled();
    });

    it('should render LoansSection component', () => {
      expect(LoansSection).toHaveBeenCalledWith(expect.objectContaining({
        policy: mockLoanPolicyReturnValue,
      }), {});
    });

    it('should render RenewalsSection component', () => {
      expect(RenewalsSection).toHaveBeenCalledWith(expect.objectContaining({
        isVisible: mockLoanPolicyReturnValue.loanable,
        policy: mockLoanPolicyReturnValue,
      }), {});
    });

    it('should render RequestManagementSection component', () => {
      expect(RequestManagementSection).toHaveBeenCalledWith(expect.objectContaining({
        isVisible: undefined,
        isRecallsOpen: accordionDefaultStatus.recalls,
        isHoldsOpen: accordionDefaultStatus.holds,
      }), {});
    });
  });

  describe('when initialValues are passed and loanable is true', () => {
    const initialValues = {
      loanable: true,
    };

    beforeEach(() => {
      render(
        <LoanPolicyDetail
          {...testDefaultProps}
          initialValues={initialValues}
        />
      );
    });

    it('should render RequestManagementSection component', () => {
      expect(RequestManagementSection).toHaveBeenCalledWith(expect.objectContaining({
        isVisible: initialValues.loanable,
      }), {});
    });
  });

  describe('when initialValues are passed and metadata is passed', () => {
    const initialValues = {
      metadata: 'testMetadata',
    };

    beforeEach(() => {
      render(
        <LoanPolicyDetail
          {...testDefaultProps}
          initialValues={initialValues}
        />
      );
    });

    it('should call Metadata component', () => {
      expect(Metadata).toHaveBeenCalledWith(expect.objectContaining({
        metadata: initialValues.metadata,
      }), {});
    });
  });

  describe('when LoanPolicy method returns loanable with value false', () => {
    const loanPolicyReturnValue = {
      loanable: false,
    };

    beforeEach(() => {
      LoanPolicy.mockImplementationOnce(() => loanPolicyReturnValue);

      render(
        <LoanPolicyDetail {...testDefaultProps} />
      );
    });

    it('should render RenewalsSection component', () => {
      expect(RenewalsSection).toHaveBeenCalledWith(expect.objectContaining({
        isVisible: loanPolicyReturnValue.loanable,
      }), {});
    });
  });

  describe('handleExpandAll method', () => {
    beforeEach(() => {
      render(
        <LoanPolicyDetail {...testDefaultProps} />
      );
    });

    it('should render components with default accordions statuses', () => {
      expect(ExpandAllButton).toHaveBeenLastCalledWith(expect.objectContaining({
        accordionStatus: accordionDefaultStatus,
      }), {});

      expect(Accordion).toHaveBeenLastCalledWith(
        expect.objectContaining({
          open: accordionDefaultStatus.generalLoanPolicyDetail,
        }), {}
      );

      expect(RequestManagementSection).toHaveBeenLastCalledWith(
        expect.objectContaining({
          isRecallsOpen: accordionDefaultStatus.recalls,
          isHoldsOpen: accordionDefaultStatus.holds,
        }), {}
      );
    });

    it('should expand all accordions statuses', () => {
      fireEvent.click(screen.getByTestId(mockTestIds.expandAllButton));

      expect(ExpandAllButton).toHaveBeenLastCalledWith(expect.objectContaining({
        accordionStatus: {
          generalLoanPolicyDetail: false,
          recalls: false,
          holds: false,
        },
      }), {});

      expect(Accordion).toHaveBeenLastCalledWith(
        expect.objectContaining({
          open: false,
        }), {}
      );

      expect(RequestManagementSection).toHaveBeenLastCalledWith(
        expect.objectContaining({
          isRecallsOpen: false,
          isHoldsOpen: false,
        }), {}
      );
    });
  });

  describe('getCheckboxValue method', () => {
    const createMockLoansSection = () => {
      LoansSection.mockImplementationOnce(({ getCheckboxValue }) => (
        <div data-testid={mockTestIds.loansSection}>
          {getCheckboxValue('value')}
        </div>
      ));
    };

    it('should get checkbox value when getValue method returns true', () => {
      createMockLoansSection();

      render(
        <LoanPolicyDetail
          {...testDefaultProps}
          initialValues={{
            value: true,
          }}
        />
      );

      expect(getById(mockTestIds.loansSection).getByText(labelIds.commonYes)).toBeVisible();
    });

    it('should get checkbox value when getValue method returns false', () => {
      createMockLoansSection();

      render(
        <LoanPolicyDetail
          {...testDefaultProps}
          initialValues={{
            value: false,
          }}
        />
      );

      expect(getById(mockTestIds.loansSection).getByText(labelIds.commonNo)).toBeVisible();
    });

    it('should get checkbox value when getValue method returns undefined', () => {
      createMockLoansSection();

      render(
        <LoanPolicyDetail {...testDefaultProps} />
      );

      expect(getById(mockTestIds.loansSection).getByText(labelIds.commonNo)).toBeVisible();
    });
  });

  describe('getValue method', () => {
    it('should get value', () => {
      const testValue = 'testValue';

      LoansSection.mockImplementationOnce(({ getValue }) => (
        <div data-testid={mockTestIds.loansSection}>
          {getValue('value')}
        </div>
      ));

      render(
        <LoanPolicyDetail
          {...testDefaultProps}
          initialValues={{
            value: testValue,
          }}
        />
      );

      expect(getById(mockTestIds.loansSection).getByText(testValue)).toBeVisible();
    });
  });

  describe('handleSectionToggle method', () => {
    it('should expand accordion', () => {
      Accordion.mockImplementationOnce(({ onToggle, children }) => (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
        <div
          data-testid={mockTestIds.accordion}
          onClick={() => onToggle({ id: mockGeneralLoanPolicyDetailId })}
        >
          {children}
        </div>
      ));

      render(
        <LoanPolicyDetail {...testDefaultProps} />
      );

      expect(ExpandAllButton).toHaveBeenLastCalledWith(expect.objectContaining({
        accordionStatus: accordionDefaultStatus,
      }), {});

      expect(Accordion).toHaveBeenLastCalledWith(expect.objectContaining({
        open: accordionDefaultStatus.generalLoanPolicyDetail,
      }), {});

      fireEvent.click(screen.getByTestId(mockTestIds.accordion));

      expect(ExpandAllButton).toHaveBeenLastCalledWith(expect.objectContaining({
        accordionStatus: {
          ...accordionDefaultStatus,
          generalLoanPolicyDetail: false,
        },
      }), {});

      expect(Accordion).toHaveBeenLastCalledWith(expect.objectContaining({
        open: false,
      }), {});
    });
  });

  describe('getDropdownValue method', () => {
    const id = 'id';
    const label = 'testLabel';
    const items = [{
      value: id,
      label,
    }];

    const createMockLoansSection = () => {
      LoansSection.mockImplementationOnce(({ getDropdownValue }) => (
        <div data-testid={mockTestIds.loansSection}>
          {getDropdownValue('value', items)}
        </div>
      ));
    };
    it('should get dropdown value when item found', () => {
      createMockLoansSection();

      render(
        <LoanPolicyDetail
          {...testDefaultProps}
          initialValues={{
            value: id,
          }}
        />
      );

      expect(getById(mockTestIds.loansSection).getByText(label)).toBeVisible();
    });

    it('should get dropdown value when item not found', () => {
      createMockLoansSection();

      render(
        <LoanPolicyDetail {...testDefaultProps} />
      );

      expect(getById(mockTestIds.loansSection).getByText('-')).toBeVisible();
    });
  });

  describe('getPeriodValue method', () => {
    const duration = 'testDuration';

    const createMockLoansSection = () => {
      LoansSection.mockImplementationOnce(({ getPeriodValue }) => (
        <div data-testid={mockTestIds.loansSection}>
          {getPeriodValue('value')}
        </div>
      ));
    };

    it('should get period value when period found', () => {
      createMockLoansSection();

      render(
        <LoanPolicyDetail
          {...testDefaultProps}
          initialValues={{
            value: {
              intervalId: mockIntervalPeriodValue,
              duration,
            },
          }}
        />
      );

      expect(getById(mockTestIds.loansSection).getByText(`${duration} ${mockIntervalPeriodLabel}`)).toBeVisible();
    });

    it('should get period value when period not found', () => {
      createMockLoansSection();

      render(
        <LoanPolicyDetail {...testDefaultProps} />
      );

      expect(getById(mockTestIds.loansSection).getByText('-')).toBeVisible();
    });
  });

  describe('getScheduleValue method', () => {
    const testId = 'testId';
    const testName = 'testName';

    const createMockLoansSection = () => {
      LoansSection.mockImplementationOnce(({ getScheduleValue }) => (
        <div data-testid={mockTestIds.loansSection}>
          {getScheduleValue('value')}
        </div>
      ));
    };

    it('should get schedule value when selectedSchedule found', () => {
      createMockLoansSection();

      render(
        <LoanPolicyDetail
          {...testDefaultProps}
          parentResources={{
            fixedDueDateSchedules: {
              records: [{
                id: testId,
                name: testName,
              }],
            },
          }}
          initialValues={{
            value: testId,
          }}
        />
      );

      expect(getById(mockTestIds.loansSection).getByText(testName)).toBeVisible();
    });

    it('should get schedule value when selectedSchedule not found', () => {
      createMockLoansSection();

      render(
        <LoanPolicyDetail
          {...testDefaultProps}
          parentResources={{}}
          initialValues={{
            value: testId,
          }}
        />
      );

      expect(getById(mockTestIds.loansSection).getByText('-')).toBeVisible();
    });
  });
});
