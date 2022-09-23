import { AppModule } from './AppModule';
import { ConfigService } from '@nestjs/config';
import { ExceptionHandler } from './core/exceptions';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { RequestGuard, ResponseGuard } from './core/guards';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const config = app.get(ConfigService);

    if (!config.get('auth.jwt.secret')) {
        console.error('Invalid app key. Please provide an app key');
        app.close();
    }

    app.useGlobalGuards(new RequestGuard(), new ResponseGuard());

    app.enableCors(config.get('cors'));

    const { httpAdapter } = app.get(HttpAdapterHost);
    app.useGlobalFilters(new ExceptionHandler(httpAdapter));

    app.setGlobalPrefix('api');

    await app.listen(config.get('app.port'));
}

bootstrap();
