import {
  EnumDisplayType,
  EnumSortDirection,
  EnumSortType,
  EnumTag,
} from '../types/todos';

export const Tags = Object.freeze({
  [EnumTag.Personal]: {
    label: 'Personal',
    value: EnumTag.Personal,
    color: 'blue',
  },
  [EnumTag.Work]: {
    label: 'Work',
    value: EnumTag.Work,
    color: 'gray',
  },
  [EnumTag.Shopping]: {
    label: 'Shopping',
    value: EnumTag.Shopping,
    color: 'orange',
  },
  [EnumTag.Errand]: {
    label: 'Errand',
    value: EnumTag.Errand,
    color: 'violet',
  },
  [EnumTag.Home]: {
    label: 'Home',
    value: EnumTag.Home,
    color: 'green',
  },
  [EnumTag.Important]: {
    label: 'Important',
    value: EnumTag.Important,
    color: 'red',
  },
});

export const DisplayTypes = Object.freeze({
  [EnumDisplayType.All]: {
    label: 'All',
    value: EnumDisplayType.All,
  },
  [EnumDisplayType.NotDone]: {
    label: 'Not Done',
    value: EnumDisplayType.NotDone,
  },
  [EnumDisplayType.Done]: {
    label: 'Done',
    value: EnumDisplayType.Done,
  },
});

export const SortType = Object.freeze({
  [EnumSortType.DateAdded]: {
    label: 'Date Added',
    value: EnumSortType.DateAdded,
  },
  [EnumSortType.DateUpdated]: {
    label: 'Date Updated',
    value: EnumSortType.DateUpdated,
  },
});

export const isDefaultSort = (
  sortType: EnumSortType,
  sortDirection: EnumSortDirection
) =>
  sortType === EnumSortType.DateAdded &&
  sortDirection === EnumSortDirection.Asc;

export const isAscending = (sortDirection: EnumSortDirection) =>
  sortDirection === EnumSortDirection.Asc;

export const isDefaultFilter = (displayType: EnumDisplayType) =>
  displayType === EnumDisplayType.All;
