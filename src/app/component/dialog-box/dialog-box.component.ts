import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.scss']
})
export class DialogBoxComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: any,
  ) {
    if (this.data) this.isNew = false;
  }

  myForm: FormGroup = new FormGroup({
    id: new FormControl(this.data?.id ?? null),
    title: new FormControl(this.data?.title ?? '', [Validators.required]),
    year: new FormControl(this.data?.year ?? '', [Validators.required]),
    price: new FormControl(this.data?.price ?? '', [Validators.required]),
    chip: new FormControl(this.data?.chip ?? '', [Validators.required]),
    memory: new FormControl(this.data?.memory ?? '', [Validators.required]),
    display: new FormControl(this.data?.display ?? '', [Validators.required]),
  });

  isNew: boolean = true;

  onSubmit(): void {

      this.data = {
        id: this.myForm.value.id,
        title: this.myForm.value.title,
        year: this.myForm.value.year,
        price: this.myForm.value.price,
        'image': 'assets/mac.jpg',
        configure: {
          chip: this.myForm.value.chip,
          memory: this.myForm.value.memory,
          display: this.myForm.value.display,
        }
      };
     this.dialogRef.close(this.data);
  }

  onCloseClick(): void {
    this.dialogRef.close(null);
  }

  ngOnInit() {
  }

}
