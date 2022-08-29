import {ReactWrapper, ShallowWrapper} from 'enzyme';


export const testAttr = (val:string) => {
    // return process.env.NODE_ENV !== "production" ? {} : { "data-test": val };
    return { "data-test": val };
};

export const findByTestAttr = (wrapper: ShallowWrapper|ReactWrapper, val:string):any=>{
    return wrapper.find(`[data-test='${val}']`);
}
