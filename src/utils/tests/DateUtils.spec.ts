import { DateUtils } from '../DateUtils';

describe('DateUtils', () => {
  it('Deve adicionar um ano a uma data', () => {
    const date = new Date(2022, 0, 1);
    const newDate = DateUtils.addYears(date, 1);

    expect(newDate.getFullYear()).toEqual(2023);
    expect(newDate.getDate()).toEqual(1);
    expect(newDate.getMonth()).toEqual(0);
  });

  it('Deve adicionar 5 anos a uma data', () => {
    const date = new Date(2022, 0, 1);
    const newDate = DateUtils.addYears(date, 5);

    expect(newDate.getFullYear()).toEqual(2027);
    expect(newDate.getDate()).toEqual(1);
    expect(newDate.getMonth()).toEqual(0);
  });
});
