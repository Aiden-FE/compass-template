declare module 'next' {
  import { NextComponentType } from 'next';

  export interface NextComponentType extends NextComponentType {
    layout?: string;
  }
}
