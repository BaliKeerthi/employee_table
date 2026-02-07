import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-reactive-form',
  standalone: false,
  templateUrl: './reactive-form.html',
  styleUrl: './reactive-form.scss'
})
export class ReactiveForm {
  empData: any[] = [];
  selectedEmpId: string | null = null; // ⭐ important

  userForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
    city: new FormControl('')
  });


  constructor(private http: HttpClient) {
    this.getEmployees();
  }

  getEmployees() {
    this.http.get("http://localhost:5000/employees/all-emp")
      .subscribe((res: any) => {
        this.empData = res;
      });
  }

  onSave() {
    const obj = this.userForm.value;

    //  UPDATE
    if (this.selectedEmpId) {
      this.http.put(
        `http://localhost:5000/employees/update/${this.selectedEmpId}`,
        obj
      ).subscribe(() => {
        alert("Employee updated");
        this.resetForm();
        this.getEmployees();
      });

    //  CREATE
    } else {
      this.http.post(
        "http://localhost:5000/employees/add-emp",
        obj
      ).subscribe(() => {
        alert("Employee created");
        this.resetForm();
        this.getEmployees();
      });
    }
  }

  onEdit(empId: string) {
    this.selectedEmpId = empId; 

    this.http.get(`http://localhost:5000/employees/all-emp/${empId}`)
      .subscribe((res: any) => {
        this.userForm.patchValue({
          name: res.name,
          email: res.email,
          phone: res.phone,
          city: res.city
        });
      });
  }
  onDelete(empId: string) {
  if (confirm("Are you sure you want to delete this employee?")) {
    this.http
      .delete(`http://localhost:5000/employees/delete/${empId}`)
      .subscribe(() => {
        alert("Employee deleted");
        this.getEmployees(); // 
      });
  }
}


  resetForm() {
    this.userForm.reset();
    this.selectedEmpId = null;
  }
}




