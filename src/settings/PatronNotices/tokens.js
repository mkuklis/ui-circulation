const formats = {
  item: {
    'item.title': 'The Wines of Italy',
    'item.primaryContributor': 'Thomas, George B.',
    'item.allContributors': 'Finney, Ross L.; Weir, Maurice D.',
    'item.barcode': '<Barcode>31924001521792</Barcode>',
    'item.callNumber': 'TK7871.15.F4 S67 1988',
    'item.callNumberPrefix': 'New & Noteworthy',
    'item.callNumberSuffix': 'Handbook',
    'item.enumeration': 'no.1-3',
    'item.volume': 'v. 27',
    'item.chronology': '1964-1967 (Board)',
    'item.yearCaption': 'Convention photographs 1911-1960',
    'item.materialType': 'Serial',
    'item.copy': 'c.2',
    'item.numberOfPieces': '7',
    'item.descriptionOfPieces': '7 maps in pocket',
  },
  user: {
    'user.firstName': 'John',
    'user.lastName': 'Smith',
    'user.middleName': 'Adam',
    'user.barcode': '<Barcode>456123789</Barcode>',
  },
  request: {
    'request.servicePointPickup': 'Circulation Desk - Main Library',
    'request.requestExpirationDate': 'Jun 30, 2020 23:59',
    'request.holdShelfExpirationDate': 'Mar 31, 2020 23:59',
    'request.reasonForCancellation': 'Item not available',
    'request.additionalInfo': 'Additional information regarding the request cancellation',
  },
  loan: {
    'loan.dueDate': 'Dec 31, 2019 22:00',
    'loan.initialBorrowDate': 'Jan 1, 2019 11:00',
    'loan.checkedInDate': 'Dec 15, 2019 13:24',
    'loan.numberOfRenewalsAllowed': '10',
    'loan.numberOfRenewalsTaken': '2',
    'loan.numberOfRenewalsRemaining': '8',
  },
  effectiveLocation: {
    'item.effectiveLocationSpecific': 'Main Library Reserve',
    'item.effectiveLocationLibrary': 'Main Library',
    'item.effectiveLocationCampus': 'South Campus',
    'item.effectiveLocationInstitution': 'Opentown University',
  },
  feeFine: {
    'fee.owner': 'Main Library',
    'fee.type': 'Locker rental',
    'fee.amount': '$15.00',
    'fee.actionType': 'Payment',
    'fee.actionAmount': '$5.00',
    'fee.actionDateTime': 'Aug 5, 2019',
    'fee.balance': '$10.00',
    'fee.actionAdditionalInfo': 'Additional information regarding the fee/fine',
    'fee.reasonForCancellation': 'Fee/fine cancelation reason',
  },
};

export default formats;
