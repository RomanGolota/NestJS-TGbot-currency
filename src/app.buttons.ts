import { Markup } from "telegraf";

export function actionButtons() {
  return Markup.inlineKeyboard([
      Markup.button.callback('Курс основных валют', 'main'),
      Markup.button.callback('Курс всех валют', 'all'),
    ],{

    }
  )
}