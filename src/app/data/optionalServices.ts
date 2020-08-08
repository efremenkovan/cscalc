import { OptionalService } from '../models/OptionalService';

export const optionalServices: OptionalService[] = [
  {
    id: 0,
    value: value => value * 0.5,
    label: 'Без передачи аккаунта',
    description: 'Эта услуга позволяет вам играть с нами, без передачи аккаунта',
    isChecked: false,
  },
  {
    id: 1,
    value: value => value * 0.3,
    label: 'Приорити',
    description: 'Эта услуга позволяет вам играть с нами, без передачи аккаунта',
    isChecked: false,
  },
  {
    id: 2,
    value: value => 490,
    label: 'Стрим заказа',
    description: 'Эта услуга позволяет вам играть с нами, без передачи аккаунта',
    isChecked: false,
  },
];
