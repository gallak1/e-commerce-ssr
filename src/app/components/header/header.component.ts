import { CommonModule } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';
import { Component, computed, DestroyRef, inject, Inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatBadgeModule } from '@angular/material/badge';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { Product } from '../../interfaces/product';
import { CartService } from '../../services/cart.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule, 
    MatToolbarModule, 
    MatIconModule, 
    MatButtonModule,
    MatBadgeModule,
    RouterLink
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  private readonly cartService = inject(CartService);
  private readonly destroyRef = inject(DestroyRef);

  productsCartList = signal<Product[]>([]);
  totalProductsPrice = computed(() => {
    if(!this.productsCartList().length) return 0;
    return this.productsCartList()
      .map(item => item.price)
      .reduce((acc, item) => {
        acc = acc + item;
        return acc
      });
  });
  cartOpen = false;
  private readonly isBrowser: boolean;


  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    this.loadCart();
    this.cartService.productAdded$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(product => {
        const products = [...this.productsCartList(), product];
        this.productsCartList.set(products);
        this.saveCart(products);
      });
  }

  private loadCart(): void {
    if (!this.isBrowser) return;

    const savedProducts = localStorage.getItem('productsCartList');
    if (savedProducts !== null) {
      this.productsCartList.set(JSON.parse(savedProducts));
    }
  }

  private saveCart(products: Product[]): void {
    if (!this.isBrowser) return;

    localStorage.setItem('productsCartList', JSON.stringify(products));
  }
}
