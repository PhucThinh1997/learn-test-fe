import _ from 'lodash';
const ct = require('countries-and-timezones');
require('date-time-format-timezone');
const timezones = ct.getAllTimezones();

/**
 * Example:
 * {
 *  name: 'Asia/Tel_Aviv',
 *  country: 'IL',
 *  utcOffset: 120,
 *  utcOffsetStr: '+02:00',
 *  dstOffset: 180,
 *  dstOffsetStr: '+03:00',
 *  aliasOf: 'Asia/Jerusalem'
 * }
 */
export function getTimezones() {
  const country_utc = [];
  for (let [, value] of Object.entries(timezones)) {
    country_utc.push(value);
  }

  return country_utc;
}

export function getUtcTzLabelValue(labelField, valueField, withName) {
  labelField = labelField || 'name';
  valueField = valueField || 'value';
  const country_utc = [];
  for (let [, value] of Object.entries(timezones)) {
    // eslint-disable-next-line
    const found = country_utc.some((el) => el.label == `UTC ${value[labelField]}`);
    if (!found) {
      let l = `UTC ${value[labelField]}`;
      if (withName) l += ` (${value['name']})`;
      country_utc.push({
        label: l,
        value: value[valueField],
      });
    }
  }

  let sorted_country_utc = _.sortBy(country_utc, 'label');
  return sorted_country_utc;
}

export function getLocaleTime(dateValue, locale, options) {
  return new Intl.DateTimeFormat(locale, options).format(dateValue);
}

export const utcTz = getTimezones().map((t) => `${t.name} ${t.utcOffsetStr}`);
