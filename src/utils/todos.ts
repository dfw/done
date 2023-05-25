import { IconSortAscending, IconSortDescending } from '@tabler/icons-react';
import {
  EnumDisplayType,
  EnumSortDirection,
  EnumSortType,
  EnumTag,
} from '../types/todos';

export const TAGS = Object.freeze({
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

export const DISPLAY_TYPES = Object.freeze({
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

export const SORT_TYPES = Object.freeze({
  [EnumSortType.DateAdded]: {
    label: 'Date Added',
    value: EnumSortType.DateAdded,
  },
  [EnumSortType.DueDate]: {
    label: 'Due Date',
    value: EnumSortType.DueDate,
  },
});

export const SORT_DIRECTIONS = Object.freeze({
  [EnumSortDirection.Ascending]: {
    icon: IconSortAscending,
    value: EnumSortDirection.Ascending,
  },
  [EnumSortDirection.Descending]: {
    icon: IconSortDescending,
    value: EnumSortDirection.Descending,
  },
});

export const isDefaultSort = (
  sortType: EnumSortType,
  sortDirection: EnumSortDirection
) =>
  sortType === EnumSortType.DateAdded &&
  sortDirection === EnumSortDirection.Descending;

export const isAscending = (sortDirection: EnumSortDirection) =>
  sortDirection === EnumSortDirection.Ascending;

export const isDefaultFilter = (displayType: EnumDisplayType) =>
  displayType === EnumDisplayType.All;
