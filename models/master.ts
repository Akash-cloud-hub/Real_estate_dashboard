import {
    ColumnType, Generated,
    Insertable,
    Selectable,
    Updateable,
    JSONColumnType
} from 'kysely';

//__________________________________________________________________________

export interface Database {
    'master.business': BusinessTable;
    'master.user': UserTable;
}

//__________________________________________________________________________


export interface BaseModel {
    id?: number | undefined;
}

export interface Industry { // Industry type for BusinessTable
    industry: 'Real Estate' | 'Healthcare' | 'Law' | string;    // extend with other possible industries
}

export interface UserStatus {
    status: 'active' | 'inactive' |'suspended' | 'deleted' | string; // extend with other possible statuses
}

//__________________________________________________________________________


export interface BusinessTable extends BaseModel{   //master.business "BusinessTable" structure
    business_name: string | null;
    country: string | null;
    industry: JSONColumnType<Industry[]>;
    created_at: Date;
    updated_at: Date;
}


export interface UserTable extends BaseModel{ //master.user "UserTable" structure
    email: string | null;
    password: string | null;
    full_name: string | null;
    is_active: boolean | null;
    status: JSONColumnType<UserStatus[]>;
    created_at: Date;
    updated_at: Date;
    businesses: JSON; // ASk Mr.Mohammed if the data type is correct
}




//__________________________________________________________________________



export type Business = Selectable<BusinessTable>;
export type User = Selectable<UserTable>;
