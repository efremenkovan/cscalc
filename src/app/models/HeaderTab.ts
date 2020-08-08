import { CalcState } from './CalcStates';

export interface HeaderTab {
  id: number;
  value: CalcState;
  label: string;
  isActive: boolean;
}
