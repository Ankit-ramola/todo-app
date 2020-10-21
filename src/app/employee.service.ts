import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private httpClient: HttpClient) { }

  saveEmployee(employees) {
    const employeeUrl = 'http://localhost:3000/employees';
    return this.httpClient.post(employeeUrl, employees);
  }
 fetchEmployee() {
    const employeeUrl = 'http://localhost:3000/employees';
    return this.httpClient.get(employeeUrl);
   }
   updateEmployee(user) {
    const employeeUrl = 'http://localhost:3000/employees/';
    return this.httpClient.put(employeeUrl + user.id, user);
  }
  deleteEmployee(user) {
    const employeeUrl = 'http://localhost:3000/employees/';
    return this.httpClient.delete(employeeUrl + user.id);
  }
  getById(user) {
    const employeeUrl = 'http://localhost:3000/employees/';
    return this.httpClient.get(employeeUrl + user.id);
  }
}
