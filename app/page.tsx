"use client"
import { fetchBooksBorrowed } from "@/action/user";
import { Button } from "@/components/ui/button";

export default function Home() {
  const fetchBooks = async () => {
    const result = await fetchBooksBorrowed();
    console.log(result);
  }
  return (
    <div>
      <h1>Working</h1>
      <Button onClick= {fetchBooks}>Fetch Borrowed Books</Button>
    </div>
  )
}