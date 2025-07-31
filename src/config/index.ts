import { config as qaConfig } from './config.qa';
import { config as intConfig } from './config.int';

const env = (process.env.TEST_ENV || 'int').trim() as 'qa' | 'int';

const configs = {
  qa: qaConfig,
  int: intConfig,
};

export const envConfig = configs[env];

if (!envConfig) {
  throw new Error(`Unknown environment config: ${env}`);
}
