import { WeatherData } from "@/core";
import { generateDiv } from "@fran-dv/ui-components";
import { Icons, iconsSvg } from "./weather-icons";
import { format } from "date-fns";
import { Classes, DataClick } from "@/ui";
import { getTempFromCelsius, getTempFromFahrenheit } from "@/utilities/temperatureConversor.utility";
import { kmhToMph, mphToKmh } from "@/utilities/velocityConverter.utility";

export enum TempScales {
  cs = "°C",
  fh = "°F",
}

export enum VelocityUnits {
  kmh = "km/h",
  mph = "mph",
}

let currentScale: keyof typeof TempScales;
let currentVelocityUnit: keyof typeof VelocityUnits;

export const toggleTempScale = () => {
  const tempElements = document.querySelectorAll(`.${Classes.tempValue}`);
  const velocityElements = document.querySelectorAll(`.${Classes.velocityValue}`);
  const scaleToggleDiv = document.querySelector(`.${Classes.scaleToggle}`);

  // Toggle temperature scale
  currentScale = currentScale === "cs" ? "fh" : "cs";
  tempElements.forEach((element) => {
    const tempValue = parseFloat(element.textContent || "0");
    const newTemp = currentScale === "cs"
      ? getTempFromFahrenheit(tempValue).c 
      : getTempFromCelsius(tempValue).f;
    element.textContent = `${newTemp.toFixed(1)}`;
    if (!element.nextElementSibling?.classList.contains(Classes.scaleToggle) ){
      element.textContent += `${TempScales[currentScale]}`
    }
  });

  // Update the toggle button
  if (scaleToggleDiv) {
    const scaleH2 = scaleToggleDiv.querySelector("h2");
    if (scaleH2) {
      scaleH2.textContent = TempScales[currentScale];
      scaleH2.title = `Toggle scale to ${currentScale === "cs" ? TempScales.fh : TempScales.cs}`;
    }
  }

  // Toggle velocity unit
  currentVelocityUnit = currentVelocityUnit === "kmh" ? "mph" : "kmh";
  velocityElements.forEach((element) => {
    const velocityValue = parseFloat(element.textContent || "0");
    const newVelocity = currentVelocityUnit === "kmh"
      ? mphToKmh(velocityValue)
      : kmhToMph(velocityValue);
    element.textContent = `${newVelocity.toFixed(1)} ${VelocityUnits[currentVelocityUnit]}`;
  });
};

export const generateWeatherInfoDiv = (data: WeatherData): HTMLDivElement => {
  const container = generateDiv({ classes: [Classes.InfoContainer] });
  // container styles
  container.classList.add(
    "flex",
    "flex-col",
    "bg-gray-800",
    "p-8",
    "pb-14",
    "gap-8",
    "rounded-lg",
  );

  // first section
  const firstSection = generateDiv({ classes: [Classes.section1] });
  const feelsLikeDiv = generateDiv({ classes: [Classes.feelsLikeDiv] });

  const iconDiv = generateDiv({ classes: [Classes.iconDiv] });
  const iconImg = document.createElement("img");
  if (iconsSvg[data.icon as Icons]) {
    iconImg.src = iconsSvg[data.icon as Icons] as string;
    iconImg.alt = data.icon;
  }
  iconDiv.appendChild(iconImg);
  feelsLikeDiv.appendChild(iconDiv);

  currentScale = "cs";
  const tempToDisplay = data.feelslike.c.toFixed(1);
  const tempH2 = document.createElement("h2");
  tempH2.textContent = tempToDisplay;
  tempH2.title = "Feelslike temperature";
  tempH2.classList.add(Classes.tempValue);
  feelsLikeDiv.appendChild(tempH2);
  const scaleToggleDiv = generateDiv({
    classes: [Classes.scaleToggle],
    customAttrs: [
      {
        name: "click",
        value: DataClick.toggleTempScale,
      },
    ],
  });
  const scaleH2 = document.createElement("h2");
  scaleH2.textContent = TempScales[currentScale];
  scaleH2.title = `Toggle scale to ${currentScale === "cs" ? TempScales.fh : TempScales.cs}`;
  scaleToggleDiv.appendChild(scaleH2);
  feelsLikeDiv.appendChild(scaleToggleDiv);
  firstSection.appendChild(feelsLikeDiv);

  const descriptionP = document.createElement("p");
  descriptionP.textContent = data.description;
  firstSection.appendChild(descriptionP);

  // general styles
  const textColor = "text-gray-100";
  enum FontSizes {
    H2 = "text-3xl",
    H3 = "text-2xl",
    P = "text-xl",
  }

  // first section styles
  firstSection.classList.add("flex", "flex-col", "w-1/2");
  iconDiv.classList.add("flex-shrink-0.2");
  iconImg.classList.add("w-30", "min-w-[4rem]");
  feelsLikeDiv.classList.add("flex", "gap-2", "items-center");
  tempH2.classList.add(textColor, FontSizes.H2, "font-semibold");
  scaleH2.classList.add(
    textColor,
    FontSizes.H2,
    "cursor-pointer",
    "font-semibold",
    "hover:text-blue-600",
  );
  descriptionP.classList.add(textColor, "text-lg");

  // second section
  const secondSection = generateDiv({ classes: [Classes.section2] });
  const locationP = document.createElement("p");
  locationP.textContent = data.location;
  secondSection.appendChild(locationP);
  const conditionsH2 = document.createElement("h2");
  conditionsH2.textContent = data.conditions;
  secondSection.appendChild(conditionsH2);
  const dateAndHourH3 = document.createElement("h3");
  dateAndHourH3.textContent = `${format(new Date(data.date), "eeee")} ${data.hour.split(":").slice(0, -1).join(":")}`;
  secondSection.appendChild(dateAndHourH3);

  // second section styles
  secondSection.classList.add(
    "w-1/2",
    "flex",
    "flex-col",
    "items-end",
    "justify-center",
    "gap-5",
  );
  locationP.classList.add(textColor, FontSizes.P, "text-right");
  dateAndHourH3.classList.add(textColor, FontSizes.H3, "text-right");
  conditionsH2.classList.add(
    textColor,
    FontSizes.H2,
    "font-semibold",
    "text-right",
  );

  // wrapper for sections 1 and 2
  const wrapper = generateDiv({ classes: [Classes.wrapper] });
  wrapper.appendChild(firstSection);
  wrapper.appendChild(secondSection);

  // wrapper styles
  wrapper.classList.add("flex", "gap-3");

  // third section
  const thirdSection = generateDiv({ classes: [Classes.section3] });
  // - precipitation row
  const precipRow = generateDiv({ classes: [Classes.InfoRow] });
  const precipTitle = document.createElement("h3");
  const precipData = document.createElement("h3");
  precipTitle.textContent = "Precipitation";
  precipData.textContent = `${data.precip.toFixed(1)}%`;
  precipRow.appendChild(precipTitle);
  precipRow.appendChild(precipData);
  thirdSection.appendChild(precipRow);
  // - humidity row
  const humidityRow = generateDiv({ classes: [Classes.InfoRow] });
  const humidityTitle = document.createElement("h3");
  const humidityData = document.createElement("h3");
  humidityTitle.textContent = "Humidity";
  humidityData.textContent = `${data.humidity.toFixed(1)}%`;
  humidityRow.appendChild(humidityTitle);
  humidityRow.appendChild(humidityData);
  thirdSection.appendChild(humidityRow);
  // - temperature row
  const tempRow = generateDiv({ classes: [Classes.InfoRow] });
  const tempTitle = document.createElement("h3");
  const tempData = document.createElement("h3");
  tempData.classList.add(Classes.RealTemp);
  tempTitle.textContent = "Temperature";
  tempData.textContent = `${data.temperature.c.toFixed(1)}${TempScales.cs}`;
  tempData.classList.add(Classes.tempValue);
  tempRow.appendChild(tempTitle);
  tempRow.appendChild(tempData);
  thirdSection.appendChild(tempRow);
  // - windspeed row
  const windspeedRow = generateDiv({ classes: [Classes.InfoRow] });
  const windspeedTitle = document.createElement("h3");
  const windspeedData = document.createElement("h3");
  windspeedTitle.textContent = "Windspeed";
  currentVelocityUnit = "kmh" as keyof typeof VelocityUnits;
  windspeedData.textContent = `${data.windspeed.k.toFixed(1)} ${VelocityUnits.kmh}`;
  windspeedData.classList.add(Classes.velocityValue);
  windspeedRow.appendChild(windspeedTitle);
  windspeedRow.appendChild(windspeedData);
  thirdSection.appendChild(windspeedRow);

  // third section styles
  thirdSection.classList.add("flex", "flex-col");
  const rows = thirdSection.querySelectorAll(`.${Classes.InfoRow}`);
  let i = 0;
  rows.forEach((row) => {
    row.classList.add(
      "flex",
      "justify-between",
      "pr-4",
      "pl-4",
      "pt-3",
      "pb-3",
      "border-gray-400",
      "border-t",
    );
    if (i === rows.length - 1) {
      row.classList.add("border-b");
    }
    ++i;
  });
  const rowTitles = thirdSection.querySelectorAll("h3");
  rowTitles.forEach((title) => {
    title.classList.add(textColor, FontSizes.H3, "text-semibold");
  });

  container.appendChild(wrapper);
  container.appendChild(thirdSection);
  return container;
};
