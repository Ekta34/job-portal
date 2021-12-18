import { City, Country } from './Location';

interface Remote {
  id: string;
  name: string;
  type: string;
  jobs?: Job[];
}
export interface Job {
  id: string;
  title: string;
  company?: { id: string; name: string };
  cities?: City[];
  countries?: Country[];
  remotes?: Remote[];
}
