import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Product {
  name: string;
  price: number;
  quantity: number;
}

interface ProductDetail {
  mainImage: string;
  thumbnails: string[];
  longDescription: string;
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
  // Données des produits
  productDetails: { [key: string]: ProductDetail } = {
    'Boutique Premium': {
      mainImage: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600',
      thumbnails: [
        'https://images.unsplash.com/photo-1556742031-c6961e8560b0?w=200',
        'https://images.unsplash.com/photo-1556740741-8c5b8a5d8b7a?w=200',
        'https://images.unsplash.com/photo-1556740738-b6a2e2c9b9a0?w=200'
      ],
      longDescription: 'Créez votre boutique en ligne professionnelle avec notre solution clé en main. Inclut design personnalisé, gestion des stocks, paiements sécurisés et support 24/7.'
    },
    'Pack Marketing': {
      mainImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600',
      thumbnails: [
        'https://images.unsplash.com/photo-1557838923-2985c318be48?w=200',
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=200',
        'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=200'
      ],
      longDescription: 'Boostez votre visibilité avec notre pack marketing complet : campagnes Google Ads, SEO, email marketing et réseaux sociaux. Analyse des performances et reporting mensuel.'
    },
    'Audit SEO': {
      mainImage: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600',
      thumbnails: [
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=200',
        'https://images.unsplash.com/photo-1554224154-3915f5f6d6b3?w=200',
        'https://images.unsplash.com/photo-1556741533-411cf82e4e9d?w=200'
      ],
      longDescription: 'Audit technique et sémantique complet de votre site. Analyse des backlinks, suggestions d\'optimisation et plan d\'action priorisé pour améliorer votre classement Google.'
    }
  };

  // État du panier
  cart: Product[] = [];
  cartOpen = false;
  removingIndex = -1; // Nouveau : index de l'article en suppression
  showProductModal = false;
  showPaymentModal = false;

  // Données du produit actuel
  currentProductName = '';
  currentProductPrice = 0;
  currentProductImage = '';
  currentProductThumbnails: string[] = [];
  currentProductDescription = '';
  quantity = 1;

  // Données du formulaire de paiement
  paymentForm: PaymentFormData = {
    name: '',
    email: '',
    address: '',
    card: '',
    expiry: '',
    cvv: ''
  };

  constructor() {
    this.loadCartFromStorage();
  }

  ngOnInit() {
    // Initialiser le panier depuis localStorage
  }

  // ========== GESTION DU PANIER ==========

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
    if (this.cartOpen) {
      document.body.classList.add('drawer-open');
    } else {
      document.body.classList.remove('drawer-open');
    }
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
    // Marquer l'article comme en suppression pour l'animation
    this.removingIndex = index;

    // Attendre la fin de l'animation (300ms) avant de supprimer réellement
    setTimeout(() => {
      this.cart.splice(index, 1);
      this.removingIndex = -1;
      this.saveCartToStorage();
    }, 300);
  }

  // ========== MODAL PRODUIT ==========

  openProductModal(name: string, price: number) {
    const details = this.productDetails[name] || {
      mainImage: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600',
      thumbnails: [],
      longDescription: 'Description non disponible.'
    };

    this.currentProductName = name;
    this.currentProductPrice = price;
    this.currentProductImage = details.mainImage;
    this.currentProductThumbnails = details.thumbnails;
    this.currentProductDescription = details.longDescription;
    this.quantity = 1;
    this.showProductModal = true;
  }

  closeProductModal() {
    this.showProductModal = false;
  }

  selectThumbnail(index: number, thumb: string) {
    // Remplacer w=200 par w=600 pour avoir une image haute résolution
    this.currentProductImage = thumb.replace('w=200', 'w=600');
  }

  decrementQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  incrementQuantity() {
    if (this.quantity < 99) {
      this.quantity++;
    }
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

  // ========== MODAL PAIEMENT ==========

  openPaymentModal() {
    if (this.cart.length === 0) {
      alert('Votre panier est vide.');
      return;
    }
    this.cartOpen = false;
    document.body.classList.remove('drawer-open');
    this.showPaymentModal = true;
  }

  closePaymentModal() {
    this.showPaymentModal = false;
    document.body.classList.remove('drawer-open');
  }

  submitPayment() {
    // Validation simple
    if (!this.paymentForm.name || !this.paymentForm.email || !this.paymentForm.address ||
        !this.paymentForm.card || !this.paymentForm.expiry || !this.paymentForm.cvv) {
      alert('Veuillez remplir tous les champs.');
      return;
    }

    // Simuler le paiement
    alert('Paiement effectué avec succès ! Merci pour votre commande.');

    // Vider le panier
    this.cart = [];
    this.saveCartToStorage();

    // Réinitialiser le formulaire
    this.paymentForm = {
      name: '',
      email: '',
      address: '',
      card: '',
      expiry: '',
      cvv: ''
    };

    this.closePaymentModal();
  }
}

