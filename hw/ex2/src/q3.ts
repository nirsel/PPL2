import { unparseL31,makeVarDecl, DefineExp, isAppExp, isCExp, isDefineExp, isIfExp, isLitExp, makeLetExp,Binding, makeDefineExp, makeAppExp, CExp, ClassExp, ProcExp,  Exp, Program, makeIfExp, parseL31CExp, parseL31, IfExp, makeProcExp, parseSExp, isClassExp, makeProgram, isProgram, isAtomicExp, isCompoundExp, isBinding, isBoolExp, isLetExp, isNumExp, isPrimOp, isProcExp, isStrExp, isVarDecl, isVarRef, makeLitExp, makeBoolExp, AppExp, makePrimOp, makeVarRef } from "./L31-ast";
import { Result, makeFailure, mapResult,makeOk, bind } from "../shared/result";
import { map, zipWith, reduce } from "ramda";
import { parse as p, isSexpString, isToken } from "../shared/parser";
import { rest } from "../shared/list";
import {makeSymbolSExp  } from "../imp/L3-value";


/*
Purpose: Transform ClassExp to ProcExp
Signature: for2proc(classExp)
Type: ClassExp => ProcExp
*/

export const makeBody = (exp: Binding[],i:number) : CExp =>{
    if (i===exp.length)
        return makeBoolExp(false);
    const app:AppExp = makeAppExp(makePrimOp('eq?'),[makeVarRef('msg'),makeLitExp(makeSymbolSExp(exp[i].var.var))]);
    const then:Result<CExp> = bind(p('('+unparseL31(exp[i].val)+' )'),parseL31CExp);
    const alt:CExp = makeBody(exp,i+1);
    if (then.tag==="Ok")
        return makeIfExp(app,then.value,alt);
    return makeBoolExp(false);
    
}
export const class2proc = (exp: ClassExp): ProcExp =>{
    if (exp.methods.length===0)
        return makeProcExp(exp.fields,[]);
    const res = makeProcExp([makeVarDecl('msg')],[makeBody(exp.methods,0)]);
    return makeProcExp(exp.fields,[res]);
}

    

/*
Purpose: Transform L31 AST to L3 AST
Signature: l31ToL3(l31AST)
Type: [Exp | Program] => Result<Exp | Program>
*/
export const L31ToL3 = (exp: Exp | Program): Result<Exp | Program> => {
    if (exp.tag==="Program")
        return makeOk(makeProgram(map(rewriteAllClass, exp.exps)));
    return makeOk(rewriteAllClass(exp));
}

const rewriteAllClass = (e: Exp): Exp =>
    isDefineExp(e)? makeDefineExp(e.var,reWriteCExp(e.val)):
    isBoolExp(e) ? e :
    isNumExp(e) ? e :
    isPrimOp(e) ? e :
    isVarRef(e) ? e :
    isVarDecl(e) ? e :
    isIfExp(e) ?  (makeIfExp(reWriteCExp(e.test),
                                      reWriteCExp(e.then),
                                      reWriteCExp(e.alt))) :
    isAppExp(e) ? makeAppExp(reWriteCExp(e.rator), map(reWriteCExp, e.rands)) :
    isProcExp(e)? makeProcExp(e.args, map(reWriteCExp,e.body)):
    isClassExp(e) ? class2proc(e):
    isLetExp(e)? makeLetExp(e.bindings,map(reWriteCExp,e.body)):
    isLitExp(e) ? e: 
    e;

const reWriteCExp = (e:CExp):CExp=>
isBoolExp(e) ? e :
isNumExp(e) ? e :
isPrimOp(e) ? e :
isVarRef(e) ? e :
isVarDecl(e) ? e :
isIfExp(e) ?  (makeIfExp(reWriteCExp(e.test),
                                  reWriteCExp(e.then),
                                  reWriteCExp(e.alt))) :
isAppExp(e) ? makeAppExp(reWriteCExp(e.rator), map(reWriteCExp, e.rands)) :
isProcExp(e)? makeProcExp(e.args, map(reWriteCExp,e.body)):
isClassExp(e) ? class2proc(e):
isLetExp(e)? makeLetExp(e.bindings,map(reWriteCExp,e.body)):
isLitExp(e) ? e: 
e;

    


    

    
