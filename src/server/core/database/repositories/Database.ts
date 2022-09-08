import { Model, TransactionOrKnex } from 'objection';
import { isEmpty, isArray } from 'lodash';
import { HttpException, HttpStatus } from '@nestjs/common';

export class DatabaseRepository<T extends Record<string, any>> {
    model: any;

    query(args?: TransactionOrKnex): Promise<T[]> {
        return this.model.query(args);
    }
}
