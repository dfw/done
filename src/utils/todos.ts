import { EnumSortDirection, EnumSortType, EnumTag } from '../types/todos';

export const Tags = Object.freeze([
  {
    label: EnumTag.Personal,
  },
  {
    label: EnumTag.Work,
  },
  {
    label: EnumTag.Shopping,
  },
  {
    label: EnumTag.Errand,
  },
  {
    label: EnumTag.Home,
  },
  {
    label: EnumTag.Important,
  },
]);

export const TagColors = Object.freeze({
  [EnumTag.Personal]: 'blue',
  [EnumTag.Work]: 'gray',
  [EnumTag.Shopping]: 'orange',
  [EnumTag.Errand]: 'violet',
  [EnumTag.Home]: 'green',
  [EnumTag.Important]: 'red',
});

export const isDefaultSort = (
  sortType: EnumSortType,
  sortDirection: EnumSortDirection
) =>
  sortType === EnumSortType.DateAdded &&
  sortDirection === EnumSortDirection.Asc;

export const isAscending = (sortDirection: EnumSortDirection) =>
  sortDirection === EnumSortDirection.Asc;
