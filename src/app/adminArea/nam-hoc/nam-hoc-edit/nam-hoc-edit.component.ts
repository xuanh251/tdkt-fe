import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertifyService } from 'src/app/_services/ultisService/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { NamHocService } from 'src/app/_services/nam-hoc.service';

@Component({
  selector: 'app-nam-hoc-edit',
  templateUrl: './nam-hoc-edit.component.html',
  styleUrls: ['./nam-hoc-edit.component.scss']
})
export class NamHocEditComponent implements OnInit {
  myForm: FormGroup;
  submitted = false;
  message = 'abc';
  @Output() messageEvent = new EventEmitter<string>();
  constructor(
    private formBuilder: FormBuilder,
    private alertify: AlertifyService,
    private activatedRouter: ActivatedRoute,
    private namHocService: NamHocService
  ) {
    this.myForm = this.formBuilder.group(
      {
        tu_ngay: ['', Validators.required],
      }
    );
   }

  ngOnInit() {
  }
  get f() {
    return this.myForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.myForm.invalid) {
      console.log('loi');
      return;
    }
    const tuNgay = this.myForm.get('tu_ngay').value;
    this.myForm.value.tu_ngay = tuNgay.month + '-' + tuNgay.day + '-' + tuNgay.year;
    console.log(this.myForm.value);
    this.namHocService.createNamHoc(this.myForm.value).subscribe(
      success => {
        this.alertify.success(success);
        this.sendMessage();
      },
      err => {
        this.alertify.error('Đã xảy ra lỗi!');
        console.log(err);
      }
    );
  }
  sendMessage() {
    this.messageEvent.emit(this.message);
  }

}
