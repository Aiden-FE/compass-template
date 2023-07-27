import { NextComponentType } from 'next';

declare module 'next' {
  export interface NextComponentType extends NextComponentType {
    layout?: string;
  }
}
