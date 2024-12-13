
import '@testing-library/jest-dom';
import { server } from './src/test/mocks/server';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

// Establish API mocking before all tests.
beforeAll(() => server.listen({ onUnhandledRequest: 'warn' }));

// Reset any request handlers that are added during the tests.
afterEach(() => server.resetHandlers());

// Clean up after the tests are finished.
afterAll(() => server.close());