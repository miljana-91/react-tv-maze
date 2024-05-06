import React, { ReactElement, memo } from 'react';
import './Role.scss';
import { IRole } from '../../models/role.model';

const Role = ({ role }: { role: IRole }): ReactElement => {
  const getYear = (role: IRole): string => {
    const dateParts: string[] = role._embedded.show.premiered.split('-');
    return dateParts[0];
  };

  return (
    <div className="role">
      <img
        src={
          role._embedded.show.image ? role._embedded.show.image.medium : `${process.env.PUBLIC_URL}/images/no-img.png`
        }
        alt={role._links.show.name}
      />
      <div className="role__info">
        <h3 className="role__info__title">
          {role._embedded.show.name} ({getYear(role)})
        </h3>
        <p>
          <b>Character: </b>
          <span>{role._links.character.name}</span>
        </p>
      </div>
    </div>
  );
};

export default memo(Role);
