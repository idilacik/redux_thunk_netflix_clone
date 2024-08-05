import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import Error from "../components/Error";
import api from "../utils/api";
import { baseImgUrl } from "../constants";
import DetailDisplay from "../components/DetailDisplay";
import millify from "millify";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import ActorCard from "../components/ActorCard";

const DetailPage = () => {
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);

  //* URL'den filmin id'sini bulmak icin useParams kullandik
  const { id } = useParams();
  useEffect(() => {
    const params = {
      append_to_response: "credits,videos",
    };

    api
      .get(`/movie/${id}`, { params })
      .then((res) => setMovie(res.data))
      .catch((err) => setError(err.message));
  }, []);
  return (
    <div>
      {!movie ? (
        <Loader />
      ) : error ? (
        <Error />
      ) : (
        <>
          <div className="h-[20vh] relative">
            <img
              src={baseImgUrl + movie.backdrop_path}
              className="h-full w-full object-cover"
            />
            <div className="absolute bg-black bg-opacity-50 inset-0 grid place-items-center">
              <h2 className="md:text-3xl text-2xl font-semibold">
                {movie.title}
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 my-10">
            <div>
              <DetailDisplay title="Kategoriler" data={movie.genres} />

              <DetailDisplay
                title={"Konuşulan Diller"}
                data={movie.spoken_languages}
              />

              <DetailDisplay
                title={"Yapımcı Şirketler"}
                data={movie.production_companies}
              />

              <DetailDisplay
                data={movie.production_countries}
                title={"Yapımcı Ülkeler"}
              />
            </div>

            <div className="flex flex-col gap-2">
              <p>{movie.overview}</p>
              <p>
                <span>Bütçe:</span>
                <span className="text-green-500 ms-2">
                  ${millify(movie.budget)}
                </span>
              </p>
              <p>
                <span>Hasılat:</span>
                <span className="text-green-500 ms-2">
                  ${millify(movie.revenue)}
                </span>
              </p>
            </div>
          </div>

          <div>
            <Splide
              options={{
                autoWidth: true,
                pagination: false,
                lazyLoad: true,
              }}
            >
              {movie?.credits?.cast.map((actor, i) => (
                <SplideSlide key={i}>
                  <ActorCard actor={actor} />
                </SplideSlide>
              ))}
            </Splide>
          </div>
        </>
      )}
    </div>
  );
};

export default DetailPage;
