import { ChangeDetectorRef, Directive, Input, OnDestroy, Output } from '@angular/core';
import { DataBindingDirective, GridComponent, GridDataResult, RowArgs, SelectionEvent } from '@progress/kendo-angular-grid';
import { ColumnList } from '@progress/kendo-angular-grid/dist/es2015/columns/column-list';
import { State } from '@progress/kendo-data-query';
import { Observable } from 'rxjs/Rx';
import { GlobalFunctionVariables } from "../_helpers/GlobalFunctionVariables";
import { EventEmitter } from '@angular/core';

@Directive({
    selector: '[gridBinding]'
})
export class GridBindingDirective extends DataBindingDirective implements OnDestroy {
    // private serviceSubscription: Subscription;

    @Input('url') BASE_URL: string;
    @Input('id') id: string;
    @Input('extraInput') extraInput: any;
    @Input('masterDataItems') masterDataItems: any;
    @Input('masterkey') masterkey: string;
    @Input('loadOninit') loadOninit: boolean;
    @Output() dataBound = new EventEmitter();
    @Output() clearSelection = new EventEmitter();
    @Output() setSelection = new EventEmitter();
    @Input() mySelection: string[] = [];
    constructor(grid: GridComponent, private _globalVariables: GlobalFunctionVariables, private cdr: ChangeDetectorRef) {
        super(grid);
        this.state.take = 50;
        //grid.pageable = true;

        grid.pageable = {
            buttonCount: 5,
            info: true,
            type: 'numeric',
            pageSizes: [50, 100, 150],
            previousNext: true
        }
        grid.sortable = { mode: "multiple", allowUnsort: true, showIndexes: true };
        grid.filterable = "menu, row";
        grid.selectable = true
        grid.reorderable = true;
        grid.resizable = true;
    }

    public ngOnDestroy(): void {
        //  if (this.serviceSubscription) {
        //      this.serviceSubscription.unsubscribe();
        //  }

        this.grid = null;
        super.ngOnDestroy();
       
        if (this.clearSelection) {
            this.clearSelection.unsubscribe();
        }
        if (this.dataBound) {
            this.dataBound.unsubscribe();
        }
        if (this.setSelection) {
            this.setSelection.unsubscribe();
        }
    }
    ngAfterViewInit() {

        if (this.loadOninit)
            this.rebind();
    }
    public rebind(): void {
        this.getData(this.state).subscribe(x => {
            this.grid.data = x;
            if (this.dataBound) {
                this.dataBound.emit("");
            }
        });
    }


    public getData(state: any): Observable<GridDataResult> {        let params = {
            'skip': state.skip,
            'take': state.take,
            'filter': state.filter,
            'sort': state.sort
            , ...this.extraInput
        }
        if (!this._globalVariables.stringIsNullorEmpty(this.masterkey) && this.masterDataItems != undefined
            && this.masterDataItems) {
            params = {
                ...params,
                ...JSON.parse('{"' + this.masterkey + '":' + this.masterDataItems[this.masterkey] + '}')
            }
        }
        
        this.grid.loading = true;
        this.cdr.detectChanges();

        return this._globalVariables.WithoutLoadingPost(this.BASE_URL,  params )
            .map(response => {
                this.grid.loading = false;
                this.cdr.detectChanges();
                if(response.iserror)
                {
                    this._globalVariables.ErrorToss(response.errormessage);
                }
                return (<GridDataResult>{
                    data: (response.iserror) ? [{}] : response.data.data,
                    total: (response.iserror) ? 0 : response.data.count
                });
            });

    }

    public saveAsPDF() {
        this.grid.saveAsPDF()
    }
    public saveAsExcel() {
        this.grid.saveAsExcel()
    }
    public getState(): State {
        return this.state;
    }
    public getSelectedValue() {
        return this.mySelection;
    }

    public clearSelectedValue() {
        if (this.clearSelection) {
            this.clearSelection.emit("123");
        }
    }
    public setSelectedValue(args) {
        if (this.setSelection) {
            this.setSelection.emit(args);
        }
    }



    allResults(st?: any): Observable<GridDataResult> {
        
        const state = Object.assign({}, st);
        delete state.skip;
        delete state.take;

        return this.getData(state);
    }
    public setState(st: State): void {
        this.state = st;
        this.grid.filter = st.filter;
        this.grid.sort = st.sort;
        this.grid.skip = st.skip;
        this.grid.pageSize = st.take;
        // this.cdr.detectChanges();
    }
    public refresh(): void {
        this.rebind();
    }

    public getGrid(): GridComponent {
        return this.grid;
    }
    public dataResult(): GridDataResult {
        return <GridDataResult>this.grid.data;
    }

    public getRow(index): any {
        return (<GridDataResult>this.grid.data).data[index]
    }

    public getColumnOrder() {
        return this.grid.columnList
    }
    public setColumnOrder(order: ColumnList) {
        this.grid.columnList = order;
        this.cdr.detectChanges();
    }
}
//https://www.telerik.com/kendo-angular-ui/components/grid/data-binding/automatic-operations/