import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList} from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  constructor(
    private _database: AngularFireDatabase
  ) { }
  private _todoList: AngularFireList<any>;


  getTodoList(){
    this._todoList = this._database.list('titles');
    return this._todoList;
  }
  addTitle(title: string){
    this._todoList.push({
      title: title,
      isChecked: false
    });
  }
  checkOrUncheckTitle($key: string, flag: boolean){
    this._todoList.update($key, {isChecked: flag});
  }
  removeTitle($key: string){
    this._todoList.remove($key);
  }
}
