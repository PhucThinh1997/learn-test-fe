import { createContext } from 'react';
import { createContextualCan } from '@casl/react';

export const AbilityContext = createContext();
/**
 * Create Can component to validate user permission
 */
export const Can = createContextualCan(AbilityContext.Consumer);
