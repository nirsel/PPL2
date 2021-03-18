import { apply, compose, pipe } from "ramda";

export type State<S, A> = (initialState: S) => [S, A];

export const bind: <S, A, B>(state: State<S, A>, f: (x: A) => State<S, B>) => State<S, B> = <S, A, B>(state: State<S, A>,f: (x:A)=>State<S, B>) => {
    const func = (x:S):[S,B] =>{
        return f(state(x)[1])(state(x)[0]);
    };
    return func;
}


     
   

