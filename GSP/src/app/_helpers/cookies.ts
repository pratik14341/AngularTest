import { Cookie } from 'ng2-cookies/ng2-cookies';
import { Injectable } from '@angular/core';
@Injectable()
export class Cookies {
    SetCookie(name, value) {
        Cookie.set(name, value);
    }
    SetId(value) {
        Cookie.set('projid', value);
    }

    SetState(name,state,otherParam?){
        Cookie.set(name, JSON.stringify({state :JSON.stringify(state),otherParam : otherParam }) );
    }

    GetCookie(name): any {
        return Cookie.get(name);
    }



    GetRemoveCookie(name): any {
        let cname = Cookie.get(name);
        Cookie.delete(name);
        return cname;
    }
    GetId(): any {
        return Cookie.get('projid') == null ? 0 : Cookie.get('projid');
    }

    GetRemoveId(): any {
        let id = Cookie.get('projid');
        Cookie.delete('projid');
        return id == null ? 0 : id;
    }
    RemoveId = function () {
        Cookie.delete('projid');
    }
    RemoveCookie(name) {
        Cookie.delete(name);
    }
    RemoveAll = function () {
        Cookie.deleteAll();
    }



}