
export interface IBlog {
  id?: number;
  name?: string;
  handle?: string;
 
}

export const defaultValue: Readonly<IBlog> = {
  name: '',
  handle: '',
};
