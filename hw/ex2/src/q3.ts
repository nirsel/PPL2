import { CExp, Binding, ClassExp, ProcExp,  Exp, Program, makeIfExp, parseL31CExp, parseL31, IfExp, makeProcExp, parseSExp, isClassExp, makeProgram, isProgram, isAtomicExp, isCompoundExp, isBinding, isBoolExp, isLetExp, isNumExp, isPrimOp, isProcExp, isStrExp, isVarDecl, isVarRef } from "./L31-ast";
import { Result, makeFailure, mapResult,makeOk, bind } from "../shared/result";
import { map, zipWith } from "ramda";
import { parse as p, isSexpString, isToken } from "../shared/parser";
import { rest } from "../shared/list";
import { isAppExp, isCExp, isDefineExp, isIfExp, isLitExp } from "../imp/L3-ast";


/*
Purpose: Transform ClassExp to ProcExp
Signature: for2proc(classExp)
Type: ClassExp => ProcExp
*/

export const makeBody = (exp: Binding[]) : Result<CExp[]> =>{
    const cexp = mapResult((b:Binding)=>bind(p('eq? msg '+b.var.var),parseL31CExp),exp);
    if (cexp.tag==='Failure')
        return makeFailure('failure');
    return makeOk(cexp.value);
}
export const class2proc = (exp: ClassExp): ProcExp =>{
    const res = makeBody(exp.methods);
    if (res.tag==="Ok")
        return makeProcExp(exp.fields, res.value);
    return makeProcExp(exp.fields,[]);
}

    

/*
Purpose: Transform L31 AST to L3 AST
Signature: l31ToL3(l31AST)
Type: [Exp | Program] => Result<Exp | Program>
*/
export const L31ToL3 = (exp: Exp | Program): Result<Exp | Program> => {
    if (exp.tag==="Program")
        return makeOk(makeProgram(map((x:Exp)=>reWriteClass(x),exp.exps)));
    return makeOk(reWriteClass(exp));
}

export const reWriteClass = (e: Exp):Exp=>
isDefineExp(e)? e:
isNumExp(e)? e:
isBoolExp(e)? e: 
isStrExp(e)? e: 
isPrimOp(e)? e:
isVarRef(e)? e:
isVarDecl(e)? e: 
isAppExp(e)? e: 
isIfExp(e)? e: 
isProcExp(e)? e: 
isBinding(e)? e: 
isLetExp(e)? e: 
isLitExp(e)? e: 
isClassExp(e)? class2proc(e):
e


    

    
