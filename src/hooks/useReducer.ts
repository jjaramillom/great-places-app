import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux';

import { RootState, AppDispatch } from '@app/store/store';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default () => {
  const dispatch = useDispatch<AppDispatch>();
  const selector: TypedUseSelectorHook<RootState> = useSelector;
  return { dispatch, selector };
};
