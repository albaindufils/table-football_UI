

export interface ISelectProps {
    initialValue?:string,
    title?:string,
    name?:string,
    required?:boolean,
    placeholder?:string,
    onChange?: (value: any) => void
}