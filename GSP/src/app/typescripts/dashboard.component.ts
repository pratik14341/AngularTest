
import { Component, OnInit } from '@angular/core';
import { GlobalFunctionVariables } from "../_helpers/GlobalFunctionVariables";
import * as $ from 'jquery';// import Jquery here
@Component({
    templateUrl: '../html/dashboard.html',
    //styleUrls: ['../css/app.css'],
})

export class DashboardComponent implements OnInit {

    constructor(private _GlobalFunctionVariables: GlobalFunctionVariables) {
        this._GlobalFunctionVariables.isLoading = false;
        this._GlobalFunctionVariables.HeaderText ='';
    }

    ngOnInit() {

    }
    onDragEnd(e) {        
       $(e).css('z-index','2')
    }
}
