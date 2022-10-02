import { Component, AfterViewInit, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { AppService } from './app.service';
import { PrettyJsonPipe } from './pretty-json.pipe';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'reshape';
  textArea:boolean=false;
  jsonData: any;
  selectedFile:any=null;
  fileName:string='';
  downloadJsonHref: SafeUrl='';
  isDownloadReady: boolean=false;
  formatedText:any;
  formatJson:any;

  constructor(private appService:AppService,private sanitizer: DomSanitizer){}

  opentextArea(){
    this.textArea=true;
  }

  format(){
    this.formatJson=true;
    this.formatedText=this.jsonData;
  }

  
  getCSV(){
    if(this.selectedFile!==null){
      const formdata=new FormData();
      formdata.append('file',this.selectedFile)
      this.appService.getCSVForFile(formdata).subscribe(data=>{
        this.generateDownloadJsonUri(data)
      })
    }else{
    const payload=JSON.parse(this.jsonData)
    this.appService.getCSV(payload).subscribe(data=>{
      console.log(data)
      this.generateDownloadJsonUri(data)
    })
  }
  }

  getFlatten(){
    if(this.selectedFile!==null){
      console.log(this.selectedFile)
      const formdata=new FormData();
      formdata.append('file',this.selectedFile)
      this.appService.getFlattenForFile(formdata).subscribe(data=>{
        console.log(data)
        this.generateDownloadJsonUri(data)
      })
    }else{
    const payload=JSON.parse(this.jsonData)
    this.appService.getFlatten(payload).subscribe(data=>{
      console.log(data)
      this.generateDownloadJsonUri(data)
    })
  }
  }

  getFlattenTraditional(){
    
    if(this.selectedFile!==null){
      console.log(this.selectedFile)
      const formdata=new FormData();
      formdata.append('attachment',this.selectedFile)
      this.appService.getFlattenTraditionalForFile(formdata).subscribe(data=>{
        console.log(data)
        this.generateDownloadJsonUri(data)
      })
    }else{
      const payload=JSON.parse(this.jsonData)
    this.appService.getFlattenTraditional(payload).subscribe(data=>{
      console.log(data)
      this.generateDownloadJsonUri(data)
    })
  }
  }

  fileChange(files:any) {
    
        this.selectedFile = files.target.files[0] as File;
        this.fileName=this.selectedFile.name;
        console.log(this.selectedFile);
    
}

generateDownloadJsonUri(data:any) {
  let theJSON = JSON.stringify(data);
  let blob = new Blob([theJSON], { type: 'text/json' });
  let url= window.URL.createObjectURL(blob);
  let uri:SafeUrl = this.sanitizer.bypassSecurityTrustUrl(url);
  this.downloadJsonHref = uri;
  this.isDownloadReady=true;
}

}
