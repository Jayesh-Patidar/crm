import { Module } from '@nestjs/common';
import { CustomerService } from './services';
import { CustomerController } from './controllers';
import { CustomerRepositoryDatabase } from './repositories';
import { CUSTOMER_REPOSITORY, CUSTOMER_SERVICE } from './constants';

@Module({
    controllers: [CustomerController],
    providers: [
        {
            provide: CUSTOMER_REPOSITORY,
            useClass: CustomerRepositoryDatabase,
        },
        {
            provide: CUSTOMER_SERVICE,
            useClass: CustomerService,
        },
    ],
    exports: [
        {
            provide: CUSTOMER_SERVICE,
            useClass: CustomerService,
        },
    ],
})
export class CustomerModule {}
