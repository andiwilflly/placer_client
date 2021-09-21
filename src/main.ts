import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// TOKEN:  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
// git push https://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@github.com/andiwilflly/placer_client.git

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3001);
}
bootstrap();
