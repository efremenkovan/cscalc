export enum CalcError {
  None = '',
  Default = 'Выберите нынешнее и желаемое звания',
  Range = 'Нынешнее звание должно быть ниже желаемого',
  FaceItMaxLevel = 'Максимальный уровень Faceit не бустится',
  FaceItMinElo = 'Минимум 150 Эло доступно к заказу',
  FaceItEloDefault = 'Введите нынешний и желаемый ELO',
  FaceItEloRange = 'Желаемый ELO должен быть больше нынешнего',
  Unknown = 'Неизвестная ошибка',
}
