"use client";

import { CiSearch } from "react-icons/ci";

export default function Searchbar() {
  return (
    <div className="search__background">
      <div className="search__wrapper">
        <figure className="">
          
        </figure>
        <div className="search__content">
          <div className="search">
            <div className="search__input--wrapper">
                <input className="search__input" placeholder="Search for books" type="text"></input>
                <div className="search__icon">
                    <CiSearch />
                </div>
            </div>
          </div>
          <div className="search__toggle--btn"></div>
        </div>
      </div>
    </div>
  );
}
