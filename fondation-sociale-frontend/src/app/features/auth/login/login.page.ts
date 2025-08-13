import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  template: `
    <!-- Header Navigation -->
    <nav class="auth-nav">
      <div class="nav-container">
        <div class="nav-brand">
          <img src="/assets/logo-fondation.png" alt="Fondation Sociale" class="logo">
          <span class="brand-text">Fondation Sociale</span>
        </div>
        <div class="nav-actions">
          <a routerLink="/" class="btn-home">
            <i class="fas fa-home"></i>
            Retour à l'accueil
          </a>
        </div>
      </div>
    </nav>

    <!-- Main Login Container -->
    <div class="login-container">
      <!-- Background Elements -->
      <div class="bg-elements">
        <div class="bg-shape shape-1"></div>
        <div class="bg-shape shape-2"></div>
        <div class="bg-shape shape-3"></div>
      </div>

      <div class="login-content">
        <!-- Left Side - Branding -->
        <div class="login-brand">
          <div class="brand-content">
            <div class="brand-logo">
              <img src="/assets/logo-fondation.png" alt="Fondation Sociale">
            </div>
            <h1 class="brand-title">Fondation Sociale</h1>
            <h2 class="brand-subtitle">Ministère de l'Investissement</h2>
            <p class="brand-description">
              Plateforme numérique dédiée à l'accompagnement social et 
              au soutien des citoyens marocains.
            </p>
            <div class="brand-features">
              <div class="feature-item">
                <i class="fas fa-shield-alt"></i>
                <span>Sécurisé et confidentiel</span>
              </div>
              <div class="feature-item">
                <i class="fas fa-clock"></i>
                <span>Disponible 24h/24</span>
              </div>
              <div class="feature-item">
                <i class="fas fa-mobile-alt"></i>
                <span>Accessible partout</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Side - Login Form -->
        <div class="login-form-container">
          <div class="form-wrapper">
            <!-- Form Header -->
            <div class="form-header">
              <h2 class="form-title">Connexion à votre espace</h2>
              <p class="form-subtitle">
                Accédez à vos services personnalisés et suivez vos demandes
              </p>
            </div>

            <!-- Login Form -->
            <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="login-form">
              <!-- Email Field -->
              <div class="form-group">
                <label for="email" class="form-label">
                  <i class="fas fa-envelope"></i>
                  Adresse email
                </label>
                <input
                  type="email"
                  id="email"
                  formControlName="email"
                  class="form-control"
                  [class.error]="isFieldInvalid('email')"
                  placeholder="votre.email@exemple.com">
                <div class="error-message" *ngIf="isFieldInvalid('email')">
                  <i class="fas fa-exclamation-circle"></i>
                  <span *ngIf="loginForm.get('email')?.errors?.['required']">
                    L'adresse email est obligatoire
                  </span>
                  <span *ngIf="loginForm.get('email')?.errors?.['email']">
                    Format d'email invalide
                  </span>
                </div>
              </div>

              <!-- Password Field -->
              <div class="form-group">
                <label for="password" class="form-label">
                  <i class="fas fa-lock"></i>
                  Mot de passe
                </label>
                <div class="password-input">
                  <input
                    [type]="showPassword ? 'text' : 'password'"
                    id="password"
                    formControlName="password"
                    class="form-control"
                    [class.error]="isFieldInvalid('password')"
                    placeholder="Saisissez votre mot de passe">
                  <button
                    type="button"
                    class="password-toggle"
                    (click)="togglePassword()">
                    <i [class]="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                  </button>
                </div>
                <div class="error-message" *ngIf="isFieldInvalid('password')">
                  <i class="fas fa-exclamation-circle"></i>
                  <span *ngIf="loginForm.get('password')?.errors?.['required']">
                    Le mot de passe est obligatoire
                  </span>
                  <span *ngIf="loginForm.get('password')?.errors?.['minlength']">
                    Le mot de passe doit contenir au moins 6 caractères
                  </span>
                </div>
              </div>

              <!-- Remember & Forgot -->
              <div class="form-options">
                <label class="checkbox-label">
                  <input type="checkbox" formControlName="rememberMe" class="checkbox">
                  <span class="checkmark"></span>
                  Se souvenir de moi
                </label>
                <a href="#" class="forgot-link" (click)="onForgotPassword()">
                  Mot de passe oublié ?
                </a>
              </div>

              <!-- Submit Button -->
              <button
                type="submit"
                class="btn-login"
                [disabled]="loginForm.invalid || isLoading"
                [class.loading]="isLoading">
                <span *ngIf="!isLoading" class="btn-text">
                  <i class="fas fa-sign-in-alt"></i>
                  Se connecter
                </span>
                <span *ngIf="isLoading" class="btn-loading">
                  <i class="fas fa-spinner fa-spin"></i>
                  Connexion en cours...
                </span>
              </button>

              <!-- Error Message -->
              <div class="login-error" *ngIf="loginError">
                <i class="fas fa-exclamation-triangle"></i>
                {{ loginError }}
              </div>
            </form>

            <!-- Divider -->
            <div class="form-divider">
              <span>Ou connectez-vous avec</span>
            </div>

            <!-- Social Login -->
            <div class="social-login">
              <button class="social-btn google" (click)="loginWithGoogle()">
                <i class="fab fa-google"></i>
                Google
              </button>
              <button class="social-btn microsoft" (click)="loginWithMicrosoft()">
                <i class="fab fa-microsoft"></i>
                Microsoft
              </button>
            </div>

            <!-- Register Link -->
            <div class="form-footer">
              <p>
                Vous n'avez pas encore de compte ?
                <a routerLink="/auth/register" class="register-link">
                  Créer un compte
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Government Footer -->
    <footer class="auth-footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-links">
            <a href="#">Aide</a>
            <a href="#">Confidentialité</a>
            <a href="#">Conditions d'utilisation</a>
            <a href="#">Contact</a>
          </div>
          <div class="footer-copyright">
            <p>&copy; 2024 Fondation Sociale - Ministère de l'Investissement</p>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    /* Reset & Base */
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: #f8f9fa;
      min-height: 100vh;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
    }

    /* Auth Navigation */
    .auth-nav {
      background: white;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      position: sticky;
      top: 0;
      z-index: 1000;
    }

    .nav-container {
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 20px;
    }

    .nav-brand {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .logo {
      height: 40px;
      width: auto;
    }

    .brand-text {
      font-size: 1.2rem;
      font-weight: 600;
      color: #2d5a2d;
    }

    .btn-home {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 16px;
      background: transparent;
      border: 2px solid #2d5a2d;
      color: #2d5a2d;
      text-decoration: none;
      border-radius: 6px;
      font-weight: 500;
      transition: all 0.3s ease;
    }

    .btn-home:hover {
      background: #2d5a2d;
      color: white;
    }

    /* Login Container */
    .login-container {
      min-height: calc(100vh - 140px);
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem 0;
    }

    /* Background Elements */
    .bg-elements {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
      z-index: 1;
    }

    .bg-shape {
      position: absolute;
      border-radius: 50%;
      background: linear-gradient(135deg, rgba(45, 90, 45, 0.05), rgba(45, 90, 45, 0.1));
      animation: float 6s ease-in-out infinite;
    }

    .shape-1 {
      width: 300px;
      height: 300px;
      top: 10%;
      left: 5%;
      animation-delay: 0s;
    }

    .shape-2 {
      width: 200px;
      height: 200px;
      top: 60%;
      right: 10%;
      animation-delay: 2s;
    }

    .shape-3 {
      width: 150px;
      height: 150px;
      bottom: 20%;
      left: 15%;
      animation-delay: 4s;
    }

    @keyframes float {
      0%, 100% { transform: translateY(0) rotate(0deg); }
      50% { transform: translateY(-20px) rotate(180deg); }
    }

    /* Login Content */
    .login-content {
      position: relative;
      z-index: 10;
      display: grid;
      grid-template-columns: 1fr 1fr;
      max-width: 1200px;
      width: 100%;
      background: white;
      border-radius: 20px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.1);
      overflow: hidden;
      min-height: 600px;
    }

    /* Left Side - Branding */
    .login-brand {
      background: linear-gradient(135deg, #2d5a2d 0%, #3a6b3a 50%, #4a7c4a 100%);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 3rem;
      position: relative;
    }

    .login-brand::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="20" cy="20" r="1" fill="white" opacity="0.1"/><circle cx="80" cy="40" r="1" fill="white" opacity="0.1"/><circle cx="40" cy="80" r="1" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
      opacity: 0.3;
    }

    .brand-content {
      position: relative;
      z-index: 2;
      text-align: center;
      max-width: 350px;
    }

    .brand-logo img {
      width: 80px;
      height: 80px;
      margin-bottom: 1.5rem;
      filter: brightness(0) invert(1);
    }

    .brand-title {
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
      text-shadow: 0 2px 4px rgba(0,0,0,0.3);
    }

    .brand-subtitle {
      font-size: 1.2rem;
      font-weight: 300;
      margin-bottom: 1.5rem;
      opacity: 0.9;
    }

    .brand-description {
      font-size: 1rem;
      line-height: 1.6;
      margin-bottom: 2rem;
      opacity: 0.9;
    }

    .brand-features {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .feature-item {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 0.95rem;
    }

    .feature-item i {
      font-size: 1.2rem;
      color: #90c695;
    }

    /* Right Side - Form */
    .login-form-container {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 3rem;
    }

    .form-wrapper {
      width: 100%;
      max-width: 400px;
    }

    .form-header {
      text-align: center;
      margin-bottom: 2rem;
    }

    .form-title {
      font-size: 1.8rem;
      font-weight: 600;
      color: #333;
      margin-bottom: 0.5rem;
    }

    .form-subtitle {
      color: #666;
      font-size: 0.95rem;
      line-height: 1.4;
    }

    /* Form Styles */
    .login-form {
      margin-bottom: 2rem;
    }

    .form-group {
      margin-bottom: 1.5rem;
    }

    .form-label {
      display: flex;
      align-items: center;
      gap: 8px;
      font-weight: 500;
      color: #333;
      margin-bottom: 0.5rem;
      font-size: 0.9rem;
    }

    .form-label i {
      color: #2d5a2d;
      font-size: 0.9rem;
    }

    .form-control {
      width: 100%;
      padding: 12px 16px;
      border: 2px solid #e0e0e0;
      border-radius: 8px;
      font-size: 1rem;
      transition: all 0.3s ease;
      background: #fafafa;
    }

    .form-control:focus {
      outline: none;
      border-color: #2d5a2d;
      background: white;
      box-shadow: 0 0 0 3px rgba(45, 90, 45, 0.1);
    }

    .form-control.error {
      border-color: #dc3545;
      background: #fff5f5;
    }

    .password-input {
      position: relative;
    }

    .password-toggle {
      position: absolute;
      right: 12px;
      top: 50%;
      transform: translateY(-50%);
      background: none;
      border: none;
      color: #666;
      cursor: pointer;
      padding: 4px;
      border-radius: 4px;
      transition: color 0.3s ease;
    }

    .password-toggle:hover {
      color: #2d5a2d;
    }

    .error-message {
      display: flex;
      align-items: center;
      gap: 6px;
      color: #dc3545;
      font-size: 0.85rem;
      margin-top: 0.5rem;
    }

    .error-message i {
      font-size: 0.8rem;
    }

    /* Form Options */
    .form-options {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
    }

    .checkbox-label {
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
      font-size: 0.9rem;
      color: #666;
    }

    .checkbox {
      width: 16px;
      height: 16px;
      border: 2px solid #ddd;
      border-radius: 3px;
      appearance: none;
      cursor: pointer;
      position: relative;
      transition: all 0.3s ease;
    }

    .checkbox:checked {
      background: #2d5a2d;
      border-color: #2d5a2d;
    }

    .checkbox:checked::after {
      content: '✓';
      position: absolute;
      top: -2px;
      left: 1px;
      color: white;
      font-size: 12px;
      font-weight: bold;
    }

    .forgot-link {
      color: #2d5a2d;
      text-decoration: none;
      font-size: 0.9rem;
      font-weight: 500;
      transition: color 0.3s ease;
    }

    .forgot-link:hover {
      color: #1f3f1f;
      text-decoration: underline;
    }

    /* Login Button */
    .btn-login {
      width: 100%;
      padding: 14px;
      background: linear-gradient(135deg, #2d5a2d, #3a6b3a);
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
    }

    .btn-login:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(45, 90, 45, 0.3);
    }

    .btn-login:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }

    .btn-login.loading {
      pointer-events: none;
    }

    .btn-text,
    .btn-loading {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }

    /* Login Error */
    .login-error {
      display: flex;
      align-items: center;
      gap: 8px;
      background: #fff5f5;
      border: 1px solid #fecaca;
      color: #dc3545;
      padding: 12px;
      border-radius: 6px;
      margin-top: 1rem;
      font-size: 0.9rem;
    }

    /* Divider */
    .form-divider {
      text-align: center;
      margin: 2rem 0;
      position: relative;
    }

    .form-divider::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 0;
      width: 100%;
      height: 1px;
      background: #e0e0e0;
    }

    .form-divider span {
      background: white;
      padding: 0 1rem;
      color: #666;
      font-size: 0.9rem;
    }

    /* Social Login */
    .social-login {
      display: flex;
      gap: 1rem;
      margin-bottom: 2rem;
    }

    .social-btn {
      flex: 1;
      padding: 12px;
      border: 2px solid #e0e0e0;
      background: white;
      border-radius: 8px;
      cursor: pointer;
      font-weight: 500;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      transition: all 0.3s ease;
    }

    .social-btn:hover {
      border-color: #ccc;
      transform: translateY(-1px);
    }

    .social-btn.google {
      color: #db4437;
    }

    .social-btn.microsoft {
      color: #0078d4;
    }

    /* Form Footer */
    .form-footer {
      text-align: center;
      font-size: 0.9rem;
      color: #666;
    }

    .register-link {
      color: #2d5a2d;
      font-weight: 500;
      text-decoration: none;
      transition: color 0.3s ease;
    }

    .register-link:hover {
      color: #1f3f1f;
      text-decoration: underline;
    }

    /* Auth Footer */
    .auth-footer {
      background: #f8f9fa;
      border-top: 1px solid #e0e0e0;
      padding: 1.5rem 0;
      margin-top: auto;
    }

    .footer-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 1rem;
    }

    .footer-links {
      display: flex;
      gap: 2rem;
    }

    .footer-links a {
      color: #666;
      text-decoration: none;
      font-size: 0.9rem;
      transition: color 0.3s ease;
    }

    .footer-links a:hover {
      color: #2d5a2d;
    }

    .footer-copyright p {
      margin: 0;
      color: #999;
      font-size: 0.9rem;
    }

    /* Responsive */
    @media (max-width: 968px) {
      .login-content {
        grid-template-columns: 1fr;
        max-width: 500px;
      }

      .login-brand {
        padding: 2rem;
        text-align: center;
      }

      .brand-title {
        font-size: 2rem;
      }

      .brand-features {
        flex-direction: row;
        justify-content: center;
        flex-wrap: wrap;
      }
    }

    @media (max-width: 768px) {
      .login-container {
        padding: 1rem;
      }

      .login-form-container {
        padding: 2rem 1.5rem;
      }

      .social-login {
        flex-direction: column;
      }

      .footer-content {
        flex-direction: column;
        text-align: center;
      }

      .footer-links {
        flex-wrap: wrap;
        justify-content: center;
      }
    }
  `]
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  showPassword = false;
  isLoading = false;
  loginError = '';

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
  }

  ngOnInit() {
    // Animation d'entrée
    this.animateFormEntry();
  }

  animateFormEntry() {
    const formWrapper = document.querySelector('.form-wrapper');
    if (formWrapper) {
      (formWrapper as HTMLElement).style.transform = 'translateY(30px)';
      (formWrapper as HTMLElement).style.opacity = '0';
      
      setTimeout(() => {
        (formWrapper as HTMLElement).style.transition = 'all 0.6s ease';
        (formWrapper as HTMLElement).style.transform = 'translateY(0)';
        (formWrapper as HTMLElement).style.opacity = '1';
      }, 100);
    }
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.loginForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.loginError = '';

      // Simulation d'appel API
      setTimeout(() => {
        const { email, password } = this.loginForm.value;
        
        // Simulation de validation simple
        if (email === 'admin@fondation.ma' && password === 'admin123') {
          console.log('Connexion réussie!');
          // Redirection vers dashboard
          // this.router.navigate(['/user/dashboard']);
        } else {
          this.loginError = 'Email ou mot de passe incorrect. Veuillez réessayer.';
        }
        
        this.isLoading = false;
      }, 2000);
    } else {
      // Marquer tous les champs comme touched pour afficher les erreurs
      Object.keys(this.loginForm.controls).forEach(key => {
        this.loginForm.get(key)?.markAsTouched();
      });
    }
  }

  onForgotPassword() {
    console.log('Redirection vers récupération mot de passe');
    // Navigation vers page de récupération
  }

  loginWithGoogle() {
    console.log('Connexion avec Google');
    // Implémentation OAuth Google
  }

  loginWithMicrosoft() {
    console.log('Connexion avec Microsoft');
    // Implémentation OAuth Microsoft
  }
}