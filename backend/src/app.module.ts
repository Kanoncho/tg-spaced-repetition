import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BullmqBoardModule } from './bullmq-board/bullmq-board.module';
import { BullmqModule } from './bullmq/bullmq.module';
import { CardsModule } from './cards/cards.module';
import { NotesModule } from './notes/notes.module';
import { OpenaiModule } from './openai/openai.module';
import { PrismaModule } from './prisma/prisma.module';
import { TelegramModule } from './telegram/telegram.module';
import { UserModule } from './user/user.module';

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
    BullmqModule,
    BullmqBoardModule,
    UserModule,
  ],
})
export class AppModule {}
