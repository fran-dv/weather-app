import { WeatherData } from "@/core";
import { generateDiv } from "@fran-dv/ui-components";
import "./weather-info.css";

enum Classes {
    InfoContainer = "weather-info",
}

export const generateWeatherInfoDiv = (data: WeatherData): HTMLDivElement => {
    const container = generateDiv({ classes: [Classes.InfoContainer] })

    

    return container;
}