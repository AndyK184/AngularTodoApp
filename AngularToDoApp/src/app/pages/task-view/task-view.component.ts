import { Component, OnInit } from '@angular/core';
import { Entry } from '../../models/entry-model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss'],
})
export class TaskViewComponent implements OnInit {
  input: string;

  taskList: Entry[] = [];

  constructor(private snackBar: MatSnackBar) {
    this.taskList = this.getLocalStorageTodoList();
  }

  ngOnInit(): void {}

  addEntry() {
    //check if Input is empty
    if (!!this.input) {
      //avoid duplicated Entries
      if (this.taskList.length > 0) {
        if (this.input == this.taskList[this.taskList.length - 1].name) {
          this.input = null;
          this.openSnackBar('Doppelter Eintrag. Hinzufügen gestoppt');
          return;
        }
      }
      let entryToPush = new Entry(this.input, false);
      this.taskList.push(entryToPush);
      this.input = null;
      this.setLocalStorageTodoList(this.taskList);
    }
  }

  changeDoneState(i) {
    if (this.taskList[i].isDone == true) {
      this.taskList[i].isDone = false;
      return;
    }

    this.taskList[i].isDone = true;
    this.setLocalStorageTodoList(this.taskList);
  }

  deleteEntry(i) {
    this.taskList.splice(i, 1);
    this.openSnackBar('Aufgabe erledigt. Gut gemacht!');
    this.setLocalStorageTodoList(this.taskList);
  }

  openSnackBar(message) {
    this.snackBar.open(message, 'Schließen', {
      duration: 2000,
    });
  }

  public getLocalStorageTodoList(): Entry[] {
    let localStorageItem = JSON.parse(localStorage.getItem('taskList'));
    return localStorageItem == null ? [] : localStorageItem.taskList;
  }
  private setLocalStorageTodoList(taskList: Entry[]): void {
    localStorage.setItem('taskList', JSON.stringify({ taskList: taskList }));
  }
}
