import {
    BRANDS_SERVICE,
    BRANDS_REPOSITORY,
    BRAND_MODELS_SERVICE,
    BRAND_MODELS_REPOSITORY,
    ISSUES_REPOSITORY,
    ISSUES_SERVICE,
} from './constants';
import {
    BrandRepositoryDatabase,
    BrandModelRepositoryDatabase,
    IssueRepositoryDatabase,
} from './repositories';
import { Module } from '@nestjs/common';
import { BrandModelService, BrandService, IssueService } from './services';
import {
    BrandController,
    BrandModelController,
    IssueController,
} from './controllers';

@Module({
    controllers: [BrandController, IssueController, BrandModelController],
    providers: [
        {
            provide: BRANDS_REPOSITORY,
            useClass: BrandRepositoryDatabase,
        },
        {
            provide: BRANDS_SERVICE,
            useClass: BrandService,
        },
        {
            provide: BRAND_MODELS_REPOSITORY,
            useClass: BrandModelRepositoryDatabase,
        },
        {
            provide: BRAND_MODELS_SERVICE,
            useClass: BrandModelService,
        },
        {
            provide: ISSUES_REPOSITORY,
            useClass: IssueRepositoryDatabase,
        },
        {
            provide: ISSUES_SERVICE,
            useClass: IssueService,
        },
    ],
})
export class BrandModule {}
