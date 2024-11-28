"use client";

import { useEffect, useState } from "react";
import Book from "@/app/components/UI/Book";
import { FetchFavorites } from "@/app/actions";
import BookSkeleton from "@/app/components/UI/BookSkeleton";
import { BookType } from "@/types/book";

// const fetchData = (
//   userId: string | null,
//   setFavorites: React.Dispatch<React.SetStateAction<any[]>>,
//   setLoading: React.Dispatch<React.SetStateAction<boolean>>
// ) => {
//   if (userId) {
//     FetchFavorites(userId)
//       .then((fetchedFavorites) => {
//         setFavorites(fetchedFavorites);
//       })
//       .catch((error) => {
//         console.error("Failed to fetch favorites:", error);
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   } else {
//     console.error("User ID not found");
//     setLoading(false);
//   }
// };

const Library = () => {
//   const userId = localStorage.getItem("userId");
//   const [favorites, setFavorites] = useState<BookType[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (userId) {
//       fetchData(userId, setFavorites, setLoading);
//     }
//   }, [userId]);

//   const savedBooks = favorites.filter((book) => book.status !== "finished");
//   const finishedBooks = favorites.filter((book) => book.status === "finished");

  return (
    <div className="container">
      {/* <div className="row auth__row">
        <div className="for-you__title">Saved Books</div>
        {savedBooks.length > 0 && (
          <div className="for-you__sub--title">{`${savedBooks.length} items`}</div>
        )}
        {loading ? (
          <div className="for-you__recommended--books">
            {Array.from({ length: 5 }, (_, index) => (
              <BookSkeleton key={`saved-skeleton-${index}`} />
            ))}
          </div>
        ) : (
          <div className="for-you__recommended--books">
            {savedBooks.length === 0 ? (
              (
                <div className="finished__books--block-wrapper">
                  <div className="finished__books--title">
                    Save your favorite books!
                  </div>
                  <div className="finished__books--sub-title">
                    When you save a book, it will appear here.
                  </div>
                </div>
              )
            ) : (
              savedBooks.map((book) => (
                <Book key={book.bookId} {...book} id={book.bookId} />
              ))
            )}
          </div>
        )}
        <div className="for-you__title">Finished</div>
        {finishedBooks.length > 0 && (
          <div className="for-you__sub--title">{`${finishedBooks.length} items`}</div>
        )}
        {loading ? (
          <div className="for-you__recommended--books">
            {Array.from({ length: 5 }, (_, index) => (
              <BookSkeleton key={`saved-skeleton-${index}`} />
            ))}
          </div>
        ) : (
          <div className="for-you__recommended--books">
            {finishedBooks.length === 0 ? (
              (
                <div className="finished__books--block-wrapper">
                  <div className="finished__books--title">
                  Done and dusted!
                  </div>
                  <div className="finished__books--sub-title">
                  When you finish a book, you can find it here later.
                  </div>
                </div>
              )
            ) : (
              finishedBooks.map((book) => (
                <Book key={book.bookId} {...book} id={book.bookId} />
              ))
            )}
          </div>
        )}
      </div> */}
    </div>
  );
};

export default Library;
