export interface CompanyData {
  id: number;
  desc_json: DescriptionJson;
}

export interface DescriptionJson {
  euId: ValueSource;
  names: NameEntry[];
  status: string;
  endDate: string | null;
  website: string | null;
  addresses: Address[];
  businessId: BusinessId;
  companyForms: CompanyForm[];
  lastModified: string;
  mainBusinessLine: BusinessLine;
  registrationDate: string;
  companySituations: any[]; // No example data provided
  registeredEntries: RegisteredEntry[];
  tradeRegisterStatus: string;
}

export interface ValueSource {
  value: string;
  source: string;
}

export interface NameEntry {
  name: string;
  type: string;
  source: string;
  endDate: string | null;
  version: number;
  registrationDate: string;
}

export interface Address {
  co: string;
  type: number;
  source: string;
  street: string;
  country: string | null;
  entrance: string;
  postCode: string;
  postOffices: PostOffice[];
  postOfficeBox: string;
  buildingNumber: string;
  apartmentNumber: string;
  freeAddressLine: string | null;
  registrationDate: string;
  apartmentIdSuffix: string;
}

export interface PostOffice {
  city: string;
  active: boolean;
  postCode: string;
  languageCode: string;
  municipalityCode: string;
}

export interface BusinessId extends ValueSource {
  registrationDate: string;
}

export interface CompanyForm {
  type: string;
  source: string;
  endDate: string | null;
  version: number;
  descriptions: LocalizedDescription[];
  registrationDate: string;
}

export interface LocalizedDescription {
  description: string;
  languageCode: string;
}

export interface BusinessLine {
  type: string;
  source: string;
  typeCodeSet: string;
  descriptions: LocalizedDescription[];
  registrationDate: string;
}

export interface RegisteredEntry {
  type: string;
  endDate: string | null;
  register: string;
  authority: string;
  descriptions: LocalizedDescription[];
  registrationDate: string;
}