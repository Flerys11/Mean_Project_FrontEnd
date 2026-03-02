import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ArticleService, Article } from 'src/app/services/article/article.service';
import {CommandeService} from "../../services/commande/commande.service";

interface CartItem {
  name: string;
  price: number;
  quantity: number;
  id: string;
}

interface PaymentFormData {
  nom: string;
  contact: string;
  adresse: string;
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
  currentProductId = '';
  currentProductPrice = 0;
  currentProductImage = '';
  currentProductThumbnails: string[] = [];
  currentProductDescription = '';
  quantity = 1;

  paymentForm: PaymentFormData = {
    nom: '', contact: '', adresse: '',
  };

  constructor(private articleService: ArticleService, private commandeService: CommandeService) {
    this.loadCartFromStorage();
  }

  ngOnInit() {
    this.articleService.getAllArticles(1, 100).subscribe({
      next: (res) => {
        this.articles = res.data || res;

        this.loadingArticles = false;
      },
      error: () => { this.loadingArticles = false; }
    });
  }

  getArticleMainImage(article: Article): string {
    return article.photo && article.photo.length > 0 ? article.photo[0] : 'https://via.placeholder.com/400x300?text=No+Image';
  }

  // ========== PANIER ==========

  loadCartFromStorage() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this.cart = JSON.parse(savedCart).map((item: any) => ({
        id: item.id,
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

  // ========== MODAL PRODUIT ==========

  openProductModal(name: string, price: number, image: string, thumbnails: string[], description: string, id: string) {
    this.currentProductName = name;
    this.currentProductPrice = price;
    this.currentProductImage = image;
    this.currentProductThumbnails = thumbnails;
    this.currentProductDescription = description;
    this.currentProductId= id;
    this.quantity = 1;
    this.showProductModal = true;
  }

  openArticleModal(article: Article) {
    this.openProductModal(
      article.nom_article,
      article.prix,
      this.getArticleMainImage(article),
      article.photo || [],
      article.description,
      article._id
    );
  }

  closeProductModal() {
    this.showProductModal = false;
  }

  selectThumbnail(index: number, thumb: string) {
    this.currentProductImage = thumb;
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
        quantity: this.quantity,
        id: this.currentProductId,
      });
    }
    this.saveCartToStorage();
    this.closeProductModal();
  }

  // ========== MODAL PAIEMENT ==========

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
    if (!this.paymentForm.nom || !this.paymentForm.contact || !this.paymentForm.adresse) {
      alert('Veuillez remplir tous les champs');
      return;
    }

    if (!this.cart || this.cart.length === 0) {
      alert('Votre panier est vide');
      return;
    }

    const payload = {
      nom_client: this.paymentForm.nom,
      contact_client: this.paymentForm.contact,
      adresse_client: this.paymentForm.adresse,
      articles: this.cart.map(item => ({
        article: item.id,
        quantite: item.quantity
      }))
    };


    this.commandeService.create(payload).subscribe({
      next: () => {
        alert('Commande envoyée avec succès');

        this.cart = [];
        this.paymentForm = { nom: '', contact: '', adresse: '' };
        this.closePaymentModal();
      },
      error: (err) => {
        console.error('Erreur backend:', err);

        const message =
          err?.error?.message ||
          err?.error?.error ||
          'Erreur lors de la commande';

        alert(message);
      }
    });
  }
}
