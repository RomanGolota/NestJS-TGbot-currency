import { AppService } from './app.service';
import { Context, Telegraf } from "telegraf";
import { Action, InjectBot, Start, Update } from "nestjs-telegraf";
import { actionButtons } from "./app.buttons";

@Update()
export class AppController {
  constructor(@InjectBot() private readonly bot: Telegraf<Context>, private readonly appService: AppService) {}

  @Start()
  async startCommand(ctx: Context) {
    await ctx.reply('Привет!Я могу показывать курс валют согласно официальному курсу НБУ')
    await ctx.reply('Что мне отобразить?', actionButtons())
  }

  @Action('main')
  async mainCurrency(ctx: Context) {
    return this.appService.getMainCurr()
  }

  @Action('all')
  async allCurrency(ctx: Context) {
    return this.appService.getAllCurr()
  }
}
