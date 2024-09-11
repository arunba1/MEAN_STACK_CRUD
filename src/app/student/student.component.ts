import { Component } from '@angular/core';

import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrl: './student.component.css'
})
export class StudentComponent {

  StudentArray : any[] = [];             //Creating this array for storing the data and it will used for setting the data for table
  currentStudentID = "";
  name: string ="";                      //We are creating this for storing the name from the form and it's of String type
  address: string ="";                   //We are creating this for storing the address from the form and it's of String type
  phone: string ="";                     //We are creating this for storing the phone number from the form and it's of Number type
  
  constructor(private http: HttpClient )          //This contructor is must for handling the various http request 
  {
    this.getAllStudent();                         //This will call the getallstudents function
  }
  getAllStudent() {                                         //This function is useful for getting the data
    this.http.get("http://localhost:5000/students")         //Here get method is used and along with that localhost url should be crt.
    .subscribe((resultData: any)=>                          //Here .subscribe will load the data and  storing the datacoming from get request to resultdata
    {
       
        console.log(resultData);
        this.StudentArray = resultData;                     //passing the resultdata to the array
    });
    // console.log('Array is \n');
    // console.log(this.StudentArray[1]);
    
  }
  setUpdate(data: any) 
  {
   this.name = data.name;
   this.address = data.address;
   this.phone = data.phone;
   this.currentStudentID = data._id;
  
  }
  UpdateRecords()
  {
    let bodyData = {
      "name" : this.name,
      "address" : this.address,
      "phone" : this.phone,
    };
    
    this.http.patch("http://localhost:5000/students"+ "/"+this.currentStudentID,bodyData).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Student Updateddd")
        this.getAllStudent();
      
    });
  }
  
  setDelete(data: any) {
    this.http.delete("http://localhost:5000/students"+ "/"+ data._id).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Student Deletedddd")
        this.getAllStudent();
   
    });
    }
    
  save()
  {
    if(this.currentStudentID == '')
    {
        this.register();
    }
      else
      {
       this.UpdateRecords();
      }       
  }
register()                                                                  //Register function is created here for performing post tasks.
  {
    let bodyData = {                                                        //Here bodyData named variable is created and whatever data we are storing via two-way binding.
      "name" : this.name,                                                   //And we're passing it in json format,like name:"ngModel data"
      "address" : this.address,
      "phone" : this.phone, 
  };
  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.post("http://localhost:5000/student/create",bodyData).subscribe((resultData: any)=>   //Here post request been made and api is specified it's for creation purpose so we'll be passing data also stored in bodyData.
    {                                                                                               //After that again it will load that here using.subscribe and stored it in the resultData named variable.
        console.log(resultData);                                                                    //Just printing for checking
        alert("Student Registered Successfully")                                                    //alert dabba pannurom for acknowledge purpose
         //this.getAllEmployee();
        this.name = '';
        this.address = '';
        this.phone  = '';
        this.getAllStudent();
    });
  }

  

}
