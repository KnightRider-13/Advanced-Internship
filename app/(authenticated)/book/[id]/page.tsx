import axios from "axios";
import { CiBookmark, CiMicrophoneOn, CiStar } from "react-icons/ci";
import { FaReadme } from "react-icons/fa";
import { HiOutlineLightBulb } from "react-icons/hi";
import { TfiTime } from "react-icons/tfi";

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

async function fetchBookData(id: string): Promise<BookData | null> {
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
  const {id} = await params;
  const data = await fetchBookData(id);
  return (
    <>
      <div className="row">
        <div className="inner__wrapper">
          <div className="inner__book">
            <div className="inner-book__title">{data?.title}</div>
            <div className="inner-book__author">{data?.author}</div>
            <div className="inner-book__sub--title">{data?.subTitle}</div>
            <div className="inner-book__wrapper">
              <div className="inner-book__description--wrapper">
                <div className="inner-book__description">
                  <div className="inner-book__icon"><CiStar /></div>
                  <div className="inner-book__overall--rating">{data?.averageRating}&nbsp;</div>
                  <div className="inner-book__total--rating">{`(${data?.totalRating} ratings)`}</div>
                </div>
                <div className="inner-book__description">
                  <div className="inner-book__icon"><TfiTime /></div>
                  <div className="inner-book__duration">03:24</div>
                </div>
                <div className="inner-book__description">
                  <div className="inner-book__icon"><CiMicrophoneOn /></div>
                  <div className="inner-book__type">{data?.type}</div>
                </div>
                <div className="inner-book__description">
                  <div className="inner-book__icon"><HiOutlineLightBulb /></div>
                  <div className="inner-book__key--ideas"></div>
                  <div className="inner-book__read--text">{`${data?.keyIdeas} Key ideas`}</div>
                </div>
              </div>
            </div>
            <div className="inner-book__read--btn-wrapper">
              <button className="inner-book__read--btn">
                <div className="inner-book__read--icon"><FaReadme /></div>
                <div className="inner-book__read--text">Read</div>
              </button>
              <button className="inner-book__read--btn">
                <div className="inner-book__read--icon"><CiMicrophoneOn /></div>
                <div className="inner-book__read--text">Listen</div>
              </button>
            </div>
            <div className="inner-book__bookmark">
              <div className="inner-book__bookmark--icon"><CiBookmark /></div>
              <div className="inner-book__bookmark--text">
                Add title to My Library
              </div>
            </div>
            <div className="inner-book__secondary--title">What's it about?</div>
            <div className="inner-book__tags--wrapper">
              <div className="inner-book__tag">{data?.tags[0]}</div>
              <div className="inner-book__tag">{data?.tags[1]}</div>
            </div>
            <div className="inner-book__book--description">{data?.bookDescription}</div>
            <h2 className="inner-book__secondary--title">About the author</h2>
            <div className="inner-book__author--description">{data?.authorDescription}</div>
          </div>
          <div className="inner__book--image-wrapper">
            <figure className="inner__book__image--wrapper">
              <img src={data?.imageLink} className="book__image" />
            </figure>
          </div>
        </div>
      </div>
    </>
  );
}
