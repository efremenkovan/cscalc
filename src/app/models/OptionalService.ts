export interface OptionalService {
  id: number;
  value: {
    native: (value: number) => number,
    faceIt: (value: number) => number
  };
  label: string;
  description: string;
  isChecked: boolean;
}
