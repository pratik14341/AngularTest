import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from "@angular/core";
import { GlobalFunctionVariables } from "../_helpers/GlobalFunctionVariables";

@Directive({
    selector: '[hasrights]'
})
export class HasRightsDirective implements OnInit {
    @Input('hasrights') hasrights: string | string[];
   

    constructor(private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef,
        private _globalFunctionVariables: GlobalFunctionVariables) {
    }

    ngOnInit(): void {
        this.applyPermission();
    }

    private applyPermission(): void {
        let hasRights: boolean = false
        if (typeof this.hasrights == "string") {
            hasRights = this._globalFunctionVariables.checkRights(this.hasrights);
        } else {

             if (this.hasrights.length > 1) {
                hasRights =  this._globalFunctionVariables.checkRights(this.hasrights[0],this.hasrights[1])
             }
        }

        if (hasRights) this.viewContainer.createEmbeddedView(this.templateRef);
        else this.viewContainer.clear();
        
    }


}