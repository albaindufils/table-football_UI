import {Mode} from "../enum/ModeEntity";


export interface IActionContainer {
    updateParentList: () => void,
    mode: Mode,
    callbackModalVisibility?: (val: boolean) => void

}