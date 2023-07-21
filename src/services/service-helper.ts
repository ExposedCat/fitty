import type { ServiceResponse } from './types';

export async function serviceResponse<D = void, E = unknown>(
  callback: () => Promise<D> | D
): Promise<ServiceResponse<D, E>> {
  try {
    const data = await callback();
    return { success: true, data };
  } catch (error) {
    console.error({ error }, 'service execution failed');
    return {
      success: false,
      error: error as E,
    };
  }
}
