import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  faBuildingColumns,
  faArrowUp,
  faArrowDown,
  faCircleArrowDown,
  faCircleArrowUp,
  faTrash,
  faPenToSquare,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  balance!: number;
  income!: number;
  faBuildingColumns = faBuildingColumns;
  faArrowUp = faArrowUp;
  faArrowDown = faArrowDown;
  faTrash = faTrash;
  faCircleArrowDown = faCircleArrowDown;
  faCircleArrowUp = faCircleArrowUp;
  faPenToSquare = faPenToSquare;
  cont!: any;
  isChecked: boolean = false;
  form!: FormGroup;
  itemsSource: any = [
    {
      description: 'aadddddddddddddddddddddddddddd',
      value: 1000,
      type: true,
    },
    {
      description: 'a',
      value: 2000,
      type: false,
    },
  ];

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.balance = 2000;
    this.income = 20000;
    this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group({
      description: ['', Validators.required],
      value: ['', Validators.required],
      checks: ['', Validators.required],
    });
  }

  hiddeContainer() {
    this.cont = !this.cont;
  }

  changeCheck() {
    console.log(this.form.value);
  }
}
