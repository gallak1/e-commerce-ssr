import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { CartService } from '../../services/cart.service';
import { Product } from '../../interfaces/product';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let cartService: CartService;
  const product: Product = {
    id: 1,
    title: 'Produto',
    price: 10,
    image: 'produto.jpg',
    ingredients: '',
    category: 'Categoria',
    imageDetails: ''
  };

  beforeEach(async () => {
    localStorage.removeItem('productsCartList');

    await TestBed.configureTestingModule({
      imports: [HeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    cartService = TestBed.inject(CartService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Adiciona produtos emitidos e salva na lista e no localstorage', () => {
    cartService.addProduct(product);

    expect(component.productsCartList()).toEqual([product]);
    expect(JSON.parse(localStorage.getItem('productsCartList')!)).toEqual([product]);
  });
});
