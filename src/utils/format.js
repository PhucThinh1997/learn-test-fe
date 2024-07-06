import moment from "moment";

export const formatCurrency = (number) => {
  if (Number.isNaN(number) || !number || number === null) {
    number = 0;
  }
  let vnd = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });
  return vnd.format(number).replaceAll('₫', '');
};

export const formatCurrencyInput = (numberString) => {
  let number = numberString.replaceAll('.', '');
  return Number(number);
};

export const formatDateYMD = (date) => {
  let myDate = moment(date);
  return moment.isMoment(myDate) ? myDate?.format('YYYY-MM-DD') : myDate
}
