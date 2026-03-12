import { applyDecorators, UseGuards } from '@nestjs/common';
import { ObsidianAuthGuard } from 'src/guards/obsidian-auth.guard';

export function ObsidianAuth() {
  return applyDecorators(UseGuards(ObsidianAuthGuard));
}
