/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ViagensComponent } from './viagens.component';

describe('ViagensComponent', () => {
  let component: ViagensComponent;
  let fixture: ComponentFixture<ViagensComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViagensComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViagensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
