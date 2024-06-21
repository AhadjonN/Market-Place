import {Component, Inject, OnInit, Sanitizer, SecurityContext} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ProductsService} from "../../../service/products.service";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";

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

  isNew: boolean = true;
  sanitizedImageUrl: SafeUrl

  ngOnInit() {
  }

  myForm: FormGroup = new FormGroup({
    id: new FormControl(this.data?.id ?? null),
    title: new FormControl(this.data?.title ?? '', [Validators.required]),
    year: new FormControl(this.data?.year ?? '', [Validators.required]),
    price: new FormControl(this.data?.price ?? '', [Validators.required]),
    image: new FormControl(this.data?.image ?? '', [Validators.required]),
    chip: new FormControl(this.data?.configure.chip ?? '', [Validators.required]),
    memory: new FormControl(this.data?.configure.memory ?? '', [Validators.required]),
    memoryRam: new FormControl(this.data?.configure.memoryRam ?? '', [Validators.required]),
    oc: new FormControl(this.data?.configure.oc ?? '', [Validators.required]),
    videoCard: new FormControl(this.data?.configure.videoCard ?? '', [Validators.required]),
    display: new FormControl(this.data?.configure.display ?? '', [Validators.required]),
  });

  onSubmit(): void {
    this.sanitizedImageUrl = this.myForm.value.image;
    this.data = {
      id: this.myForm.value.id,
      title: this.myForm.value.title,
      year: this.myForm.value.year,
      price: this.myForm.value.price,
      image: this.sanitizedImageUrl,
      configure: {
        chip: this.myForm.value.chip,
        memory: this.myForm.value.memory,
        memoryRam: this.myForm.value.memoryRam,
        oc: this.myForm.value.oc,
        videoCard: this.myForm.value.videoCard,
        display: this.myForm.value.display,
      }
    };
    this.dialogRef.close(this.data);
  }

  onCloseClick(): void {
    this.dialogRef.close(null);
  }
}
