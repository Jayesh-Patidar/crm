import {
    BRAND_SERVICE,
    BRAND_REPOSITORY,
    BRAND_MODEL_SERVICE,
    BRAND_MODEL_REPOSITORY,
    ISSUE_REPOSITORY,
    ISSUE_SERVICE,
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
    ],
})
export class ItemModule {}
