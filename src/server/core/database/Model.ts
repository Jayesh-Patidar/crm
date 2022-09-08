import { omit, pick } from 'lodash';
import { Model as BaseModel } from 'objection';

export class Model extends BaseModel {
    /**
     * The attributes that should be hidden for arrays.
     *
     * @var string[]
     */
    protected static hidden: string[] = [];

    /**
     * The attributes that should be visible in arrays.
     *
     * @var string[]
     */
    protected static visible: string[] = [];

    constructor(hidden?: string[]) {
        super();

        Object.entries(this.constructor).forEach(
            ([property, value]) => (Model[property] = value),
        );
    }

    $formatJson(json: Record<string, any>) {
        json = super.$formatJson(json);

        if (Model.hidden.length) {
            json = omit(json, Model.hidden);
        }

        if (Model.visible.length) {
            json = pick(json, Model.visible);
        }

        return json;
    }
}
