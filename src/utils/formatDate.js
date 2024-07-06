import moment from 'moment';

export const formatMDY = (data) => (data ? window.moment.utc(data).local().format('MM/DD/YYYY') : '');

export const customFormat = (data, format) => {
  const date = window.moment.utc(data).local();
  return date.isValid() ? date.format(format) : '';
};

export const getDateFormat = (date) => {
  const d = moment(date);
  return date && d.isValid() ? d : '';
};

export const startDMY = (data, type) => moment(data).startOf(type).toString();

export const endDMY = (data, type) => moment(data).endOf(type).toString();

export const formatMDYWithParam = (param) => (param && param.value ? formatMDY(param.value) : '');
export const formatMMDDYYYY = (data) => (data ? moment(data).format('MM/DD/YYYY') : '');
export const formatDDMMYYYY = (data) => (data ? moment(data).format('DD/MM/YYYY') : '');

export const formatTime = (data) => (data ? moment(data).format('HH:mm A') : '');

export const formatFullTime = (data) => (data ? moment(data).format('MM/DD/YYYY hh:mm A') : '');

export const exportToChatTime = (isoDate) => {
  if (!isoDate) return;
  const diff = moment(isoDate).diff(new Date(), 'hours');

  let result;

  if (-diff < 10) {
    result = window.moment(isoDate).fromNow();
  }

  if (-diff >= 10) {
    result = window.moment(isoDate).calendar();
  }

  return result;
};

export const formattedFullTime = (data) => moment(data).format('YYYY-MM-DDTHH:mm:ss[Z]');

export const startISOTime = (data, typeView) => moment(data).startOf(typeView).toISOString();

export const endISOTime = (data, typeView) => moment(data).endOf(typeView).toISOString();

export const convertToISOTime = (data) => moment(data).toISOString();

export const getPreviousDays = (number) => moment().subtract(number, 'days');
export const getPrevious30Days = () => getPreviousDays(30);

export const today = () => moment();


export const DateTimeToDate = (dateString) => {
  if (!dateString) return null

  const date = new Date(dateString);
  const formattedDate = date.toISOString().split('T')[0];
  return formattedDate
}

