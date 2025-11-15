"use server"

import { db } from "@/lib/db"
import { User } from "@/models/types";
import { sql } from "kysely";

const fetchBooksBorrowed = async () => {
    const books_borrowed = db.selectFrom('master.books as b')
    .leftJoin('tran.borrowing_records as br', 'b.id', 'br.book_id')
    .select(['b.title', 
        sql<number>`COUNT(br.book_id)`.as('borrow_count')])
    .groupBy('b.title')
    .execute();

    return books_borrowed;
}

export { fetchBooksBorrowed };


// SELECT b.title,COUNT(br.book_id) FROM master."books" b
// LEFT JOIN tran."borrowing_records" br ON br.book_id = b.id
// GROUP BY b.title;"