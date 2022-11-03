import {
    BRAND_SERVICE,
    BRAND_REPOSITORY,
    BRAND_MODEL_SERVICE,
    BRAND_MODEL_REPOSITORY,
    ISSUE_REPOSITORY,
    ISSUE_SERVICE,
    ACCESSORY_REPOSITORY,
    ACCESSORY_SERVICE,
} from './constants';
import {
    BrandRepositoryDatabase,
    BrandModelRepositoryDatabase,
    IssueRepositoryDatabase,
    AccessoryRepositoryDatabase,
} from './repositories';
import { Module } from '@nestjs/common';
import {
    AccessoryService,
    BrandModelService,
    BrandService,
    IssueService,
} from './services';
import {
    AccessoryController,
    BrandController,
    BrandModelController,
    IssueController,
} from './controllers';

@Module({
    controllers: [
        BrandController,
        IssueController,
        BrandModelController,
        AccessoryController,
    ],
    providers: [
        {
            provide: BRAND_REPOSITORY,
            useClass: BrandRepositoryDatabase,
        },
        {
            provide: BRAND_SERVICE,
            useClass: BrandService,
        },
        {
            provide: BRAND_MODEL_REPOSITORY,
            useClass: BrandModelRepositoryDatabase,
        },
        {
            provide: BRAND_MODEL_SERVICE,
            useClass: BrandModelService,
        },
        {
            provide: ISSUE_REPOSITORY,
            useClass: IssueRepositoryDatabase,
        },
        {
            provide: ISSUE_SERVICE,
            useClass: IssueService,
        },
        {
            provide: ACCESSORY_REPOSITORY,
            useClass: AccessoryRepositoryDatabase,
        },
        {
            provide: ACCESSORY_SERVICE,
            useClass: AccessoryService,
        },
    ],
    exports: [
        {
            provide: BRAND_SERVICE,
            useClass: BrandService,
        },
        {
            provide: BRAND_MODEL_SERVICE,
            useClass: BrandModelService,
        },
        {
            provide: ISSUE_SERVICE,
            useClass: IssueService,
        },
        {
            provide: ACCESSORY_SERVICE,
            useClass: AccessoryService,
        },
    ],
})
export class ItemModule {}
