import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CardsModule } from './cards/cards.module';
import { OpenaiModule } from './openai/openai.module';
import { PrismaModule } from './prisma/prisma.module';
import { TelegramModule } from './telegram/telegram.module';
import { NotesModule } from './notes/notes.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: true,
    }),
    TelegramModule,
    PrismaModule,
    OpenaiModule,
    CardsModule,
    NotesModule,
  ],
})
export class AppModule {}
