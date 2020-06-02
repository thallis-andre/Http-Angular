import { environment } from './../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { UploadFileService } from '../upload-file.service';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {

  files: Set<File>;

  constructor(private uploadService: UploadFileService) { }

  ngOnInit() {
  }

  onChange(evento){
    const selectedFiles = <FileList>evento.srcElement.files;
    // document.getElementById('customFileLabel').innerHTML = selectedFiles[0].name;

    const fileNames = []
    this.files = new Set()
    for( let i=0; i< selectedFiles.length; i++){
      fileNames.push(selectedFiles[i].name)
      this.files.add(selectedFiles[i])
    }
    document.getElementById('customFileLabel').innerHTML = fileNames.join(', ')
  }

  onUpload(){
    if(this.files && this.files.size > 0){
      this.uploadService.upload(this.files, environment.BASE_URL + '/upload')
        .subscribe(response => console.log('Upload concluido'))
    }
  }
}