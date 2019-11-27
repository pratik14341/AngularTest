import { Component, EventEmitter, Input, Output, ViewChildren } from '@angular/core';
import { ColumnSettings } from '../interface';
import { GridBindingDirective } from './GridBinding';
import { SelectionEvent } from '@progress/kendo-angular-grid';
import { ExcelExportData } from '@progress/kendo-angular-excel-export';
import 'rxjs/add/operator/toPromise';

@Component({
    selector: 'my-grid',
    templateUrl: '../html/grid.html'
})

export class CustomeGridComponent {
    @Input() columnsConfig: ColumnSettings[]
    @Input('url') BASE_URL: string;
    @Input('id') id: string;
    @Input('height') height: string;
    @Input('extraInput') extraInput: any;
    @ViewChildren(GridBindingDirective) objgrid;
    @Input('masterDataItems') masterDataItems: any;
    @Input('masterkey') masterkey: string;
    @Input('loadOninit') loadOninit: boolean;
    @Output() dataBound = new EventEmitter();
    @Input('KeyGridSelectBy') KeyGridSelectBy;
    @Input('MultiSelectGrid') MultiSelectGrid: boolean;
    @Input('fileName') fileName: string;
    @Output('RowChange') RowChange = new EventEmitter();
    @Input('SubGrid') SubGrid:boolean;
    @Input('Sub_URL') Sub_URL: string;
    @Input('Sub_ExtraInput') Sub_ExtraInput: any;
    @Input() Sub_ColumnsConfig: ColumnSettings[];
    @Input('Sub_Id') Sub_Id: string;

    
    public mySelection = [];
    callDataBound(str) {
      //  
        if (this.dataBound) {
            this.dataBound.emit(str);
        }
    }
    public ngOnDestroy(): void {
        if (this.dataBound) {
            this.dataBound.unsubscribe();
        }
    }

    clearSelectedValue(args) {
        this.mySelection = [];
    }

    setSelectedValue(args) {
        this.mySelection = args;
    }

    public selectedRowChange(selectionEvent: SelectionEvent) {
        // let selectedItem = this.gridDataResult.data[selectionEvent.index];
        
        if (this.MultiSelectGrid == undefined || this.MultiSelectGrid == false) {
            if (this.KeyGridSelectBy != undefined)
            {
                this.mySelection = [selectionEvent.selectedRows[0].dataItem[this.KeyGridSelectBy]];
            }
            else{
                this.mySelection = [selectionEvent.index];
            }
            this.RowChange.emit(selectionEvent.selectedRows[0].dataItem);
        }
      
    }

    constructor() {
        this.allData = this.allData.bind(this);
    }

    public  allData(): Promise<ExcelExportData>  {
        
       
        let st = JSON.parse(JSON.stringify(this.objgrid.first.state))
        st.take = this.objgrid.first.grid.data.total;
        st.skip = 0;
        return this.objgrid.first.getData(st).take(1).toPromise()
        
    }

}