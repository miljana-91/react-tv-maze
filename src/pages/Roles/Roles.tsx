import React, { ReactElement, ReactNode, useEffect, useState } from 'react';
import { IRole } from '../../models/role.model';
import './Roles.scss';
import { NavigateFunction, Params, useNavigate, useParams } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Role from '../../components/Role/Role';
import Pagination from '../../components/Pagination/Pagination';
import { v4 as uuid } from 'uuid';

const Roles = (): ReactElement => {
  const navigate: NavigateFunction = useNavigate();
  const params: Readonly<Params<string>> = useParams();
  const [roles, setRoles] = useState<IRole[]>([]);
  const [pageOfItems, setPageOfItems] = useState<IRole[]>([]);

  useEffect(() => {
    fetch(`https://api.tvmaze.com/people/${params.id}/castcredits?embed=show`)
      .then((response: Response) => response.json())
      .then((data: IRole[]) => {
        setRoles(data);
      });
  }, [params.id]);

  const navigateBack = (): void => {
    navigate(-1);
  };

  const onChangePage = (pageOfItems: IRole[]): void => {
    // update state with new page of items
    setPageOfItems(pageOfItems);
  };

  return (
    <section className="roles-page">
      <div className="roles-page__roles">
        {pageOfItems.map(
          (role: IRole): ReactNode => (
            <Role key={uuid()} role={role} />
          ),
        )}
      </div>
      <Pagination items={roles} onChangePage={onChangePage} initialPage={1} pageSize={20} />
      <Button label="BACK" onButtonClick={navigateBack} />
    </section>
  );
};

export default Roles;
