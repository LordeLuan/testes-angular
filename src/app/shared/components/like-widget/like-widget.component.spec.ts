import { LikeWidgetModule } from './like-widget.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LikeWidgetComponent } from './like-widget.component';

describe('LikeWidgetComponent', () => {
  let component: LikeWidgetComponent;
  let fixture: ComponentFixture<LikeWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LikeWidgetModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LikeWidgetComponent);
    component = fixture.componentInstance;
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('Should auto generate ID during ngOnInit when (@Input id) is not assigned', () => {
    // O ID é gerado aleatóriamente ao iniciar o componente por não ter sido passado
    fixture.detectChanges();
    expect(component.id).toBeTruthy();
  });

  it('Should NOT auto generate ID during ngOnInit when (@Input id) is assigned', () => {
    // é atribuido um valor ao id e depois detectado as mudanças logo o ngOnInit não vai receber um id nulo e não irá gerar um automaticamente
    const someId = 'someId';
    component.id = someId;
    fixture.detectChanges();
    expect(component.id).toBe(someId);
  });

  //Se tiver parametro na arrow function o jasmine 'habilita' um timeout e caso o metodo nao tenha expect irá dar erro ao invez de apenas um warning
  it(`${LikeWidgetComponent.prototype.like.name} should trigger (@Output liked) when called`, (done) => {
    fixture.detectChanges(); // Dispara ciclo de vida do angular

    component.liked.subscribe(() => {
      expect(true).toBeTrue();
      done();
    });

    component.like();
  });

  it(`${LikeWidgetComponent.prototype.like.name} should trigger emission when called (with SpyOn)`, () => {
    spyOn(component.liked, 'emit');
    fixture.detectChanges(); // Dispara ciclo de vida do angular
    // Chamando o método
    component.like();
    // O metodo toHaveBeenCalled para saber se a função foi chamada espera um Spy da função a ser testada
    expect(component.liked.emit).toHaveBeenCalled();
  });
});
