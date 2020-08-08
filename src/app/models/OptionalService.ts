export interface OptionalService {
  id: number;
  value: (value: number) => number;
  label: string;
  description: string;
  isChecked: boolean;
}
