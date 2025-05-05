import { Temperature } from "@/core";

const fahrenheitToCelsius = (fh: number): number => {
  return ((fh - 32) * 5) / 9;
};

const celsiusToFahrenheit = (celsius: number): number => {
  return (celsius * 9) / 5 + 32;
};

export const getTempFromFahrenheit = (fh: number): Temperature => {
  return {
    f: fh,
    c: fahrenheitToCelsius(fh),
  };
};

export const getTempFromCelsius = (cs: number): Temperature => {
  return {
    c: cs,
    f: celsiusToFahrenheit(cs),
  };
};
