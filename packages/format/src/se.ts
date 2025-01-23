export function formatPhoneNumber(number: string): string {
  return number;
}

const ORG_NUMBER_FORMAT = /^(\d{6})(\d{4})$/
/**
* Format an organization number
* @example
* ```
* formatOrganizationNumber('1234567890') // => '123456-7890'
* ```
*/
export function formatOrganizationNumber(number: string): string {
  return number.replace(ORG_NUMBER_FORMAT, '$1-$2');
}
