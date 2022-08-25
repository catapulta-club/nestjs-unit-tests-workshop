export class DateUtils {
  static addYears(date: Date, years: number) {
    const newDate = new Date(date.setFullYear(date.getFullYear() + years));

    return newDate;
  }
}
