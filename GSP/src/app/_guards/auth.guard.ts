import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { GlobalFunctionVariables } from "../_helpers/GlobalFunctionVariables";
import { Cookies } from '../_helpers/cookies';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router,
        private _globalFunctionVariables: GlobalFunctionVariables, private _cookies: Cookies) { }

    checkCannActive = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        this._globalFunctionVariables.gridName = '';
        this._globalFunctionVariables.gridDirectiveInfo = null;
        if (!this._globalFunctionVariables.stringIsNullorEmpty(localStorage.getItem('token')) &&
            !this._globalFunctionVariables.stringIsNullorEmpty(localStorage.getItem('userid'))) {
            if (route.routeConfig.path == 'login' || route.routeConfig.path == 'forgot') {
                this.router.navigate(['/'], { queryParams: {} });
                return false;
            }
            return true;
        }
        if (route.routeConfig.path != 'login' && route.routeConfig.path != 'forgot') {
            // not logged in so redirect to login page with the return url        
            this.router.navigate(['/login'], { queryParams: {} });
            return false;
        }
        else {
            return true;
        }
        // return true;
    }
    ReturnWithCheckUserRights = (route) => {
        let rightsName = ''
        if (route.data && route.data.rights) {
            rightsName = route.data.rights;
        }
        return this._globalFunctionVariables.Post('/userleftMenuAndRights', { userid: localStorage.getItem('userid') }).map(data => {
            if (data.iserror) {
                this.router.navigate(['/'], { queryParams: {} });
                return false
            }
            var rightinfo = JSON.parse(data.data.userrights);
            this._globalFunctionVariables.userRights = rightinfo
            this._globalFunctionVariables.userLeftMenu = data.data.userleftMenu;

            this._cookies.SetCookie("gridSaveLayout", data.data.gridcolumns.d);
            this._globalFunctionVariables.gridSaveLayout = data.data.gridcolumns.d;
            if (rightsName != '') {
                if (rightinfo[rightsName] && rightinfo[rightsName].r == 1) {
                    return true;
                } else {
                    this.router.navigate(['/'], { queryParams: {} });
                    return false
                }
            }
            return true;
        }).first();
    }

    ReturnCheckUserRights = (route) => {

        let rightsName = ''
        if (route.data && route.data.rights) {
            rightsName = route.data.rights;
        }
        if (rightsName != '') {
            if (this._globalFunctionVariables.userRights[rightsName] && this._globalFunctionVariables.userRights[rightsName].r == 1) {
                return true;
            } else {
                this.router.navigate(['/'], { queryParams: {} });
                return false
            }
        }
        return true;

    }


    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        let result = this.checkCannActive(route, state);
        if (result == true && route.routeConfig.path != 'login' && route.routeConfig.path != 'forgot') {
            if (this._globalFunctionVariables.userRights == undefined) {
                return this.ReturnWithCheckUserRights(route);
            }
            else {
                return this.ReturnCheckUserRights(route)
            }
        }
        return result;
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        let result = this.checkCannActive(route, state);
        if (result == true && route.routeConfig.path != 'login') {
            if (this._globalFunctionVariables.userRights == undefined) {
                return this.ReturnWithCheckUserRights(route);
            } else {
                return this.ReturnCheckUserRights(route)
            }
        }
        return result;
    }

    //  canActivate(
    //     next: ActivatedRouteSnapshot,
    //     state: RouterStateSnapshot) {
    //   return new Promise((resolve, reject) => {
    //   this.authService.getAccessRights().then((response) => {
    //     let result = <any>response;
    //     let url = state.url.substr(1,state.url.length);
    //     if(url == 'getDepartment'){
    //       if(result.getDepartment){
    //         resolve(true);
    //       } else {
    //         this.router.navigate(['login']);
    //         resolve(false);
    //       }
    //     }

    //      })
    //    })
}