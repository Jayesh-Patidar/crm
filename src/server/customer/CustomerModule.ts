import { Module } from '@nestjs/common';
import { CustomerService, LocalityService } from './services';
import { CustomerController, LocalityController } from './controllers';
import {
    CustomerRepositoryDatabase,
    LocalityRepositoryDatabase,
} from './repositories';
import {
    CUSTOMER_REPOSITORY,
    CUSTOMER_SERVICE,
    LOCALITY_REPOSITORY,
    LOCALITY_SERVICE,
} from './constants';

@Module({
    controllers: [CustomerController, LocalityController],
    providers: [
        {
            provide: CUSTOMER_REPOSITORY,
            useClass: CustomerRepositoryDatabase,
        },
        {
            provide: CUSTOMER_SERVICE,
            useClass: CustomerService,
        },
        {
            provide: LOCALITY_REPOSITORY,
            useClass: LocalityRepositoryDatabase,
        },
        {
            provide: LOCALITY_SERVICE,
            useClass: LocalityService,
        },
    ],
    exports: [
        {
            provide: CUSTOMER_SERVICE,
            useClass: CustomerService,
        },
        {
            provide: LOCALITY_SERVICE,
            useClass: LocalityService,
        },
    ],
})
export class CustomerModule {}
