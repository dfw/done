import { EnumTag } from '../types/todos';

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
