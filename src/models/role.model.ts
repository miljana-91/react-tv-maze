import { IShow } from './show.model';

export interface IRole {
  self: boolean;
  voice: boolean;
  _embedded: {
    show: IShow;
  };
  _links: {
    character: Character;
    show: ShowLink;
  };
}

type Character = {
  href: string;
  name: string;
};

type ShowLink = {
  href: string;
  name: string;
};
