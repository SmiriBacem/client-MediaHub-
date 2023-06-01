import { atom } from 'jotai';
import { IUser } from '../helper/interfaces/userInterface';

export const userAtom = atom<IUser | null>(null);