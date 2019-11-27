import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { GridBindingDirective } from '../directive/GridBinding';
import { ColumnSettings } from '../interface';
import { Cookies } from './cookies';
import { HttpPost } from './httpPost';

@Injectable()
export class GlobalFunctionVariables {
    constructor(public http: HttpPost, public router: Router
        , private _cookies: Cookies) { }

    isLoading: boolean = false;
    userRights = undefined;
    userLeftMenu = undefined;
    gridDirectiveInfo: GridBindingDirective;
    gridName: string = "";
    showSuccessMessage: boolean = false;
    showErrorMessage: boolean = false;
    SuccessMessageHeader: string = '';
    SuccessMessage: string = '';
    ErrorMessageHeader: string = '';
    ErrorMessage: string = '';
    Successinterval; Errorinterval;
    HeaderText: string = '';
    gridSaveLayout: string = '';

    Post(url, data) {
        this.isLoading = true;
        return this.http.Post(url, data).map(result => {

            this.isLoading = false;

            return result;
        }, error => {
        });
    }
    WithoutLoadingPost(url, data) {

        return this.http.Post(url, data);
    }

    SuccessToss(message, header?) {
        if (header == undefined) this.SuccessMessageHeader = "Success!";
        else this.SuccessMessageHeader = header;

        this.SuccessMessage = message;
        clearInterval(this.Successinterval);
        this.showSuccessMessage = true;
        this.Successinterval = setInterval(() => { this.showSuccessMessage = false; }, 2000)


    }

    ErrorToss(message, header?) {
        if (header == undefined) this.ErrorMessageHeader = "Error!";
        else this.ErrorMessageHeader = header;

        this.ErrorMessage = message;
        clearInterval(this.Errorinterval);
        this.showErrorMessage = true;
        this.Errorinterval = setInterval(() => { this.showErrorMessage = false; }, 2000)
    }

    SaveGridLayout() {
        //gridSaveLayout
        if (this.gridDirectiveInfo != null && this.gridName != ''
            && this.gridDirectiveInfo.getGrid() != undefined) {
            let _gridcolumns = this.gridDirectiveInfo.getGrid().columns.toArray().map(item => {
                return Object.keys(item).filter(propName => !propName.toLowerCase().includes('template'))
                    .reduce((acc, curr) => ({ ...acc, ...{ [curr]: item[curr] } }), <ColumnSettings>{});
            });
            this.http.Post("/usergridsavelayout", {
                userid: localStorage.getItem('userid')
                , gridcolumns: JSON.stringify(_gridcolumns), gridkey: this.gridName
            }).subscribe(data => this._cookies.SetCookie("gridSaveLayout", data.d));

            this.SuccessToss("Layout saved successfully.")
        }
    }



    AddgridColumns(columnsInfo: ColumnSettings) {
        if (columnsInfo.filterable == undefined) columnsInfo.filterable = true;
        if (columnsInfo.sortable == undefined) columnsInfo.sortable = true;
        if (columnsInfo._width == undefined) columnsInfo._width = 80;
        if (columnsInfo.title == undefined) columnsInfo.title = columnsInfo.field;
        if (columnsInfo.hidden == undefined) columnsInfo.hidden = false;

        return columnsInfo;
    }
    DefaultGridLayout() {
        if (this.gridDirectiveInfo != null && this.gridName != '' && this.gridDirectiveInfo.getGrid() != undefined) {

            this.http.Post("/usergridremovelayout", {
                userid: localStorage.getItem('userid'), gridkey: this.gridName
            }).subscribe(data => {
                this._cookies.SetCookie("gridSaveLayout", data.d)
                this.gridSaveLayout = data.d;
            });
            this.SuccessToss("Default Layout set, Please reload to get changes.")
        }
    }
    LoadGridColumns(gridName, columnsConfig) {
        //let returnval = this._cookies.GetCookie("gridSaveLayout")
        let returnval = this.gridSaveLayout == undefined || this.gridSaveLayout == "null" ? null : JSON.parse(this.gridSaveLayout)[gridName];
       // returnval = returnval == undefined || returnval == "null" ? null : JSON.parse(returnval)[gridName]
       let finalcolumnsConfig = [];
       let savedcolumndata = returnval == undefined || returnval == "null" ? null : returnval
        if(savedcolumndata)
        {
            columnsConfig.forEach((itm, i) => {
                finalcolumnsConfig.push(Object.assign({}, itm, savedcolumndata.find(a => a.field == itm.field)));
            });
        } else {
            finalcolumnsConfig = columnsConfig
        }
        return finalcolumnsConfig.sort((a, b) => a.orderIndex - b.orderIndex);
    }

    logout() {
        // remove user from local storage to log user out
        this.http.Post('/logout', {ismobile : 0}).subscribe();
        this.http.clearLocalStorage();
        this.router.navigate(['/login'], { queryParams: {} });
    }

    GetUSerRights = () => {
        this.Post('/userrights', { userid: localStorage.getItem('userid') })
            .subscribe(
                data => {
                    this.userRights = data.userrights;
                    return data.userrights
                });
    }
    checkRights(Name, Rights?) {
        try {
            if (!this.stringIsNullorEmpty(Name) && this.userRights[Name] != undefined) {
                if (Rights == undefined) Rights = 'read';
                switch (Rights.toLowerCase()) {
                    case 'read': {

                        if (this.userRights[Name].r == 1) {
                            return true;
                        }
                        break;
                    }
                    case 'write': {
                        if (this.userRights[Name].w == 1) {
                            return true;
                        }
                        break;
                    }
                    case 'delete': {
                        if (this.userRights[Name].d == 1) {
                            return true;
                        }
                        break;
                    }
                    case 'report': {
                        if (this.userRights[Name].p == 1) {
                            return true;
                        }
                        break;
                    }
                    default: {
                        if (this.userRights[Name].r == 1) {
                            return true;
                        }
                        break;
                    }
                }
            }
        } catch (e) {
            //Nothing
        }
        return false;
    }
    GetUserLeftMenu = () => {
        this.Post('/userleftMenuAndRights', { userid: localStorage.getItem('userid') })
            .subscribe(
                data => {
                    this.userLeftMenu = data.userleftMenu;
                    return data.userleftMenu
                });
    }
    intIsNullorEmpty(val: number) {
        if (val != null && val != undefined && val != 0) {
            return false;
        }
        return true;

    }

    stringIsNullorEmpty(val: string) {
        if (val != null && val != undefined && val.trim() != '') {
            return false;
        }
        return true;
    }

    FormValidate(_form: NgForm) {
        if (!_form.valid) {
            Object.keys(_form.controls).forEach(key => {
                if (!_form.form.get(key).valid)
                    _form.form.get(key).markAsDirty();
                _form.form.get(key).markAsTouched();
            });

            return false;
        }
        return true;
    }

    FormReset(_form: NgForm) {
        _form.reset();
    }

    loadScript(url: string) {
        const body = <HTMLDivElement>document.body;
        const script = document.createElement('script');
        script.innerHTML = '';
        script.src = url;
        script.async = false;
        script.defer = true;
        body.appendChild(script);
    }

    BindHTMLDropdown(dropdownkey, parameterlist?) {

        return this.http.Post("/bindcombobox/" + dropdownkey, parameterlist)
            .map(data => {
                if(data.iserror)
                {
                    return [];  
                } else {
                    return data.data;
                }   
            });
    }

    //Added by Rohan Dave on 21/09/2019(report stuff)
    downloadReport(base64String, reportExt = "pdf", downloadFileName = "report") {        
        let mimeType;        
        switch(reportExt) {
            case 'jpg':
            case 'jpeg':
                mimeType = 'data:image/jpeg;base64,';
                break;
            case 'png':
                mimeType ='data:image/png;base64,';
                break;
            case 'doc':
                mimeType = 'data:application/msword;base64,';
                break;
            case 'docx':
                mimeType = 'data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,';
                break;
            case 'xls':
                mimeType = 'data:application/vnd.ms-excel;base64,';
                break;
            case 'xlsx':
                mimeType = 'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,';
                break;
            default:
                mimeType = 'data:application/pdf;base64,';
                break;
        }
        const contentSource = mimeType + base64String;        
        const downloadLink = document.createElement("a");        
        downloadFileName = downloadFileName + '.' + reportExt;
        downloadLink.href = contentSource;
        downloadLink.download = downloadFileName;
        downloadLink.click();
    }
    //Added by Rohan Dave on 21/09/2019(report stuff)

}