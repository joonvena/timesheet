export interface IHour {
  id: number;
  client: string;
  task: string;
  hours: number;
  date: Date;
  week: string;
}

export interface IDay {
  day: string;
  tasks: IHour[] | null;
  removeElement?: (hourId: number) => void;
}

export interface IMenu {
  menu: SVGSVGElement | null;
  closeMenu: () => void;
  deleteHours: (hourId: number) => void;
  hourId: number;
}
