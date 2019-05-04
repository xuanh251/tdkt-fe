import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { UploadFileService } from '../_services/ultisService/upload-file.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  selectedFile: File = null;
  constructor(
    private titleService: Title,
    private uploadFileService: UploadFileService
  ) { }
  ngOnInit() {
    this.titleService.setTitle(environment.AppName);
  }
  ngAfterViewInit() { }


  onFileSelected(event) {
    this.selectedFile = event.target.files[0] as File;
    console.log(event);
  }
  onUpload() {
    const fd = new FormData();
    fd.append('image', this.selectedFile, this.selectedFile.name);
    this.uploadFileService.uploadImage(fd).subscribe(
      next => {
        console.log('Thanh cong');
      },
      err => {
        console.log('Loi ' + err);
      }
    );
  }
}
