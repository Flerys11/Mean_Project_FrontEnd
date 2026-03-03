import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ArticleService, Article } from 'src/app/services/article/article.service';

interface CartItem {
  name: string;
  price: number;
  quantity: number;
}

interface PaymentFormData {
  name: string;
  email: string;
  address: string;
  card: string;
  expiry: string;
  cvv: string;
}

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './client.component.html',
  styleUrl: './client.component.scss'
})
export class ClientComponent implements OnInit {

  articles: Article[] = [];
  loadingArticles = true;

  cart: CartItem[] = [];
  cartOpen = false;
  removingIndex = -1;
  showProductModal = false;
  showPaymentModal = false;

  currentProductName = '';
  currentProductPrice = 0;
  currentProductImage = '';
  currentProductThumbnails: string[] = [];
  currentProductDescription = '';
  quantity = 1;

  paymentForm: PaymentFormData = {
    name: '', email: '', address: '', card: '', expiry: '', cvv: ''
  };

  constructor(private articleService: ArticleService) {
    this.loadCartFromStorage();
  }

  selectedThumbnailIndex: number = 0;

  ngOnInit() {
    this.articleService.getAllArticles(1, 100).subscribe({
      next: (res) => {
        this.articles = res.data || res;
        this.loadingArticles = false;
      },
      error: () => { this.loadingArticles = false; }
    });
  }

  getPhotoUrl(photo: string): string {
    if (!photo) return 'https://via.placeholder.com/400x300?text=No+Image';

    if (photo.startsWith('http') || photo.startsWith('/')) {
      return photo;
    }

    if (photo.startsWith('data:image')) {
      return photo;
    }

    return 'https://via.placeholder.com/400x300?text=No+Image';
  }

  getArticleMainImage(article: Article): string {
    if (article.photo && article.photo.length > 0) {
      return this.getPhotoUrl(article.photo[0]);
    }
    return 'https://via.placeholder.com/400x300?text=No+Image';
  }


  loadCartFromStorage() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this.cart = JSON.parse(savedCart).map((item: any) => ({
        name: item.name,
        price: Number(item.price) || 0,
        quantity: item.quantity || 1
      }));
    }
  }

  saveCartToStorage() {
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  getCartCount(): number {
    return this.cart.reduce((total, item) => total + item.quantity, 0);
  }

  getCartTotal(): number {
    return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  toggleCart() {
    this.cartOpen = !this.cartOpen;
    document.body.classList.toggle('drawer-open', this.cartOpen);
  }

  decrementCartItem(index: number) {
    if (this.cart[index].quantity > 1) {
      this.cart[index].quantity--;
    } else {
      this.cart.splice(index, 1);
    }
    this.saveCartToStorage();
  }

  incrementCartItem(index: number) {
    this.cart[index].quantity++;
    this.saveCartToStorage();
  }

  removeCartItem(index: number) {
    this.removingIndex = index;
    setTimeout(() => {
      this.cart.splice(index, 1);
      this.removingIndex = -1;
      this.saveCartToStorage();
    }, 300);
  }

  openProductModal(name: string, price: number, image: string, thumbnails: string[], description: string) {
    this.currentProductName = name;
    this.currentProductPrice = price;
    this.currentProductImage = image;
    this.currentProductThumbnails = thumbnails;
    this.currentProductDescription = description;
    this.quantity = 1;
    this.showProductModal = true;
  }

  openArticleModal(article: Article) {
    this.openProductModal(
      article.nom_article,
      article.prix,
      this.getArticleMainImage(article),
      article.photo || [],
      article.description
    );
  }

  closeProductModal() {
    this.showProductModal = false;
  }

  selectThumbnail(index: number, thumb: string) {
    this.currentProductImage = thumb;
    this.selectedThumbnailIndex = index;
  }

  decrementQuantity() {
    if (this.quantity > 1) this.quantity--;
  }

  incrementQuantity() {
    if (this.quantity < 99) this.quantity++;
  }

  addToCart() {
    const existing = this.cart.find(item => item.name === this.currentProductName);
    if (existing) {
      existing.quantity += this.quantity;
    } else {
      this.cart.push({
        name: this.currentProductName,
        price: this.currentProductPrice,
        quantity: this.quantity
      });
    }
    this.saveCartToStorage();
    this.closeProductModal();
  }

  openPaymentModal() {
    if (this.cart.length === 0) { alert('Votre panier est vide.'); return; }
    this.cartOpen = false;
    document.body.classList.remove('drawer-open');
    this.showPaymentModal = true;
  }

  closePaymentModal() {
    this.showPaymentModal = false;
  }

  submitPayment() {
    const f = this.paymentForm;
    if (!f.name || !f.email || !f.address || !f.card || !f.expiry || !f.cvv) {
      alert('Veuillez remplir tous les champs.');
      return;
    }
    alert('Paiement effectué avec succès ! Merci pour votre commande.');
    this.cart = [];
    this.saveCartToStorage();
    this.paymentForm = { name: '', email: '', address: '', card: '', expiry: '', cvv: '' };
    this.closePaymentModal();
  }

}
