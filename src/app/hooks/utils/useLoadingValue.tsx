import React from "react";

export enum State {
  ERROR,
  LOADING,
  SUCCESS,
}

interface UseLoadingValueProps<T> {
  init: T;
}

type LoadingValue<T> =
  | { state: State.ERROR; message: string }
  | { state: State.LOADING }
  | { state: State.SUCCESS; value: T };

export const useLoadingValue = <T,>({ init }: UseLoadingValueProps<T>) => {
  const [loadingState, setLoadingState] = React.useState<LoadingValue<T>>({
    state: State.LOADING,
  });

  const setLoadedValue = (value: T | ((data: T) => T)) => {
    if (typeof value === "function") {
      const fn = value as Function;
      setLoadingState((prev) => {
        const args = prev.state === State.SUCCESS ? prev.value : init;
        return { state: State.SUCCESS, value: fn(args) };
      });
    } else {
      setLoadingState({ state: State.SUCCESS, value: value });
    }
  };

  const setError = (message?: string) =>
    setLoadingState({ state: State.ERROR, message: message ?? "" });

  return {
    state: loadingState,
    setValue: setLoadedValue,
    setError: setError,
  };
};
