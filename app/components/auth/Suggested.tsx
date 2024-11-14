import axios from "axios";
import Book from "../UI/Book";
import Link from "next/link";

interface BookData {
  id: string;
  author: string;
  title: string;
  subTitle: string;
  imageLink: string;
  audioLink: string;
  totalRating: number;
  averageRating: number;
  keyIdeas: number;
  type: string;
  status: string;
  subscriptionRequired: boolean;
  summary: string;
  tags: string[];
  bookDescription: string;
  authorDescription: string;
}

async function fetchBookData(): Promise<BookData[]> {
  const suggestedURL =
    "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=suggested";
  try {
    const response = await axios.get(suggestedURL);
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
      {data.slice(0, 5).map((book) => <Book key={book.id} {...book} />)}
    </div>
  );
}
