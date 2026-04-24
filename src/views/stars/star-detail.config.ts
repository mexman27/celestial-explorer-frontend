export type FieldGroup = {
  title: string;
  fields: string[];
};

export const FIELD_GROUPS: FieldGroup[] = [
  {
    title: 'Identity',
    fields: ['name', 'spectral_class', 'constellation'],
  },
  {
    title: 'Position',
    fields: ['x_parsecs', 'y_parsecs', 'z_parsecs', 'distance_parsecs', 'right_ascension', 'declination'],
  },
  {
    title: 'Physical Properties',
    fields: ['temperature_kelvin', 'apparent_magnitude', 'absolute_magnitude', 'luminosity_solar'],
  },
  {
    title: 'Motion',
    fields: ['radial_velocity', 'proper_motion_ra', 'proper_motion_dec'],
  },
];

export const SKIP_FIELDS = new Set(['id']);
