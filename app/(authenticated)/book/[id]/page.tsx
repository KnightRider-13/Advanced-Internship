import BookActions from "@/app/components/auth/BookActions";
import Duration from "@/app/components/UI/Duration";
import { auth } from "@/firebase";
import { BookType } from "@/types/book";
import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";
import { CiMicrophoneOn, CiStar } from "react-icons/ci";
import { HiOutlineLightBulb } from "react-icons/hi";
import { TfiTime } from "react-icons/tfi";

async function fetchBookData(id: string): Promise<BookType | null> {
  const bookURL = `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`;
  try {
    const response = await axios.get(bookURL);
    return response.data || null;
  } catch (error) {
    console.error("Error fetching book data: ", error);
    return null;
  }
}

export default async function BookPage({ params }: { params: { id: string } }) {
  const user = await new Promise<any>((resolve) => {
    onAuthStateChanged(auth, (user) => {
      resolve(user);
    });
  });
  const { id } = await params;
  const data = await fetchBookData(id);
  const isLoading = !data;

  return (
    <div className="container">
      <div className="row">
        <div className="inner__wrapper">
          <div className="inner__book">
            <div className="inner-book__title">
              {isLoading ? (
                <div className="skeleton skeleton__book--title"></div>
              ) : (
                data?.title
              )}
            </div>
            <div className="inner-book__author">
              {isLoading ? (
                <div className="skeleton skeleton__book--author"></div>
              ) : (
                data?.author
              )}
            </div>
            <div className="inner-book__sub--title">
              {isLoading ? (
                <div className="skeleton skeleton__book--sub-title"></div>
              ) : (
                data?.subTitle
              )}
            </div>
            <div className="inner-book__wrapper">
              {isLoading ? (
                <div className="skeleton skeleton__description--wrapper"></div>
              ) : (
                <div className="inner-book__description--wrapper">
                  <div className="inner-book__description skeleton-wrapper">
                    <div className="inner-book__icon">
                      <CiStar />
                    </div>
                    <div className="inner-book__overall--rating">
                      {data?.averageRating}
                    </div>
                    <div className="inner-book__total--rating">{`(${data?.totalRating} ratings)`}</div>
                  </div>
                  <div className="inner-book__description skeleton-wrapper">
                    <div className="inner-book__icon">
                      <TfiTime />
                    </div>
                    <div className="inner-book__duration">
                      <Duration audioUrl={data?.audioLink} />
                    </div>
                  </div>
                  <div className="inner-book__description skeleton-wrapper">
                    <div className="inner-book__icon">
                      <CiMicrophoneOn />
                    </div>
                    <div className="inner-book__type">{data?.type}</div>
                  </div>
                  <div className="inner-book__description skeleton-wrapper">
                    <div className="inner-book__icon">
                      <HiOutlineLightBulb />
                    </div>
                    <div className="inner-book__key--ideas">{`${data?.keyIdeas} Key ideas`}</div>
                  </div>
                </div>
              )}
            </div>
            {isLoading ? (
              <div className="skeleton skeleton__description--wrapper"></div>
            ) : (
              <BookActions data={data} />
            )}

            <div className="inner-book__secondary--title">
              {isLoading ? (
                <div className="skeleton skeleton-secondary-title"></div>
              ) : (
                "What's it about?"
              )}
            </div>
            <div className="inner-book__tags--wrapper">
              <div className="inner-book__tag">
                {isLoading ? (
                  <div className="skeleton skeleton-tag"></div>
                ) : (
                  data?.tags[0]
                )}
              </div>
              <div className="inner-book__tag">
                {isLoading ? (
                  <div className="skeleton skeleton-tag"></div>
                ) : (
                  data?.tags[1]
                )}
              </div>
            </div>
            <div className="inner-book__book--description">
              {isLoading ? (
                <div className="skeleton skeleton-description"></div>
              ) : (
                data?.bookDescription
              )}
            </div>
            <h2 className="inner-book__secondary--title">
              {isLoading ? (
                <div className="skeleton skeleton-secondary-title"></div>
              ) : (
                "About the author"
              )}
            </h2>
            <div className="inner-book__author--description">
              {isLoading ? (
                <div className="skeleton skeleton-description"></div>
              ) : (
                data?.authorDescription
              )}
            </div>
          </div>
          <div className="inner__book--image-wrapper">
            <figure className="inner__book__image--wrapper">
              {isLoading ? (
                <div className="skeleton skeleton-image"></div>
              ) : (
                <img src={data?.imageLink} className="book__image" />
              )}
            </figure>
          </div>
        </div>
      </div>
    </div>
  );
}
