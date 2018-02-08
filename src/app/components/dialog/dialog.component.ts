import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
    selector: 'msg-dialog',
    templateUrl: './dialog.html'
})

export class DialogComponent {
    constructor(private dialogRef: MatDialogRef<DialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any){}

    onClose(): void {
        this.dialogRef.close();
    }
}

