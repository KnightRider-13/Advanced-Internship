import AudioPlayer from "@/app/components/UI/AudioPlayer";
import axios from "axios";

const fetchBookData = async (bookId: string) => {
  const response = await axios.get(
    `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${bookId}`
  );
  const data = response.data;
  return data;
};

export default async function Player({ params }: { params: { id: string } }) {
  const { id } = await params;
  const bookData = await fetchBookData(id);
  const isLoading = !bookData;

  return (
    <>
      <div className="summary">
        {isLoading ? (
          <div className="loading-wrapper">
            <div className="loading-circle"></div>
          </div>
        ) : (
          <div className="audio__book--summary player__text">
            <div className="audio__book--summary-title">
              <b>{bookData.title}</b>
            </div>
            <div className="audio__book--summary-text">{bookData.summary}</div>
          </div>
        )}
      </div>
      <div className="audio__wrapper">
        <div className="audio__track--wrapper">
          <figure className="audio__track--image-mask">
            <figure className="book__image--wrapper player__book--img-wrapper">
              {isLoading ? <div className="skeleton skeleton__player--img"></div> : <img
                className="book__image"
                src={bookData.imageLink}
                alt="book"
              />}
            </figure>
          </figure>
          <div className="audio__track--details-wrapper">
            {isLoading ? <div className="skeleton skeleton__player--title"></div> : <div className="audio__track--title">{bookData.title}</div>}
            {isLoading ? <div className="skeleton skeleton__player--author"></div> :  <div className="audio__track--author">{bookData.author}</div>}
          </div>
        </div>
        <AudioPlayer audioUrl={bookData.audioLink} />
      </div>
    </>
  );
}
