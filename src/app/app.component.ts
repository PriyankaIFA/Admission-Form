import { Component, OnInit } from '@angular/core';

interface FormData {
  firstname: string;
  middlename: string;
  lastname: string;
  gender: string;
  bloodgroup: string;
  subjects: string[];
  mobilenumber: string;
  email: string;
  address1: string;
  address2: string;
}  





@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  availableSubjects: string[] = ['Python', 'C#', 'C++', 'JavaScript', 'PHP', 'Java', 'SQL', 'HTML,CSS', 'Ruby', 'Go'];
  selectedSubject: string = '';
  formData: FormData = {
    firstname: '',
    middlename: '',
    lastname: '',
    gender: '',
    bloodgroup: '',
    subjects: [],
    mobilenumber: '',
    email: '',
    address1: '',
    address2: ''
  };
  subjectInputValue: string = '';


  addSubject() {
    this.formData.subjects.push(this.subjectInputValue);
    this.subjectInputValue = '';
  }

  removeSubject(subject: string) {
    const index = this.formData.subjects.indexOf(subject);
    if (index !== -1) {
      this.formData.subjects.splice(index, 1);
    }
  }

  submitForm() {
    
  }

}
