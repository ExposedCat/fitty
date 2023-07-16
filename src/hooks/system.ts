import React, { useState } from 'react';
import { ensureAuthorized } from '../services/google-fit';

export function useEnsureAuthorized() {
  const [authorized, setAuthorized] = useState(false);

  React.useEffect(() => {
    ensureAuthorized().then((result) => setAuthorized(result.success));
  }, []);

  return authorized;
}
