module.exports = {
  okapi: {
    // url: 'https://okapi-bugfest-kiwi.folio.ebsco.com', tenant: 'fs09000000',
    // url: 'https://folio-snapshot-okapi.dev.folio.org', tenant: 'diku',
    url: 'https://folio-snapshot-2-okapi.dev.folio.org', tenant: 'diku',
    // url: 'https://okapi-bugfest-orchid.int.aws.folio.org', tenant: 'fs09000000'
    // url: 'https://okapi-bugfest-morningglory.int.aws.folio.org', tenant: 'fs09000000'
  },
  config: {
    logCategories: 'core,path,action,xhr',
    logPrefix: '--',
    showPerms: false,
    hasAllPerms: false,
    languages: ['en'],
    suppressIntlErrors: true,
  },
  modules: {
    // '@folio/inventory': {},
    // "@folio/quick-marc": {},
    '@folio/circulation': {}
  }
};
