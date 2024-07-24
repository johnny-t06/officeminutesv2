import React from "react";

export enum State {
  ERROR,
  LOADING,
  SUCCESS,
}

type LoadingValue<T> =
  | { state: State.ERROR; message: string }
  | { state: State.LOADING }
  | { state: State.SUCCESS; value: T };

export const useLoadingValue = <T,>() => {
  const [loadingState, setLoadingState] = React.useState<LoadingValue<T>>({
    state: State.LOADING,
  });

  const setLoadedValue = (value: T) =>
    setLoadingState({ state: State.SUCCESS, value: value });

  const setError = (message?: string) =>
    setLoadingState({ state: State.ERROR, message: message ?? "" });

  return {
    state: loadingState,
    setValue: setLoadedValue,
    setError: setError,
  };
};
