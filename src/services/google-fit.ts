import type { ServiceResponse } from './types';
import GoogleFit, { Scopes } from 'react-native-google-fit';

export async function ensureAuthorized(): Promise<ServiceResponse> {
  try {
    await GoogleFit.checkIsAuthorized();
    if (GoogleFit.isAuthorized) {
      return { success: true };
    }
    const result = await GoogleFit.authorize({
      scopes: [Scopes.FITNESS_ACTIVITY_READ],
    });
    return result;
  } catch (error) {
    console.error('ensureAuthorized failed', error);
    return { success: false };
  }
}
