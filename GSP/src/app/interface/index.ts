export interface ColumnSettings {
    field: string;
    title?: string;
    filter?: 'string'|'numeric'|'date'|'boolean';
    format?: string;
    _width?: any;
    filterable?: boolean;
    orderIndex?: number;
    sortable?:boolean;
    isLinkButton?:boolean;
    isButton?:boolean;
    isImageButton?: boolean;
    isDiv?:boolean,
    callBackfunction?: any;
    src?:any;
    imageTitle?:any;
    isfooter? :boolean
    footerValue?:string;
    style?:any,
    class?:any,
    hidden?:boolean,
    headerClass?:any,
    footerClass?:any,
    locked?:boolean

}
