import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { take, toArray } from 'rxjs/operators';

import { qaElement, initSpecHelpers, IQAElement } from '../spec-helpers/qq.spec-helper';
import { IndependentCounterComponent } from './independent-counter.component';
import { detectChanges } from '../spec-helpers/stateful-element.spec-helper';

const startCount = 123;
const newCount = 456;

describe('IndependentCounterComponent', () => {
  let component: IndependentCounterComponent;
  let fixture: ComponentFixture<IndependentCounterComponent>;

  let incrementButton: IQAElement;
  let decrementButton: IQAElement;
  let resetButton: IQAElement;
  let resetInput: IQAElement;
  let countElement: IQAElement;

  function expectCount(count: number) {
    countElement.expectText(String(count));
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IndependentCounterComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndependentCounterComponent);
    initSpecHelpers(fixture);
    component = fixture.componentInstance;
    component.startCount = startCount;
    component.ngOnChanges();
    detectChanges();

    incrementButton = qaElement('increment-button');
    decrementButton = qaElement('decrement-button');
    resetButton = qaElement('reset-button');
    resetInput = qaElement('reset-input');
    countElement = qaElement('count');
  });

  it('shows the start count', () => {
    expectCount(startCount);
  });

  it('increments the count', () => {
    incrementButton.click();
    fixture.detectChanges();
    expectCount(startCount + 1);
  });

  it('decrements the count', () => {
    decrementButton.click();
    detectChanges();
    expectCount(startCount - 1);
  });

  it('resets the count', () => {
    resetInput.nativeElement.value = String(newCount);
    resetButton.click();
    detectChanges();
    detectChanges();
    expectCount(newCount);
  });

  it('emits countChange events', async(() => {
    component.countChange.pipe(take(3), toArray()).subscribe((events) => {
      expect(events).toEqual([startCount + 1, startCount, newCount]);
    });
    incrementButton.click();
    decrementButton.click();
    resetInput.nativeElement.value = String(newCount);
    resetButton.click();
  }));

});
