

// See https://sprakradet.no/godt-og-korrekt-sprak/rettskriving-og-grammatikk/tall-tid-dato/
const EIGHT_HUNDRED_SERIES_PHONE_NUMBER_FORMAT = /^(\d{3})(\d{2})(\d{3})$/;
const DEFAULT_PHONE_NUMBER_FORMAT = /^(\d{2})(\d{2})(\d{2})(\d{2})$/;

export function formatPhoneNumber(number: string): string {

  if (number.startsWith('8')) {
    return number.replace(EIGHT_HUNDRED_SERIES_PHONE_NUMBER_FORMAT, '$1 $2 $3');
  }

  return number.replace(DEFAULT_PHONE_NUMBER_FORMAT, '$1 $2 $3 $4');
}


const ORG_NUMBER_FORMAT = /^(\d{3})(\d{3})(\d{3})$/

/**
* Format an organization number
* @example
* ```
* formatOrganizationNumber('123456789') // => '123 456 789'
* ```
*/
export function formatOrganizationNumber(number: string): string {
  return number.replace(ORG_NUMBER_FORMAT, '$1 $2 $3');
}

const OBOS_MEMBERSHIP_NUMBER_FORMAT = /^(\d{3})(\d{2})(\d{2})$/;

/**
* Format an OBOS membership number
* @example
* ```
* formatObosMembershipNumber('0000000') // => '000 000 00'
* ```
*/
export function formatObosMembershipNumber(number: string) {
  return number.replace(OBOS_MEMBERSHIP_NUMBER_FORMAT, '$1 $2 $3')
}
