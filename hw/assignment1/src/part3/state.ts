import { compose, pipe } from "ramda";

export type State<S, A> = (initialState: S) => [S, A];

export const bind: <S, A, B>(state: State<S, A>, f: (x: A) => State<S, B>) => State<S, B> = <S, A, B>(state: State<S, A>,f: (x:A)=>State<S, B>) => {
    const func = pipe(
        (x: S) => state(x),
        (x: [S,A]) => f(x[1])
    );
    return func();
}


     
   

