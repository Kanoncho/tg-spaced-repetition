import { applyDecorators, UseGuards } from '@nestjs/common';
import { ObsidianAuthGuard } from 'src/common/guards/obsidian-auth.guard';

export function ObsidianAuth() {
  return applyDecorators(UseGuards(ObsidianAuthGuard));
}
