import axios from "axios";
import Book from "../UI/Book";
import { BookType } from "@/types/book";
import BookSkeleton from "../UI/BookSkeleton";


async function fetchBookData(): Promise<BookType[]> {
  const recommendedURL =
    "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=recommended";
  try {
    const response = await axios.get(recommendedURL);
    const data = response.data;
    return data || [];
  } catch (error) {
    console.error("Error fetching data: ", error);
    return [];
  }
}

export default async function Recommended() {
  const data = await fetchBookData();
  return (
    <div className="for-you__recommended--books">
      {data.length === 0
        ? Array(5)
            .fill(null)
            .map((_, index) => <BookSkeleton key={`skeleton-${index}`} />)
        : data.slice(0, 5).map((book) => <Book key={book.id} {...book} />)}
    </div>
  );
}
