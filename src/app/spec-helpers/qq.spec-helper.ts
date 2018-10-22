import { ComponentFixture } from '@angular/core/testing';
import { findEl, click, initSpecHelpers as initSpecHelpersStateful, expectText } from './stateful-element.spec-helper';
import { DebugElement } from '@angular/core';

/**
 * Sets the fixture on which all functions exported in this file operate.
 *
 * @param fixture The fixture on which all functions operate.
 */
export function initSpecHelpers(fixture: any) {
  initSpecHelpersStateful(fixture);
}

export interface IQAElement extends DebugElement {
  selector: string;

  click: () => void;

  expectText: (text: string) => void;
}


export function qaElement(selector: string): IQAElement {
  const el = findEl(selector) as IQAElement;
  /*
   * This could also be done by extending DebugElement's prototype, but I think that
   * would create more confusion.
   */
  el.click = () => click(selector);
  el.expectText = (text: string) => expectText(selector, text);
  return el;
}
