import { Model } from "@app/server/core";

export class User extends Model {
    static tableName = 'users';
    
    protected static hidden = ['password']
}