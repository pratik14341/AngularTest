import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import { Cookies } from './cookies';
import { GlobalFunctionVariables } from './GlobalFunctionVariables';





@Injectable()
export class HttpPost {
    constructor(private router: Router, private http: HttpClient, private _cookies: Cookies, ) { }
    clearLocalStorage() {
        localStorage.clear();
        this._cookies.RemoveAll();
    }
    checkResultValue = function (result) {
        if (result.iserror) {
            if(result.errormessage == "UsernotAuthorize")
            {
                this.clearLocalStorage(); 
                this.router.navigate(['/login'], { queryParams: {} });
            } else if(result.errormessage == "NoRights")
            {
                this.router.navigate(['/login'], { queryParams: {} });
            } else {
               // this.router.navigate(['/'], { queryParams: {} });
            }
            return false;
        } else {
            return true;
        }
    }


    Post(url, data) {
        return this.http.post<any>(url, data).map(result => {
           this.checkResultValue(result);
           return result; 
        }, error => {
            // loadLodingShowHide.IsShowLoadLoading = false;
            // DisplayNotification("Error", "There is some issue on request, Please try again.");
        });


    }
}