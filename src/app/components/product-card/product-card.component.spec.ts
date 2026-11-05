import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { ProductCardComponent } from './product-card.component';
import { CartService } from '../../services/cart.service';
import { Product } from '../../interfaces/product';

describe('ProductCardComponent', () => {
  let component: ProductCardComponent;
  let fixture: ComponentFixture<ProductCardComponent>;
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
    await TestBed.configureTestingModule({
      imports: [ProductCardComponent],
      providers: [provideRouter([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductCardComponent);
    component = fixture.componentInstance;
    component.product = product;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('emits the product to the cart service', () => {
    let emittedProduct: Product | undefined;
    TestBed.inject(CartService).productAdded$.subscribe(value => {
      emittedProduct = value;
    });

    component.addToCart();

    expect(emittedProduct).toEqual(product);
  });
});
