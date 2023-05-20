import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';


@Component({
  selector: 'app-chips',
  templateUrl: './chips.component.html',
  styleUrls: ['./chips.component.css']
})
export class ChipsComponent {
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl('');
  filteredFruits: Observable<string[]>;
  fruits: string[] = [];
  allFruits: string[] = ['HTML', 'CSS', 'JAVA', 'PYTHON', 'SQL', 'C++', 'C#'];
  selectedSubjectCount = 0;

  @ViewChild('fruitInput')
  fruitInput!: ElementRef<HTMLInputElement>;

  constructor() {
    this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => (fruit ? this._filter(fruit) : this.allFruits.slice())),
    );
  }
  private _filter(fruit: string): any {
    throw new Error('Method not implemented.');
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our subject if the maximum limit has not been reached
    if (value && this.selectedSubjectCount < 5) {
      this.fruits.push(value);
      this.selectedSubjectCount++;
    }

    // Clear the input value
    event.chipInput!.clear();

    this.fruitCtrl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
      this.selectedSubjectCount--;
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const selectedSubject = event.option.viewValue;
  
    // Check if the subject is already selected
    if (this.fruits.includes(selectedSubject)) {
      return; // Do not proceed if the subject is already selected
    }
  
    // Add the selected subject if the maximum limit has not been reached
    if (this.selectedSubjectCount < 5) {
      this.fruits.push(selectedSubject);
      this.selectedSubjectCount++;
    }
  
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
  }
}