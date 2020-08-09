import { HeaderTab } from '../models/HeaderTab';
import { CalcState } from '../models/CalcStates';

export const headerTabs: {
  native: HeaderTab[],
  faceIt: HeaderTab[],
} = {
  native: [
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
  ],
  faceIt: [
    {
      id: 0,
      value: CalcState.FaceItElo,
      label: 'По эло',
      isActive: true
    },
    {
      id: 1,
      value: CalcState.FaceItGames,
      label: 'По победам',
      isActive: false
    },
  ]
};
