
import { RefObject } from 'react';

declare module 'framer-motion' {
  export interface UseInViewOptions {
    root?: RefObject<Element> | null;
    margin?: string;
    amount?: 'some' | 'all' | number;
    once?: boolean;
    triggerOnce?: boolean;
    threshold?: number | number[];
  }

  export function useInView(options?: UseInViewOptions): [RefObject<Element>, boolean];
}