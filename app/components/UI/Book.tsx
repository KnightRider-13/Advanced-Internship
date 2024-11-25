import Link from "next/link";
import { CiStar } from "react-icons/ci";
import { TfiTime } from "react-icons/tfi";
import Duration from "./Duration";
import { BookType } from "@/types/book";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default async function Book(props: BookType) {
  const {
    id,
    author,
    title,
    subTitle,
    imageLink,
    audioLink,
    averageRating,
    subscriptionRequired,
  } = props;

  return (
    <Link className="for-you__recommended--books-link" href={`/book/${id}`}>
      {subscriptionRequired ? (
        <div className="book__pill book__pill--subscription-required">
          Premium
        </div>
      ) : null}
      <figure className="book__image--wrapper">
        <img src={imageLink} className="book__image" />
      </figure>
      <div className="recommended__book--title">{title}</div>
      <div className="recommended__book--author">{author}</div>
      <div className="recommended__book--sub-title">{subTitle}</div>
      <div className="recommended__book--details-wrapper">
        <div className="recommended__book--details">
          <div className="recommended__book--details-icon">
            <TfiTime />
          </div>
          <div className="recommended__book--details-text"><Duration audioUrl={audioLink}/></div>
        </div>
        <div className="recommended__book--details">
          <div className="recommended__book--details-icon">
            <CiStar />
          </div>
          <div className="recommended__book--details-text">{averageRating}</div>
        </div>
      </div>
    </Link>
  );
}
