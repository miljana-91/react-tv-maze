import { NavigateFunction, Params, useNavigate, useParams } from 'react-router-dom';
import './Cast.scss';
import React, { ReactElement, useEffect, useMemo, useState } from 'react';
import { ICastPerson } from '../../models/cast-person.model';
import CastActor from '../../components/CastActor/CastActor';
import Loader from '../../components/Loader/Loader';
import Button from '../../components/Button/Button';
import NoResults from '../../components/NoResults/NoResults';
import { v4 as uuid } from 'uuid';

const Cast = (): ReactElement => {
  const params: Readonly<Params<string>> = useParams();
  const navigate: NavigateFunction = useNavigate();
  const [cast, setCast] = useState<ICastPerson[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch(`https://api.tvmaze.com/shows/${params.id}/cast`)
      .then((response) => response.json())
      .then((cast: ICastPerson[]) => {
        window.scrollTo({ top: 500, behavior: 'smooth' });
        setCast(cast.length ? cast : null);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setCast(null);
        setIsLoading(false);
      });
  }, [params.id]);

  const navigateToShows = (): void => {
    navigate(-1);
  };

  const displayCast = useMemo(() => {
    if (isLoading) {
      return <Loader />;
    }

    if (cast && !isLoading) {
      return cast.map((actor: ICastPerson) => <CastActor actor={actor} key={uuid()} />);
    }

    if (!isLoading && (!cast || !cast.length)) {
      return <NoResults text="No cast available yet." />;
    }
  }, [cast, isLoading]);

  return (
    <section className="cast-page">
      <div className="cast-page__cast">{displayCast}</div>
      <Button label="BACK" onButtonClick={navigateToShows} />
    </section>
  );
};

export default Cast;
