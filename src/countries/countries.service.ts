import { HttpException, Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class CountriesService {
    private readonly countriesBaseUrl =
        'https://date.nager.at/api/v3/AvailableCountries';
    private readonly countryInfoBaseUrl =
        'https://date.nager.at/api/v3/CountryInfo';
    private readonly populationInfoUrl =
        'https://countriesnow.space/api/v0.1/countries/population';
    private readonly flagBaseUrl =
        'https://countriesnow.space/api/v0.1/countries/flag/images';

    async getAllCountries() {
        try {
            const countries = await axios.get(this.countriesBaseUrl);
            return countries.data;
        } catch {
            throw new HttpException('Failed to get countries', 500);
        }
    }
    async getCountryInfo(countryCode: string) {
        try {
            const countryInfo = await axios.get(
                `${this.countryInfoBaseUrl}/${countryCode}`,
            );
            return countryInfo.data;
        } catch {
            throw new HttpException('Failed to get country info', 500);
        }
    }
    async getPopulationInfo(country: string) {
        try {
            const population = await axios.post(this.populationInfoUrl, {
                country,
            });
            return population.data.data;
        } catch {
            throw new HttpException('Failed to get population info', 500);
        }
    }

    async getFlag(iso2: string) {
        try {
            const flag = await axios.post(this.flagBaseUrl, {
                iso2,
            });
            return flag.data;
        } catch {
            throw new HttpException('Failed to get flag', 500);
        }
    }

    async getInfoAboutCountry(countryCode: string, country: string) {
        const border = await this.getCountryInfo(countryCode);
        const population = await this.getPopulationInfo(country);
        const flag = await this.getFlag(countryCode);

        return {
            border: border,
            flag: flag.data.flag,
            population: population.populationCounts,
        };
    }
}
