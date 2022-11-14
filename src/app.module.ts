import * as LocalSession from 'telegraf-session-local'
import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { TelegrafModule } from "nestjs-telegraf";
import { AppController } from "./app.controller";
import { HttpModule } from "@nestjs/axios";
import { ConfigModule } from "@nestjs/config";

const sessions = new LocalSession({database: 'session_db.json'})

@Module({
  imports: [ HttpModule,
    ConfigModule.forRoot({envFilePath: ['.env']}),
    TelegrafModule.forRoot({
      middlewares: [sessions.middleware()],
      token: process.env.TG_TOKEN
    })
  ],

  providers: [AppService, AppController],
})
export class AppModule {}
