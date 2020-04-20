import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: 'app-image-form',
  templateUrl: './image-form.component.html',
  styleUrls: ['./image-form.component.css']
})
export class ImageFormComponent implements OnInit {
  result = "";
  image_detect = "";

  form = new FormGroup({
    addedImg: new FormControl(null, [Validators.required]),
  });

  constructor() { }

  ngOnInit() {
    this.form.valueChanges.subscribe(data => {
      if (data) {
        this.image_detect = data["addedImg"];
      }
    });
  }

  onCheck() {
    console.log(this.image_detect);
    // debugger;
    var data = new FormData();
    data.append("File", (<HTMLInputElement>document.getElementById('imgInp')).files[0]);
    
   
    const self = this;
    $.ajax({
      url: "http://127.0.0.1:5000/predict_animal",
      data: data,
      cache: false,
      contentType: false,
      processData: false,
      method: "POST",
      type: "POST", // For jQuery < 1.9

      success: function (data) {
        self.result = data.response;
        console.log(self.result);
        // alert("Its a " + data.response);
      },
    });
    
    
  }
}
