import { Transformer$IncludeMethodOptions } from '../interfaces';
import { Context } from '../utils';

export abstract class Transformer {
    /**
     * Items available that can be included
     */
    public availableIncludes = [];

    /**
     * Items available that are default included
     */
    public defaultIncludes = [];

    protected includes = {};

    public ctx = new Context();

    abstract transform(object: any): Promise<Record<string, any> | null>;

    /**
     * Use this when you want to include single object,
     * which is transformed by some other transformer.
     *
     * @param object
     * @param transformer
     * @param options
     */
    async item(
        object: Record<string, any>,
        transformer: Transformer,
        options?: Transformer$IncludeMethodOptions,
    ): Promise<Record<string, any> | null> {
        if (!object) return null;

        transformer = this.applyOptions(transformer, options);
        return transformer.work(object);
    }

    /**
     * Use this when you want to include multiple objects,
     * which is transformed by some other transformer.
     *
     * @param arr
     * @param transformer
     * @param options
     */
    async collection(
        arr: Array<Record<string, any> | string>,
        transformer: Transformer,
        options?: Transformer$IncludeMethodOptions,
    ): Promise<Array<any>> {
        if (!arr || arr.length === 0) return [];
        transformer = this.applyOptions(transformer, options);
        const result = [];
        for (let data of arr) {
            data = await transformer.work(data);
            result.push(data);
        }
        return result;
    }

    applyOptions(
        transformer: Transformer,
        options?: Transformer$IncludeMethodOptions,
    ): Transformer {
        options = options || {};

        if (options.include) {
            transformer.parseIncludes(options.include.join(','));
        }

        transformer.ctx.setRequest(this.ctx.getRequest());
        return transformer;
    }

    parseIncludes(include = ''): this {
        // this.includes = ExpParser.from(include).toObj();
        return this;
    }

    async work(
        data: any,
    ): Promise<Record<string, any> | Array<Record<string, any>>> {
        let result = {};
        if (data instanceof Object) {
            result = await this.transform(data);
        }

        const handlerName = (name: string) =>
            'include' + name.charAt(0).toUpperCase() + name.slice(1);

        for (const include in this.includes) {
            const handler = handlerName(include);
            const nestedIncludes = this.includes[include];
            if (this[handler]) {
                result[include] = await this[handler](data, {
                    include: nestedIncludes || '',
                });
            }
        }

        return result;
    }
}
