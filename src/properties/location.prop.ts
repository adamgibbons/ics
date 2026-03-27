export interface CreateLocationParams {
  name: string;
  language?: string;
  alternativeRepresentation?: string;
}

export function createLocation(location: CreateLocationParams) {
  return {
    name: location.name,
    language: location.language,
    alternativeRepresentation: location.alternativeRepresentation,
  };
}

export function printLocation(params: CreateLocationParams) {
  let formattedResponse = 'LOCATION';

  if (params.alternativeRepresentation) {
    formattedResponse += `;ALTREP="${params.alternativeRepresentation}"`;
  }
  if (params.language) {
    formattedResponse += `;LANGUAGE=${params.language}`;
  }
  formattedResponse += `:${params.name}\r\n`;

  return formattedResponse;
}
