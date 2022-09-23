import { Module } from '@nestjs/common';
import { RepairingService } from './services';
import { RepairingController } from './controllers';
import { RepairingRepositoryDatabase } from './repositories';
import { REPAIRING_REPOSITORY, REPAIRING_SERVICE } from './constants';
import { CustomerModule } from '../customer';

@Module({
    imports: [CustomerModule],
    controllers: [RepairingController],
    providers: [
        {
            provide: REPAIRING_REPOSITORY,
            useClass: RepairingRepositoryDatabase,
        },
        {
            provide: REPAIRING_SERVICE,
            useClass: RepairingService,
        },
    ],
})
export class RepairingModule {}
