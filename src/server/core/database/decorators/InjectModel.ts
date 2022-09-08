import { Model } from "objection";

export function InjectModel(model: any): Function {
    if (!(model.prototype instanceof Model)) {
        throw new Error(
            `Instance of ${Model.name} expected, ${typeof model} passed!`,
          );
    }
    return function (target: Function, key: string | symbol) {
        Object.assign(target, {
            [key]: model,
        });
    };
}
