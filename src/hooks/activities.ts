import React, { useState } from 'react';
import { getSteps } from '../services/google-fit';

export function useLastSteps(since: Date) {
  const [steps, setSteps] = useState(0);

  React.useMemo(() => {
    getSteps(since).then((result) => {
      if (result.success) {
        setSteps(result.data.steps);
      } else {
        console.error({ result }, 'useLastSteps failed');
      }
    });
  }, [since, steps]);

  return steps;
}
