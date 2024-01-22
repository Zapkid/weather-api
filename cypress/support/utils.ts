class DateUtils {
  getDateFromEpochTimestamp(date_epoch: number): Date {
    return new Date(date_epoch * 1_000);
  }

  formatDate(date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  }

  getDateXDaysAgo(days: number): string {
    if (days <= 0) {
      throw new Error("X Days ago must be greater than 0");
    }
    const today = new Date();
    const xDaysInMilliSeconds = days * 24 * 60 * 60 * 1000;
    const xDaysAgoDate = new Date(today.getTime() - xDaysInMilliSeconds);
    return this.formatDate(xDaysAgoDate);
  }
}

export const dateUtils = new DateUtils();
