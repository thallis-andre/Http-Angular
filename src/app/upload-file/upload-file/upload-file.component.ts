import { environment } from './../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { UploadFileService } from '../upload-file.service';
import { uploadProgress, filterResponse } from 'src/app/shared/exjs-operators';


@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {

  files: Set<File>;
  progress = 0;


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
    this.progress = 0
  }

  onUpload() {
    if (this.files && this.files.size > 0) {
      this.uploadService.upload(this.files, environment.BASE_URL + '/upload')
        .pipe(
          uploadProgress(progress => {
            console.log(progress);
            this.progress = progress;
          }),
          filterResponse()
        )
        .subscribe(response => console.log('Upload Concluído'));
    }
  }

  onDownloadExcel(){
    this.uploadService.download(environment.BASE_URL + '/downloadExcel')
      .subscribe((res: any) => {
        this.uploadService.handleFile(res, 'report.xlsx')
      })
  }
  
  onDownloadPdf(){
    this.uploadService.download(environment.BASE_URL + '/downloadPdf')
    .subscribe((res: any) => {
      this.uploadService.handleFile(res, 'report.pdf')
    })
  }
}