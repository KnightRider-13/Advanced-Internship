import Recommended from "@/app/components/auth/Recommended";
import Suggested from "@/app/components/auth/Suggested";
import axios from "axios";
import Link from "next/link";
import { FaPlay } from "react-icons/fa";

interface BookData {
  id: string;
  author: string;
  title: string;
  subTitle: string;
  imageLink: string;
  audioLink: string;
}

async function fetchBookData(): Promise<BookData | null> {
  const selectedURL =
    "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=selected";
  try {
    const response = await axios.get(selectedURL);
    const data = response.data[0];
    return data || null;
  } catch (error) {
    console.error("Error fetching data: ", error);
    return null;
  }
}
export default async function ForYou() {
  const data = await fetchBookData();

  return (
    <div className="container">
      <div className="row auth__row">
        <div className="for-you__wrapper">
          <div className="for-you__title">Selected just for you</div>
          {!data ? (
            <div className="skeleton skeleton__selected"></div>
          ) : (
            <Link href={`/book/${data!.id}`} className="selected__book">
              <div className="selected__book--sub-title">{data!.subTitle}</div>
              <div className="selected__book--line"></div>
              <div className="selected__book--content">
                <figure className="book__image--wrapper-custom">
                  <img src={data!.imageLink} className="book__image" />
                </figure>
                <div className="selected__book--text">
                  <div className="selected__book--title">{data!.title}</div>
                  <div className="selected__book--author">{data!.author}</div>
                  <div className="selected__book--duration-wrapper">
                    <div className="selected__book--icon">
                      <div className="selected__book--icon-play">
                        <FaPlay />
                      </div>
                    </div>
                    <div className="selected__book--duration">
                      3 mins 23 secs
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          )}

          <div>
            <div className="for-you__title">Recommended For You</div>
            <div className="for-you__sub--title">
              We think you’ll like these
            </div>
            <Recommended />
          </div>
          <div>
            <div className="for-you__title">Suggested Books</div>
            <div className="for-you__sub--title">Browse those books</div>
            <Suggested />
          </div>
        </div>
      </div>
    </div>
  );
}
