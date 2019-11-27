import { Component, OnInit, ViewChild, NgModule } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalFunctionVariables } from "../../_helpers/GlobalFunctionVariables";
import { Cookies } from '../../_helpers/cookies';

@Component({
    selector: 'ExistingUserLogin',
    templateUrl: '../../html/login/Existing_User/ExistingUserLogin.html',
    //styleUrls: ['../../css/login.css'],

})

export class ExistingLoginComponent {
    title: string = 'GSP';
    isError: boolean = false;
    errormessage: string = '';
    @ViewChild('loginform') loginform: NgForm;
    _subscription;
    register: any = {
        username: "",
        password: ""
    };
    loading: boolean = false;
    constructor( public _GlobalFunctionVariables: GlobalFunctionVariables,
        private router: Router,private _cookies: Cookies) {
    }
    onClick() {
        if (this._GlobalFunctionVariables.FormValidate(this.loginform)) {
            this._GlobalFunctionVariables.Post('/userlogin', { username: this.register.username, password: this.register.password, ismobile: 0})
                .subscribe(
                    data => {
                        if(data.iserror)
                        {
                            this._GlobalFunctionVariables.ErrorToss(data.errormessage);
                        } else {
                            let ResultData = data.data;
                            if (ResultData.iserror) {
                                this.isError = true;
                                this.errormessage = ResultData.errormessage;
                            } else {
                                this.isError = false;
                                this.errormessage = '';
                                localStorage.setItem('token', ResultData.token);
                                localStorage.setItem('userid', ResultData.userid);
                                this._GlobalFunctionVariables.userRights = JSON.parse(ResultData.userRights);
                                this._GlobalFunctionVariables.userLeftMenu = ResultData.userleftMenu;
                                
                                this._cookies.SetCookie("gridSaveLayout",ResultData.gridcolumns.d);
                                this._GlobalFunctionVariables.gridSaveLayout = ResultData.gridcolumns.d;
                                localStorage.setItem('utoken', ResultData.utoken);
                                localStorage.setItem('displayname', ResultData.displayname);
                                this.router.navigate(['/']);
                            }
                        }
                    },
                    error => {
                    }
                );
        }
    }
}