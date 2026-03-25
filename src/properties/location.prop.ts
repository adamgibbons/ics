export interface CreateLocationParams {
  name: string;
  language?: string;
  alternativeRepresentation?: string;
}

export function createLocation(location: CreateLocationParams) {
  return {
    name: location.name,
    language: location.language ?? null,
    alternativeRepresentation: location.alternativeRepresentation ?? null,
  };
}

export function printLocation(params: CreateLocationParams) {
  const location = createLocation(params);

  let formattedResponse = 'LOCATION';

  if (location.alternativeRepresentation) {
    formattedResponse += `;ALTREP="${location.alternativeRepresentation}"`;
  }
  if (location.language) {
    formattedResponse += `;LANGUAGE=${location.language}`;
  }
  formattedResponse += `:${location.name}\r\n`;

  return formattedResponse;
}
