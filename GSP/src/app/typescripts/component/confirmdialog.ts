import { Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'confirm-dialogs',
  templateUrl: '../../html/component/confirmdialog.html',
 // styleUrls: ['../../css/app.css'],
})
export class confirmdialogComponent  {
  @Input() dialogOpened: boolean = false;
  @Output() confirmFunction = new EventEmitter();
  @Input() title: string = "GSP";
  @Input() message: string = "Free text";
  
  public closemodel(data) {
    this.confirmFunction.emit(data);
  }
}