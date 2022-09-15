import { Model } from 'objection';

interface IInjectModelReturn {
    (
        target: CallableFunction | Record<string, any>,
        key: string | symbol,
    ): void;
}

export function InjectModel(model: any): IInjectModelReturn {
    if (!(model.prototype instanceof Model)) {
        throw new Error(
            `Instance of ${Model.name} expected, ${typeof model} passed!`,
        );
    }
    return function (
        target: CallableFunction | Record<string, any>,
        key: string | symbol,
    ): void {
        Object.assign(target, {
            [key]: model,
        });
    };
}
