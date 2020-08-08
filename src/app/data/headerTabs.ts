import { HeaderTab } from '../models/HeaderTab';
import { CalcState } from '../models/CalcStates';

export const headerTabs: HeaderTab[] = [
  {
    id: 0,
    value: CalcState.MatchMaking,
    label: 'По званию',
    isActive: false,
  },
  {
    id: 1,
    value: CalcState.Wingman,
    label: 'По званию напарники',
    isActive: true
  },
];
