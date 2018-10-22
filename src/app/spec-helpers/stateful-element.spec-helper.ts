/* istanbul ignore file */

import { DebugElement } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

/* Using a global var is not the best practice, but for helpers, the benefits of
 * not having to pass in a fixture to each function call outweighs the benefits.
 */
let lastFixture: ComponentFixture<any>;

/**
 * Sets the fixture on which all functions exported in this file operate.
 *
 * @param fixture The fixture on which all functions operate.
 */
export function initSpecHelpers(fixture: any) {
  lastFixture = fixture;
}

/**
 * Finds a single element with a CSS selector.
 * Throws an error if no element was found.
 */
function queryByCss<T>(
  selector: string
): DebugElement {
  checkFixture();

  // The return type of DebugElement#query() is declared as DebugElement,
  // but the actual return type is DebugElement | null.
  // See https://github.com/angular/angular/issues/22449.
  const debugElement = lastFixture.debugElement.query(By.css(selector));
  // Fail on null so the return type is always DebugElement.
  if (!debugElement) {
    throw new Error(`queryByCss: Element with ${selector} not found`);
  }
  return debugElement;
}

function checkFixture() {
  if (!lastFixture) {
    throw new Error('Fixture not set. Call initSpecHelpers() in beforeEach.');
  }
}

// Finds an element with the given 'data-qa' attribute.
// Throws an error if no element was found.
export function findEl<T>(
  qaAttribute: string
): DebugElement {
  return queryByCss<T>(`[data-qa="${qaAttribute}"]`);
}

// Finds all elements with the given 'data-qa' attribute.
export function findEls<T>(
  qaAttribute: string
): DebugElement[] {
  checkFixture();
  return lastFixture.debugElement.queryAll(By.css(`[data-qa="${qaAttribute}"]`));
}

// Gets the text content of an element with the given 'data-qa' attribute.
export function getText<T>(
  qaAttribute: string
): string {
  return findEl(qaAttribute).nativeElement.textContent;
}

// Expects that the element with the given 'data-qa' attribute has the given text content.
export function expectText<T>(
  qaAttribute: string,
  text: string
) {
  expect(getText(qaAttribute).trim()).toBe(text);
}

// Expects that the element of a component has the given text content.
export function expectContent<T>(
  text: string
) {
  checkFixture();
  expect(lastFixture.nativeElement.textContent.trim()).toBe(text);
}

// Makes a fake click event that provides the most important properties.
export function makeClickEvent(target: EventTarget): Partial<MouseEvent> {
  return {
    preventDefault() { },
    stopPropagation() { },
    stopImmediatePropagation() { },
    type: 'click',
    target: target,
    currentTarget: target,
    bubbles: true,
    cancelable: true
  };
}

// Emulates a left click on the element with the given 'data-qa' attribute.
export function click<T>(
  qaAttribute: string
) {
  console.log('clicking: ', qaAttribute);
  const el = findEl(qaAttribute);
  const event = makeClickEvent(el.nativeElement);
  el.triggerEventHandler('click', event);
}

// Finds a nested component by its selector, e.g. 'app-example'.
// Throws an error if no element was found.
// Use this only for shallow component testing.
// When finding other elements, use findEl(s) and data-qa attributes.
export function findComponent<T>(
  selector: string
): DebugElement {
  return queryByCss(selector);
}

// Finds all nested components by its selector, e.g. 'app-example'.
export function findComponents<T>(
  selector: string
): DebugElement[] {
  checkFixture();
  return lastFixture.debugElement.queryAll(By.css(selector));
}

/** Detects changes on the global fixture */
export function detectChanges(...args: any[]) {
  checkFixture();
  lastFixture.detectChanges(...args);
}
