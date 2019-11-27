import { Component, Input, Output, EventEmitter, QueryList, ViewChildren, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { ColumnSettings } from '../../interface';
import { GridBindingDirective } from '../../directive/GridBinding';
import { CustomeGridComponent } from '../../directive/gridComponent';
import { GlobalFunctionVariables } from "../../_helpers/GlobalFunctionVariables";

@Component({
  selector: 'my-dialogs',
  templateUrl: '../../html/component/masterentrypopup.html',
  //styleUrls: ['../../css/app.css'],
})
export class DialogsComponent  {
  @Input() dialogOpened: boolean = false;
  @Output() close = new EventEmitter();
  @Input() columnsConfig: ColumnSettings[] = [];
  @Input() url: string = "/userlogin/list";
  @Input() DisplayNameField: string = "";
  @Input() extraInput: object = {};
  idvalue: number = 0;
  NameValue: string = "";
  IsPreview: boolean = false;
  IsShowValidateNameValueE: boolean = false;
  
  constructor(private _GlobalFunctionVariables: GlobalFunctionVariables) {
    this._GlobalFunctionVariables.isLoading = false;
    this._GlobalFunctionVariables.HeaderText = 'User Info';
  }
  @ViewChild('masterentryform') masterentryform: NgForm;
  @ViewChild(CustomeGridComponent) child:CustomeGridComponent;
  @ViewChildren(CustomeGridComponent) gridUserloginList: QueryList<CustomeGridComponent>;
  userloginList: GridBindingDirective;
  
  
  public closemodel() {
    this.close.emit();
  }

  
  RowChange(dataitem) {
    this.NameValue = dataitem.name;
    this.idvalue = dataitem.id;
    this.IsPreview = true;
  }

  Clear() {
    this.NameValue = "";
    this.idvalue = 0;
    this.IsPreview = false;
    this.child.clearSelectedValue(12);
    this.Refresh();
  }

  Edit() {
    this.IsPreview = false
  }

  Save() {
    if (this._GlobalFunctionVariables.FormValidate(this.masterentryform)) {
      
            this._GlobalFunctionVariables.Post('/masterentry/save', {  name: this.NameValue, id: this.idvalue ,keyname: this.extraInput['keyname'] })
                .subscribe(
                    data => {
                        if (data) {
                                this._GlobalFunctionVariables.SuccessToss("Record saved successfully.");
                                this.Clear();
                                this.Refresh();
                                this.closemodel();
                                
                        } else {
                            this._GlobalFunctionVariables.ErrorToss("Error to saving record, Please try again.")
                        }
                    },
                    error => {
                        this._GlobalFunctionVariables.ErrorToss("Error to saving record, Please try again.")
                    }
                );
    }
  }

  Refresh = () => {
    //this.userloginList.refresh();
  }

  ngAfterViewInit() {
       
  //   this.userloginList = this.gridUserloginList.first.objgrid.first;
  //  // let saveObject = this._cookies.GetRemoveCookie('userloginList');
  //   //let userid = this._cookies.GetRemoveCookie('userid');
  //   // if (saveObject) {
  //   //     saveObject = JSON.parse(saveObject);
  //   //     this.userloginList.setState(JSON.parse(saveObject.state));
  //   //     this.cdr.detectChanges();
  //   // }
  //   // if(userid) {
  //   //     let selectedid = []
  //   //     selectedid.push(parseInt(userid));
  //   //     this.userloginList.setSelectedValue(selectedid);
  //   // }
    
  //   this._GlobalFunctionVariables.gridDirectiveInfo = this.userloginList;
  //   this._GlobalFunctionVariables.gridName = 'userloginList';
  //   this.columnsConfig = this._GlobalFunctionVariables.LoadGridColumns(this._GlobalFunctionVariables.gridName, this.columnsConfig) || this.columnsConfig;
  //   this.userloginList.rebind();
  }
}