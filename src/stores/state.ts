
import type { AnyObject } from './../../env.d';
const initState = ( key:string, defaultVal:any, parse=true ) => {
    return localStorage[key]
      ? parse
        ? JSON.parse(localStorage[key])
        : localStorage[key]
      : defaultVal;
};
export interface StoreState{
    isLogin:Boolean,
		userProfile:AnyObject
}
const state:StoreState = {
    isLogin:initState('userProfile', false),
		userProfile:initState('userProfile', {})
}
export default state