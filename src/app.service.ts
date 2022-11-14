import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from "axios";
import { Injectable, Logger } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { Response } from "./entities/response.entity";
import { getTodayDate } from "./helpers/helpers";

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);
  constructor(private readonly httpService: HttpService) {}

  async getMainCurr(): Promise<any> {
    const { data } = await firstValueFrom(
      this.httpService.get<any>(`https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json`).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data);
          throw 'An error happened!';
        }),
      ),
    );
    const actualCurr = ['USD', 'EUR', 'GBP']
    const filteredData = data.filter(item => actualCurr.includes(item.cc))
    const allCurr = filteredData.map(item => `${item.txt} - ${item.rate}\n`)

    return `Курс валют на ${new Date().toLocaleString()}\n\n${allCurr.join('')}`
  }

  async getAllCurr(): Promise<any> {
    const { data } = await firstValueFrom(
      this.httpService.get<any>(`https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json`).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data);
          throw 'An error happened!';
        }),
      ),
    );

    const allCurr = data.map(item => `${item.txt} - ${item.rate}\n`)
    return `Курс валют на ${new Date().toLocaleString()}\n\n${allCurr.join('')}`
  }

  async findOne(cc): Promise<Response[]> {
    const { data } = await firstValueFrom(
      this.httpService.get<any>(`https://bank.gov.ua/NBU_Exchange/exchange_site?start=${getTodayDate()}&end=${getTodayDate()}&valcode=${cc}&sort=exchangedate&order=desc&json`).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data);
          throw 'An error happened!';
        }),
      ),
    );
    console.log(data)
    return data[0].rate;
  }
}
