"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import Duration from "../UI/Duration";
import { TfiTime } from "react-icons/tfi";
import { FaTimes } from "react-icons/fa";
import { BookType } from "@/types/book";
import { RxHamburgerMenu } from "react-icons/rx";
import { useDispatch } from "react-redux";

interface SearchbarProps {
  onMenuClick: () => void;
}

async function fetchBookData(search: string): Promise<BookType[]> {
  const searchURL = `https://us-central1-summaristt.cloudfunctions.net/getBooksByAuthorOrTitle?search=${search}`;
  try {
    const response = await axios.get(searchURL);
    const data = response.data;
    return data || [];
  } catch (error) {
    console.error("Error fetching data: ", error);
    return [];
  }
}

export default function Searchbar({ onMenuClick }: SearchbarProps) {
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [books, setBooks] = useState<BookType[]>([]);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (searchKeyword.trim() === "") {
      setBooks([]);
      setShowResults(false);
      return;
    }

    const timer = setTimeout(() => {
      const fetchData = async () => {
        setIsLoading(true);
        const fetchedBooks = await fetchBookData(searchKeyword);
        if (fetchedBooks.length > 0) {
          setBooks(fetchedBooks);
          setShowResults(true);
        } else {
          setBooks([]);
          setShowResults(false);
        }
        setIsLoading(false);
      };
      fetchData();
    }, 300);

    return () => clearTimeout(timer);
  }, [searchKeyword]);

  function getUserKeyword(event: React.ChangeEvent<HTMLInputElement>) {
    const keyword = event.target.value || "";
    setSearchKeyword(keyword);
  }
  const clearSearch = () => {
    setSearchKeyword("");
    setBooks([]);
    setShowResults(false);
  };
  const handleBookClick = () => {
    setTimeout(() => {
      clearSearch();
    }, 500);
  };

  return (
    <div className="search__background">
      <div className="search__wrapper">
        <figure className=""></figure>
        <div className="search__content">
          <div className="search">
            <div className="search__input--wrapper">
              <input
                className="search__input"
                placeholder="Search for books"
                type="text"
                value={searchKeyword}
                onChange={getUserKeyword}
              ></input>
              <div className="search__icon" onClick={clearSearch}>
                {showResults ? <FaTimes /> : <CiSearch />}
              </div>
            </div>
          </div>
          <div className="sidebar__toggle--btn" onClick={onMenuClick}>
          <RxHamburgerMenu />
          </div>
        </div>
        {showResults && (
          <div className="search__books--wrapper">
            {isLoading ? (
              Array(3)
                .fill(null)
                .map((_, index) => (
                  <div>
                    <div className="skeleton__wrapper">
                      <div className="skeleton skeleton__bookImg"></div>
                      <div className="skeleton__content">
                        <div className="skeleton skeleton__title"></div>
                        <div className="skeleton skeleton__author"></div>
                        <div className="skeleton skeleton__duration"></div>
                      </div>
                    </div>
                  </div>
                ))
            ) : books.length > 0 ? (
              books.map((book) => (
                <Link
                  href={`/book/${book.id}`}
                  className="search__book--link"
                  key={book.id}
                  onClick={handleBookClick}
                >
                  <figure className="search__bookImg--wrapper">
                    <img className="book__image" src={book.imageLink} />
                  </figure>
                  <div>
                    <div className="search__book--title">{book.title}</div>
                    <div className="search__book--author">{book.author}</div>
                    <div className="search__book--duration">
                      <div className="recommended__book--details">
                        <div className="recommended__book--details-icon">
                          <TfiTime />
                        </div>
                        <div className="recommended__book--details-text">
                          <Duration audioUrl={book.audioLink} />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div>No results found</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
