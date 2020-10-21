import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { EmployeeService } from '../employee.service';


@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  // tslint:disable-next-line: ban-types
  allEmp: Object;
  empObj = {
    id : '',
    name : '',
    technology : '',
    allocated : ''
   };

  data: any;

  constructor(private employeeService: EmployeeService) { }

  editMode = false;
  detail = false;

  ngOnInit(): void{
    this.onFetchEmp();
   }
   onCreateEmp(formObj) {
     console.log(formObj);
     this.employeeService.saveEmployee(formObj).subscribe(
       (response) => console.log(response),
       (err) => console.log(err));
     this.onFetchEmp();

  }
  onFetchEmp() {
    this.employeeService.fetchEmployee().subscribe(
      (response) => {
        this.allEmp = response;
        console.log(this.allEmp);
      });
      }

  onDeleteEmp(user) {
   this.employeeService.deleteEmployee(user).
        subscribe(() => { this.onFetchEmp();
        });

  }
onEditEmp(user) {
    this.editMode = true;
    this.empObj = user;

 }

 onUpdateEmp(){
   this.editMode = !this.editMode;
   this.employeeService.updateEmployee(this.empObj).subscribe(() => {
    this.onFetchEmp();
   });
  }

 onViewDetailEmp(user) {
   this.detail = true;
   this.employeeService.getById(user).
   subscribe((response) => {
     this.data = response;
     console.log(this.data);
 });

 }
}

