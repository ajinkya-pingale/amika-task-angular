import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'amikaTask';

  registerForm: FormGroup;

  constructor(    private formBuilder: FormBuilder, private http: HttpClient){
  }
  errorObj: any = {}
  ngOnInit(){
    this.registerForm = this.formBuilder.group({
      name:[null, [Validators.required]],
      email:[null,[Validators.required, Validators.email]],
      password:[null, [Validators.required, Validators.minLength(8)]],
      conf_password:[null, [Validators.required, Validators.minLength(8)]],
    })
  }

  register(){
    console.log(this.registerForm.value)
    if(this.registerForm.valid){
      if(this.registerForm.value['password'] !=  this.registerForm.value['conf_password']){
        this.errorObj = {
          conf_password: 'Password and confirm password should be same'
        }
        return;
      }
      this.http.post('http://127.0.0.1:8000/api/addUser', this.registerForm.value).subscribe(
        (data: any)=>{
          if(data['success']){
            this.registerForm.reset()
          }else{
            console.log(data)
          }
        },error=>{
          console.log(error)
        }
      )
    }else{
      this.errorObj = {
        name: 'Name is required',
        email: 'Email is required',
        password: 'Password is required',
        conf_password: 'Please confirm your password'
      }
    }
  }

}
