export interface CreateContactParams {
  contact: string;
  language?: string;
  alternativeRepresentation?: string;
}

export function createContact(params: CreateContactParams) {
  return {
    contact: params.contact,
    language: params.language,
    alternativeRepresentation: params.alternativeRepresentation,
  };
}

export function printContact(params: CreateContactParams) {
  let formattedResponse = "CONTACT";

  if (params.alternativeRepresentation) {
    formattedResponse += `;ALTREP="${params.alternativeRepresentation}"`;
  }
  if (params.language) {
    formattedResponse += `;LANGUAGE=${params.language}`;
  }

  formattedResponse += `:${params.contact}\r\n`;
  return formattedResponse;
}

export function printContacts(contacts: CreateContactParams[]) {
  return contacts.map((c) => printContact(c)).join("");
}

// Property Name:  CONTACT
//
// Purpose:  This property is used to represent contact information or
//   alternately a reference to contact information associated with the
//   calendar component.
//
// Value Type:  TEXT
//
// Property Parameters:  IANA, non-standard, language, and alternate text
//   representation parameters can be specified on this property.