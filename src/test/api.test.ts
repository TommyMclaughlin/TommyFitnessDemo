import { describe, it, expect } from 'vitest';
import api from '../services/api';

describe('API Service', () => {
  it('should be configured with the correct base URL', () => {
    expect(api.defaults.baseURL).toBe('https://pureactivefitness-server.onrender.com');
  });

  it('should include credentials (cookies)', () => {
    expect(api.defaults.withCredentials).toBe(true);
  });
});
