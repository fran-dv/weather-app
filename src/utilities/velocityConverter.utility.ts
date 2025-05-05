import { Velocity } from "@/core";

export const kmhToMph = (kmh: number): number => {
  return kmh * 0.621371;
};

export const mphToKmh = (mph: number): number => {
  return mph / 0.621371;
};

export const getVelocityFromMph = (mph: number): Velocity => {
  return {
    k: mphToKmh(mph),
    m: mph,
  };
};

export const getVelocityFromKmh = (kmh: number): Velocity => {
  return {
    k: kmh,
    m: kmhToMph(kmh), 
  };
};