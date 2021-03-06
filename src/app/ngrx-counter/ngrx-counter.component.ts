import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Decrement, Increment, Reset } from '../actions/counter.actions';
import { CounterState } from '../reducers/counter.reducer';
import { AppState } from '../shared/app-state';

@Component({
  selector: 'app-ngrx-counter',
  templateUrl: './ngrx-counter.component.html',
  styleUrls: ['./ngrx-counter.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgRxCounterComponent {

  count$: Observable<CounterState>;

  constructor(private store: Store<AppState>) {
    this.count$ = store.pipe(select('counter'));
  }

  increment() {
    this.store.dispatch(new Increment());
  }

  decrement() {
    this.store.dispatch(new Decrement());
  }

  reset(resetNumber: string) {
    const number = parseInt(resetNumber, 10);
    if (!isNaN(number)) {
      this.store.dispatch(new Reset(number));
    }
  }

}
