import { serviceResponse } from './service-helper';
import type { ServiceResponse, SimpleResponse } from './types';
import GoogleFit, { Scopes } from 'react-native-google-fit';

export async function ensureAuthorized(): Promise<SimpleResponse> {
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

export function getSteps(
  since: Date
): Promise<ServiceResponse<{ steps: number }>> {
  return serviceResponse(async () => {
    const data = await GoogleFit.getDailyStepCountSamples({
      startDate: since.toISOString(),
      endDate: new Date().toISOString(),
    });
    const source = data.find(
      (it) => it.source === 'com.google.android.gms:estimated_steps'
    );
    if (!source) {
      console.error('Estimated steps source not found');
      return { steps: 0 };
    }
    const steps = source.steps.reduce((acc, it) => acc += it.value, 0);
    return { steps };
  });
}
