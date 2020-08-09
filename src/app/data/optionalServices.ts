import { OptionalService } from '../models/OptionalService';

export const optionalServices: OptionalService[] = [
  {
    id: 0,
    value: {
      native: value => value * 0.5,
      faceIt: value => 0,
    },
    label: 'Без передачи аккаунта',
    description: 'Эта услуга позволяет вам играть с нами, без передачи аккаунта',
    isChecked: false,
  },
  {
    id: 1,
    value: {
      native: value => value * 0.3,
      faceIt: value => value * 0.3,
    },
    label: 'Приорити',
    description: 'Эта услуга позволяет вам играть с нами, без передачи аккаунта',
    isChecked: false,
  },
  {
    id: 2,
    value: {
      native: value => 490,
      faceIt: value => 490,
    },
    label: 'Стрим заказа',
    description: 'Эта услуга позволяет вам играть с нами, без передачи аккаунта',
    isChecked: false,
  },
  {
    id: 3,
    value: {
      native: null,
      faceIt: value => value * 0.75,
    },
    label: 'Премиум',
    description: 'Все матчи будут сыграны на Faceit Premium',
    isChecked: false,
  }
];
