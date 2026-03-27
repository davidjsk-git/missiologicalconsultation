import { createClient } from '@base44/sdk';
import { appParams } from '@/lib/app-params';

const { token, functionsVersion, appBaseUrl } = appParams;

export const base44 = createClient({
  appId: "69c28b1486c4a0a0e083fafa",
  token,
  functionsVersion,
  requiresAuth: false,
  appBaseUrl
});
