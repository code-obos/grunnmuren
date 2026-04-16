const SAMPLE_DATA_NO = {
  firstName: 'Ola',
  lastName: 'Nordmann',
  birthdate: '1990-01-15',
  nationalId: '15019012345',
  phone: '12345678',
  childPhone: '87654321',
  email: 'ola.nordmann@example.com',
  address: {
    streetAddress: 'Hammersborg torg',
    houseNumber: '1',
    entranceNumber: '',
    postalCode: '0179',
    postalDistrict: 'Oslo',
  },
  careOfName: 'Kari Nordmann',
  guardianFirstName: 'Kari',
  guardianLastName: 'Nordmann',
  guardianPhone: '98765432',
  guardianEmail: 'kari.nordmann@example.com',
  radioValue: 'option1',
  selectValue: 'parent',
  greeting: 'Gratulerer med dagen! Hilsen fra oss alle.',
};

export const SAMPLE_DATA = SAMPLE_DATA_NO;

export type SampleData = typeof SAMPLE_DATA_NO;
