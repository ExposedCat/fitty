import { Text } from 'react-native';
import { useEnsureAuthorized } from '../hooks/system';

export function AuthTracker(): JSX.Element {
  const authorized = useEnsureAuthorized();
  return <Text>{authorized ? '+ Authorized' : '- NOT Authorized'}</Text>;
}
