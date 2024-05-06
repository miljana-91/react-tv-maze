import React, { Fragment, ReactElement } from 'react';
import './CastActor.scss';
import Button from '../Button/Button';
import { ICastPerson } from '../../models/cast-person.model';
import { NavigateFunction, useNavigate } from 'react-router-dom';

const CastActor = ({ actor }: { actor: ICastPerson }): ReactElement => {
  const navigate: NavigateFunction = useNavigate();

  const navigateToRoles = (): void => {
    navigate(`/roles/${actor.person.id.toString()}`);
  };

  return (
    <Fragment>
      <div className="cast-actor">
        <img
          src={actor.person.image ? actor.person.image.medium : `${process.env.PUBLIC_URL}/images/no-img.png`}
          alt="show-img"
        />
        <div className="cast-actor__info">
          <h4>{actor.person.name}</h4>
          <p>
            <b>Birth date: </b>
            <span>{actor.person.birthday}</span>
          </p>
          <p>
            <b>Character: </b>
            <span>{actor.character.name}</span>
          </p>
          <Button onButtonClick={navigateToRoles} label="MORE ROLES" />
        </div>
      </div>
    </Fragment>
  );
};

export default CastActor;
