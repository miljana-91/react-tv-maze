import React, { Dispatch, ReactElement, SetStateAction, useEffect, useState } from 'react';
import './Summary.scss';
import Loader from '../../components/Loader/Loader';
import { NavigateFunction, Params, useNavigate, useParams } from 'react-router-dom';
import Button from '../../components/Button/Button';

const Summary = (): ReactElement => {
  const params: Readonly<Params<string>> = useParams();
  const navigate: NavigateFunction = useNavigate();
  const [data, setData]: [any, Dispatch<SetStateAction<any>>] = useState(null);

  useEffect(() => {
    fetch(`https://api.tvmaze.com/shows/${params.id}`)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      });
  }, [params.id]);

  const getShowsEpisodes = (): void => {
    navigate(`/shows/${params.id}/episodes`);
  };

  const navigateBack = (): void => {
    navigate(-1);
  };

  return data ? (
    <div className="summary">
      <img src={data.image ? data.image.medium : `${process.env.PUBLIC_URL}/images/no-img.png`} alt="show img" />
      <div className="summary__info">
        {data.summary ? <div dangerouslySetInnerHTML={{ __html: data.summary }} /> : 'No summary available yet.'}
        <div className="summary__info__buttons">
          <Button label="GET EPISODES" onButtonClick={getShowsEpisodes} />
          <Button label="BACK" onButtonClick={navigateBack} />
        </div>
      </div>
    </div>
  ) : (
    <Loader />
  );
};

export default Summary;
