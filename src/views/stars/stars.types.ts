export type StarRecord = {
  id: number;
  name: string;
  x_parsecs: number | null;
  y_parsecs: number | null;
  z_parsecs: number | null;
  spectral_class: string;
  apparent_magnitude: number | null;
  temperature_kelvin: number | null;
};

export type RGB = [number, number, number];

export type SpectralColorMap = Record<string, RGB>;
