import { AutocompleteOption } from '@dcp/shared';

export function getOptionFormValue(options: AutocompleteOption[], value?: any): any {
  if (value !== undefined || value !== null) return options.find((o) => o.value === value) || null;
  return null;
}
