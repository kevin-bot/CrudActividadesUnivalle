import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Actividad } from '../modelo/actividad';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private db: AngularFirestore) { }

  private todoCollectionName = 'myactividades';

  getTodos(): Observable<firebase.firestore.QuerySnapshot> {
    return this.db.collection<Actividad>(this.todoCollectionName, ref => ref.orderBy('lastModifiedDate', 'desc')).get();
  }

  saveTodo(todo: Actividad): Promise<DocumentReference> {
    return this.db.collection(this.todoCollectionName).add(todo);
  }

  // editTodo(todo: TodoViewModel): Promise<void>{
    // return this.db.collection(this.todoCollectionName).doc(todo.id).update(todo);
  // }

  editTodoPartial(id: string, obj: Object): Promise<void>{
    return this.db.collection(this.todoCollectionName).doc(id).update(obj);
  }
  deleteTodo(idTodo: string): Promise<void>{
    return this.db.collection(this.todoCollectionName).doc(idTodo).delete();
  }
}
