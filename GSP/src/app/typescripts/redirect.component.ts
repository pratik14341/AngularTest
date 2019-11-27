import { Component } from '@angular/core';
import { GlobalFunctionVariables } from "../_helpers/GlobalFunctionVariables";
@Component({
    templateUrl: '../html/redirect.html' 
})

export class RedirectComponent {
    constructor(private _GlobalFunctionVariables: GlobalFunctionVariables ){
      
        this._GlobalFunctionVariables.logout();
    }
    ngOnInit() {
        //this.loadAllUsers();
    }
}
