import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdicionarPessoaComponent } from './adicionar-pessoa.component';

describe('AdicionarPessoaComponent', () => {
  let component: AdicionarPessoaComponent;
  let fixture: ComponentFixture<AdicionarPessoaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdicionarPessoaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdicionarPessoaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
