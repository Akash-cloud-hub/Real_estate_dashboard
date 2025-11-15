import {
    ColumnType, Generated,
    Insertable,
    Selectable,
    Updateable,
    JSONColumnType
} from 'kysely';

export interface Database {
    'master.user': UserTable;
    'tran.borrowing_records': Borrowed_records;
    'master.books': Books;
    // Here your saying the data format inside master.user table is the same as User.
}

export interface UserRole {
  role: 'student' | 'teacher' |string; // extend with other possible roles
}

export interface BaseModel { // This is the base model id for all tables because they all have id column . It is not the foreign key rather it is the primary key.
  id?: number | undefined;
}

export interface UserTable extends BaseModel{
  username: string | null;
  email: string | null;
  mobile_number: string | null;
  role: JSONColumnType<UserRole[]>;
}

export interface Borrowing_records extends BaseModel {
  book_id: number;
  user_id: number;
  borrow_date: Date;
  return_date: Date | null;
}

export interface Books extends BaseModel {
  title: string;
  author: string;
  published_year: number;
  quantity: number;
}

export type User = Selectable<UserTable>;
export type Borrowed_records = Selectable<Borrowing_records>;
export type Book = Selectable<Books>;


