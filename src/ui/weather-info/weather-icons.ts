import clearDayIcon from "@/assets/weather-animated-icons/clear-day.svg";
import clearNightIcon from "@/assets/weather-animated-icons/clear-night.svg";
import cloudyIcon from "@/assets/weather-animated-icons/cloudy.svg";
import partlyCloudyDayIcon from "@/assets/weather-animated-icons/partly-cloudy-day.svg";
import partlyCloudyNightIcon from "@/assets/weather-animated-icons/partly-cloudy-night.svg";
import rainIcon from "@/assets/weather-animated-icons/rain.svg";
import snowIcon from "@/assets/weather-animated-icons/snow.svg";

export enum Icons { // icon set provided by visual crossing data
  Snow = "snow",
  Rain = "rain",
  Fog = "fog",
  Wind = "wind",
  Cloudy = "cloudy",
  PartlyCloudyDay = "partly-cloudy-day",
  PartlyCloudyNight = "partly-cloudy-night",
  ClearDay = "clear-day",
  ClearNight = "clear-night",
}

export const iconsSvg: Record<Icons, string | null> = {
  [Icons.Snow]: snowIcon,
  [Icons.Rain]: rainIcon,
  [Icons.Fog]: null,
  [Icons.Wind]: null,
  [Icons.Cloudy]: cloudyIcon,
  [Icons.PartlyCloudyDay]: partlyCloudyDayIcon,
  [Icons.PartlyCloudyNight]: partlyCloudyNightIcon,
  [Icons.ClearDay]: clearDayIcon,
  [Icons.ClearNight]: clearNightIcon,
};
