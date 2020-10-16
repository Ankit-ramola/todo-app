import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {

  constructor(private employeeService: EmployeeService) { }

  employees = [];

  @ViewChild('id') id: ElementRef;
  @ViewChild('name') name: ElementRef;
  @ViewChild('technology') technology: ElementRef;

  editMode = false;
  editIndex: number;

  ngOnInit(): void { }
  onCreateEmp(id, name, technology) {
    if (this.editMode) {
      this.employees[this.editIndex] = {
        id: id.value,
        name: name.value,
        technology: technology.value
      }
      this.editMode = false;
      this.id.nativeElement.value = '';
      this.name.nativeElement.value = '';
      this.technology.nativeElement.value = '';

    } else {
      this.employees.push({
        id: id.value,
        name: name.value,
        technology: technology.value
      });
      this.id.nativeElement.value = '';
      this.name.nativeElement.value = '';
      this.technology.nativeElement.value = '';
    }

  }
  onSaveEmp() {
    this.employeeService.saveEmployee(this.employees).subscribe(
      (response) => console.log(response),
      (err) => console.log(err))
  }
  onFetchEmp() {
    this.employeeService.fetchEmployee().subscribe(
      (response) => {
        const data = JSON.stringify(response);
        console.log(data)
        this.employees = JSON.parse(data);
      },
      (err) => console.log(err)
    )
  }
  onDeleteEmp(id) {
    if (confirm('Do you want to delete ?')) {
      this.employees.splice(id, 1);
      this.onSaveEmp();
      // console.log(id);
      // this.employeeService.deleteEmployee(id).
      //   subscribe(() => { })
    }
  }
  onEditEmp(index: number) {
    this.editMode = true;
    this.editIndex = index;
    console.log(this.employees[index].id);
    this.id.nativeElement.value = this.employees[index].id;
    this.name.nativeElement.value = this.employees[index].name;
    this.technology.nativeElement.value = this.employees[index].technology;
  }
}

