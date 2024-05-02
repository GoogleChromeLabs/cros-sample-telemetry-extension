

jest.mock('../environments/environment', () => ({
  environment: {testModeEnabled: true},
}));
