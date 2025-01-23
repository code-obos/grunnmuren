export function formatPhoneNumber(number: string): string {
  return number;
}

const ORG_NUMBER_FORMAT = /^(\d{6})(\d{4})$/
/**
* Format an organization number
* @example
* ```
* formatOrganizationNumber('0000000000') // => '000000-0000'
* ```
*/
export function formatOrganizationNumber(number: string): string {
  return number.replace(ORG_NUMBER_FORMAT, '$1-$2');
}
