import { Controller, Get, Param } from '@nestjs/common';
import { CountriesService } from './countries.service';

@Controller('countries')
export class CountriesController {
    constructor(private countriesService: CountriesService) {}

    @Get()
    getAllCountries() {
        return this.countriesService.getAllCountries();
    }

    @Get(':countryCode/:country')
    getCountryInfo(
        @Param('countryCode') countryCode: string,
        @Param('country') country: string,
    ) {
        return this.countriesService.getInfoAboutCountry(countryCode, country);
    }
}
