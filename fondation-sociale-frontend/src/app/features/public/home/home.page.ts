import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <!-- Header Navigation -->
    <nav class="main-nav">
      <div class="nav-container">
        <div class="nav-brand">
          <img src="/assets/logo-fondation.png" alt="Fondation Sociale" class="logo">
          <span class="brand-text">Fondation Sociale</span>
        </div>
        <div class="nav-menu">
          <a href="#" class="nav-link">Accueil</a>
          <a href="#" class="nav-link">À propos</a>
          <a href="#" class="nav-link">Missions</a>
          <a href="#" class="nav-link">Médias</a>
          <a href="#" class="nav-link">Services</a>
          <a href="#" class="nav-link">Contact</a>
        </div>
        <div class="nav-actions">
          <button class="btn-login" routerLink="/auth/login">Connexion</button>
        </div>
      </div>
    </nav>

    <!-- Hero Slider Section -->
    <section class="hero-slider">
      <div class="slider-container">
        <div class="slide active" [style.background-image]="'url(' + currentSlide.image + ')'">
          <div class="slide-overlay"></div>
          <div class="slide-content">
            <div class="slide-text">
              <h1 class="slide-title">{{ currentSlide.title }}</h1>
              <h2 class="slide-subtitle">{{ currentSlide.subtitle }}</h2>
              <p class="slide-description">{{ currentSlide.description }}</p>
              <button class="btn-primary" (click)="onSlideAction()">{{ currentSlide.btnText }}</button>
            </div>
          </div>
        </div>
        
        <!-- Slider Controls -->
        <div class="slider-controls">
          <button class="control-btn prev" (click)="previousSlide()">‹</button>
          <button class="control-btn next" (click)="nextSlide()">›</button>
        </div>
        
        <!-- Slider Indicators -->
        <div class="slider-indicators">
          <span 
            *ngFor="let slide of slides; let i = index" 
            class="indicator" 
            [class.active]="i === currentSlideIndex"
            (click)="goToSlide(i)">
          </span>
        </div>
      </div>
    </section>

    <!-- Statistics Section -->
    <section class="stats-section">
      <div class="container">
        <h2 class="section-title">Les objectifs de l'Accompagnement Social en chiffres</h2>
        <div class="stats-grid">
          <div class="stat-item" *ngFor="let stat of mainStats">
            <div class="stat-icon">
              <i [class]="stat.icon"></i>
            </div>
            <div class="stat-number">{{ stat.number }}</div>
            <div class="stat-label">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Zoom Section -->
    <section class="zoom-section">
      <div class="container">
        <div class="zoom-content">
          <div class="zoom-text">
            <h2>Zoom sur notre Mission Sociale</h2>
            <p>
              La Fondation Sociale du Ministère de l'Investissement offre un accompagnement 
              transparent et accessible à tous les citoyens. Elle fixe les objectifs fondamentaux 
              d'inclusion sociale, instaure les différents dispositifs de soutien aux familles 
              en difficulté, et définit les principes de gouvernance pour faciliter l'accès 
              aux services sociaux.
            </p>
            <button class="btn-secondary">En savoir plus</button>
          </div>
          <div class="zoom-image">
            <img src="/assets/mission-sociale.jpg" alt="Mission Sociale" />
          </div>
        </div>
      </div>
    </section>

    <!-- Bilan Section -->
    <section class="bilan-section">
      <div class="container">
        <div class="bilan-header">
          <h2>Bilan des Actions Sociales depuis le lancement (Janvier 2023)</h2>
        </div>
        <div class="bilan-stats">
          <div class="bilan-item" *ngFor="let item of bilanStats">
            <div class="bilan-icon">
              <i [class]="item.icon"></i>
            </div>
            <div class="bilan-number">{{ item.number }}</div>
            <div class="bilan-label">{{ item.label }}</div>
          </div>
        </div>
        <button class="btn-primary">En savoir plus</button>
      </div>
    </section>

    <!-- News Carousel -->
    <section class="news-carousel">
      <div class="container">
        <div class="carousel-header">
          <h2>Nos dernières actions</h2>
        </div>
        <div class="carousel-container">
          <div class="news-grid">
            <div class="news-card" *ngFor="let news of recentNews">
              <div class="news-image">
                <img [src]="news.image" [alt]="news.title" />
                <div class="news-date">{{ news.date }}</div>
              </div>
              <div class="news-content">
                <h3 class="news-title">{{ news.title }}</h3>
                <p class="news-excerpt">{{ news.excerpt }}</p>
                <button class="btn-link">En savoir plus</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Missions Section -->
    <section class="missions-section">
      <div class="container">
        <h2 class="section-title">En savoir plus sur nos missions</h2>
        <div class="missions-grid">
          <div class="mission-card" *ngFor="let mission of missions">
            <div class="mission-icon">
              <i [class]="mission.icon"></i>
            </div>
            <h3 class="mission-title">{{ mission.title }}</h3>
            <p class="mission-desc">{{ mission.description }}</p>
            <button class="btn-link">En savoir plus</button>
          </div>
        </div>
      </div>
    </section>

    <!-- Recent Activities -->
    <section class="activities-section">
      <div class="container">
        <h2 class="section-title">Nos dernières actualités</h2>
        <div class="activities-grid">
          <div class="activity-card" *ngFor="let activity of activities">
            <div class="activity-image">
              <img [src]="activity.image" [alt]="activity.title" />
            </div>
            <div class="activity-content">
              <div class="activity-meta">
                <span class="activity-type">{{ activity.type }}</span>
                <span class="activity-date">{{ activity.date }}</span>
              </div>
              <h3 class="activity-title">{{ activity.title }}</h3>
              <p class="activity-excerpt">{{ activity.excerpt }}</p>
              <button class="btn-link">En savoir plus</button>
            </div>
          </div>
        </div>
        <div class="activities-footer">
          <button class="btn-secondary">Voir plus</button>
        </div>
      </div>
    </section>

    <!-- Recruitment Section -->
    <section class="recruitment-section">
      <div class="container">
        <div class="recruitment-content">
          <div class="recruitment-text">
            <h2>Recrutement et Candidatures</h2>
            <p>
              Rejoignez la Fondation Sociale du Ministère de l'Investissement, 
              de la Convergence et de l'Évaluation des Politiques Publiques
            </p>
            <button class="btn-white">Nous rejoindre</button>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section class="contact-section">
      <div class="container">
        <div class="contact-content">
          <div class="contact-text">
            <h2>Vous avez une question ?</h2>
            <p>Pour toutes vos questions, consultez notre FAQ ou contactez-nous via le formulaire</p>
          </div>
          <div class="contact-actions">
            <button class="btn-outline">Consulter la FAQ</button>
            <button class="btn-primary">Nous contacter</button>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="main-footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-brand">
            <img src="/assets/logo-fondation.png" alt="Fondation Sociale" class="footer-logo">
            <p>© 2024 Tous les droits sont réservés - Fondation Sociale</p>
          </div>
          <div class="footer-links">
            <div class="footer-section">
              <h4>Liens utiles</h4>
              <ul>
                <li><a href="#">Mentions légales</a></li>
                <li><a href="#">Plan du site</a></li>
                <li><a href="#">Accessibilité</a></li>
              </ul>
            </div>
            <div class="footer-section">
              <h4>Contact</h4>
              <ul>
                <li><a href="#">Formulaire de contact</a></li>
                <li><a href="#">Réclamations</a></li>
                <li><a href="#">FAQ</a></li>
              </ul>
            </div>
          </div>
          <div class="footer-social">
            <h4>Suivez nous</h4>
            <div class="social-links">
              <a href="#" class="social-link">📘</a>
              <a href="#" class="social-link">🐦</a>
              <a href="#" class="social-link">📷</a>
              <a href="#" class="social-link">💼</a>
            </div>
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
      line-height: 1.6;
      color: #333;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
    }

    /* Navigation */
    .main-nav {
      background: #fff;
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

    .nav-menu {
      display: flex;
      gap: 2rem;
    }

    .nav-link {
      text-decoration: none;
      color: #333;
      font-weight: 500;
      transition: color 0.3s ease;
    }

    .nav-link:hover {
      color: #2d5a2d;
    }

    .btn-login {
      background: #2d5a2d;
      color: white;
      padding: 8px 20px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 500;
      transition: background 0.3s ease;
    }

    .btn-login:hover {
      background: #1f3f1f;
    }

    /* Hero Slider */
    .hero-slider {
      position: relative;
      height: 500px;
      overflow: hidden;
    }

    .slider-container {
      position: relative;
      width: 100%;
      height: 100%;
    }

    .slide {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-size: cover;
      background-position: center;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .slide-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, rgba(45, 90, 45, 0.8), rgba(45, 90, 45, 0.6));
    }

    .slide-content {
      position: relative;
      z-index: 2;
      text-align: center;
      color: white;
      max-width: 800px;
      padding: 0 2rem;
    }

    .slide-title {
      font-size: 3rem;
      font-weight: 700;
      margin-bottom: 1rem;
      text-shadow: 0 2px 4px rgba(0,0,0,0.3);
    }

    .slide-subtitle {
      font-size: 1.5rem;
      font-weight: 400;
      margin-bottom: 1rem;
      opacity: 0.9;
    }

    .slide-description {
      font-size: 1.1rem;
      margin-bottom: 2rem;
      line-height: 1.6;
    }

    .slider-controls {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 100%;
      display: flex;
      justify-content: space-between;
      padding: 0 2rem;
      z-index: 3;
    }

    .control-btn {
      background: rgba(255,255,255,0.2);
      border: 2px solid rgba(255,255,255,0.3);
      color: white;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      cursor: pointer;
      font-size: 1.5rem;
      transition: all 0.3s ease;
    }

    .control-btn:hover {
      background: rgba(255,255,255,0.3);
      transform: scale(1.1);
    }

    .slider-indicators {
      position: absolute;
      bottom: 2rem;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      gap: 10px;
      z-index: 3;
    }

    .indicator {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: rgba(255,255,255,0.4);
      cursor: pointer;
      transition: background 0.3s ease;
    }

    .indicator.active {
      background: white;
    }

    /* Buttons */
    .btn-primary {
      background: #2d5a2d;
      color: white;
      padding: 12px 24px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 500;
      transition: all 0.3s ease;
    }

    .btn-primary:hover {
      background: #1f3f1f;
      transform: translateY(-2px);
    }

    .btn-secondary {
      background: transparent;
      color: #2d5a2d;
      padding: 12px 24px;
      border: 2px solid #2d5a2d;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 500;
      transition: all 0.3s ease;
    }

    .btn-secondary:hover {
      background: #2d5a2d;
      color: white;
    }

    .btn-white {
      background: white;
      color: #2d5a2d;
      padding: 12px 24px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 500;
      transition: all 0.3s ease;
    }

    .btn-outline {
      background: transparent;
      color: #333;
      padding: 12px 24px;
      border: 2px solid #ddd;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 500;
      transition: all 0.3s ease;
    }

    .btn-link {
      background: none;
      border: none;
      color: #2d5a2d;
      cursor: pointer;
      font-weight: 500;
      text-decoration: underline;
    }

    /* Statistics Section */
    .stats-section {
      padding: 4rem 0;
      background: #f8f9fa;
    }

    .section-title {
      text-align: center;
      font-size: 2rem;
      color: #333;
      margin-bottom: 3rem;
      font-weight: 600;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
    }

    .stat-item {
      text-align: center;
      background: white;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
      transition: transform 0.3s ease;
    }

    .stat-item:hover {
      transform: translateY(-5px);
    }

    .stat-icon {
      font-size: 3rem;
      color: #2d5a2d;
      margin-bottom: 1rem;
    }

    .stat-number {
      font-size: 3rem;
      font-weight: 700;
      color: #2d5a2d;
      margin-bottom: 0.5rem;
    }

    .stat-label {
      font-size: 1rem;
      color: #666;
      line-height: 1.4;
    }

    /* Zoom Section */
    .zoom-section {
      padding: 4rem 0;
      background: white;
    }

    .zoom-content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4rem;
      align-items: center;
    }

    .zoom-text h2 {
      font-size: 2rem;
      color: #333;
      margin-bottom: 1.5rem;
      font-weight: 600;
    }

    .zoom-text p {
      font-size: 1.1rem;
      line-height: 1.6;
      color: #666;
      margin-bottom: 2rem;
    }

    .zoom-image img {
      width: 100%;
      height: auto;
      border-radius: 8px;
    }

    /* Bilan Section */
    .bilan-section {
      padding: 4rem 0;
      background: #2d5a2d;
      color: white;
      text-align: center;
    }

    .bilan-header h2 {
      font-size: 2rem;
      margin-bottom: 3rem;
      font-weight: 600;
    }

    .bilan-stats {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 2rem;
      margin-bottom: 3rem;
    }

    .bilan-item {
      text-align: center;
    }

    .bilan-icon {
      font-size: 3rem;
      margin-bottom: 1rem;
      color: #90c695;
    }

    .bilan-number {
      font-size: 3rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
    }

    .bilan-label {
      font-size: 1rem;
      opacity: 0.9;
    }

    /* News & Activities */
    .news-carousel,
    .activities-section {
      padding: 4rem 0;
      background: #f8f9fa;
    }

    .carousel-header,
    .activities-section .section-title {
      text-align: center;
      margin-bottom: 3rem;
    }

    .news-grid,
    .activities-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
    }

    .news-card,
    .activity-card {
      background: white;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
      transition: transform 0.3s ease;
    }

    .news-card:hover,
    .activity-card:hover {
      transform: translateY(-5px);
    }

    .news-image,
    .activity-image {
      position: relative;
      height: 200px;
      overflow: hidden;
    }

    .news-image img,
    .activity-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .news-date {
      position: absolute;
      top: 1rem;
      right: 1rem;
      background: #2d5a2d;
      color: white;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      font-size: 0.9rem;
    }

    .news-content,
    .activity-content {
      padding: 1.5rem;
    }

    .news-title,
    .activity-title {
      font-size: 1.2rem;
      font-weight: 600;
      margin-bottom: 1rem;
      color: #333;
    }

    .news-excerpt,
    .activity-excerpt {
      color: #666;
      line-height: 1.5;
      margin-bottom: 1rem;
    }

    .activity-meta {
      display: flex;
      justify-content: space-between;
      margin-bottom: 1rem;
      font-size: 0.9rem;
    }

    .activity-type {
      background: #e8f5e8;
      color: #2d5a2d;
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
    }

    .activity-date {
      color: #666;
    }

    /* Missions Section */
    .missions-section {
      padding: 4rem 0;
      background: white;
    }

    .missions-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
    }

    .mission-card {
      text-align: center;
      padding: 2rem;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      transition: all 0.3s ease;
    }

    .mission-card:hover {
      border-color: #2d5a2d;
      transform: translateY(-5px);
    }

    .mission-icon {
      font-size: 3rem;
      color: #2d5a2d;
      margin-bottom: 1rem;
    }

    .mission-title {
      font-size: 1.3rem;
      font-weight: 600;
      margin-bottom: 1rem;
      color: #333;
    }

    .mission-desc {
      color: #666;
      line-height: 1.5;
      margin-bottom: 1.5rem;
    }

    /* Recruitment Section */
    .recruitment-section {
      padding: 4rem 0;
      background: linear-gradient(135deg, #2d5a2d, #3a6b3a);
      color: white;
      text-align: center;
    }

    .recruitment-content h2 {
      font-size: 2rem;
      margin-bottom: 1rem;
      font-weight: 600;
    }

    .recruitment-content p {
      font-size: 1.1rem;
      margin-bottom: 2rem;
      opacity: 0.9;
    }

    /* Contact Section */
    .contact-section {
      padding: 4rem 0;
      background: #f8f9fa;
    }

    .contact-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 2rem;
    }

    .contact-text h2 {
      font-size: 1.8rem;
      margin-bottom: 1rem;
      color: #333;
    }

    .contact-actions {
      display: flex;
      gap: 1rem;
    }

    /* Footer */
    .main-footer {
      background: #1a1a1a;
      color: white;
      padding: 3rem 0 1rem;
    }

    .footer-content {
      display: grid;
      grid-template-columns: 1fr 2fr 1fr;
      gap: 3rem;
    }

    .footer-logo {
      height: 40px;
      width: auto;
      margin-bottom: 1rem;
    }

    .footer-links {
      display: flex;
      gap: 3rem;
    }

    .footer-section h4 {
      margin-bottom: 1rem;
      color: #2d5a2d;
    }

    .footer-section ul {
      list-style: none;
    }

    .footer-section li {
      margin-bottom: 0.5rem;
    }

    .footer-section a {
      color: #ccc;
      text-decoration: none;
      transition: color 0.3s ease;
    }

    .footer-section a:hover {
      color: white;
    }

    .social-links {
      display: flex;
      gap: 1rem;
    }

    .social-link {
      display: inline-block;
      width: 40px;
      height: 40px;
      background: #333;
      text-align: center;
      line-height: 40px;
      border-radius: 50%;
      transition: background 0.3s ease;
    }

    .social-link:hover {
      background: #2d5a2d;
    }

    /* Responsive */
    @media (max-width: 768px) {
      .nav-menu {
        display: none;
      }

      .slide-title {
        font-size: 2rem;
      }

      .zoom-content {
        grid-template-columns: 1fr;
        text-align: center;
      }

      .contact-content {
        text-align: center;
      }

      .footer-content {
        grid-template-columns: 1fr;
        text-align: center;
      }

      .bilan-stats {
        grid-template-columns: repeat(2, 1fr);
      }
    }
  `]
})
export class HomePage implements OnInit {
  currentSlideIndex = 0;
  currentSlide: any;

  slides = [
    {
      image: '/assets/hero-social-1.jpg',
      title: 'Accompagnement Social',
      subtitle: 'خاص بمغاربة العالم',
      description: 'La Fondation Sociale accompagne les citoyens dans leurs démarches sociales et facilite leur accès aux services publics.',
      btnText: 'En savoir plus'
    },
    {
      image: '/assets/hero-social-2.jpg',
      title: 'Services Sociaux',
      subtitle: 'للمواطنين المغاربة',
      description: 'Des programmes sociaux innovants pour soutenir les familles et favoriser l\'inclusion sociale.',
      btnText: 'Découvrir'
    },
    {
      image: '/assets/hero-social-3.jpg',
      title: 'Innovation Sociale',
      subtitle: 'التطوير الاجتماعي',
      description: 'Développement de solutions sociales durables pour un Maroc solidaire et prospère.',
      btnText: 'Participer'
    }
  ];

  mainStats = [
    {
      icon: 'fas fa-users',
      number: '25K',
      label: 'Accompagner 25 000 familles à l\'horizon 2026'
    },
    {
      icon: 'fas fa-handshake',
      number: '100K',
      label: 'Créer 100 000 opportunités sociales entre 2023-2026'
    }
  ];

  bilanStats = [
    {
      icon: 'fas fa-calendar-check',
      number: '12',
      label: 'Programmes lancés'
    },
    {
      icon: 'fas fa-project-diagram',
      number: '450',
      label: 'Projets sociaux approuvés'
    },
    {
      icon: 'fas fa-coins',
      number: '180',
      label: 'Millions de dirhams d\'aide sociale'
    },
    {
      icon: 'fas fa-user-plus',
      number: '+ 25 000',
      label: 'Bénéficiaires accompagnés'
    }
  ];

  missions = [
    {
      icon: 'fas fa-heart',
      title: 'L\'Accompagnement Social',
      description: 'Soutien personnalisé aux familles en difficulté et accompagnement dans leurs démarches administratives.'
    },
    {
      icon: 'fas fa-graduation-cap',
      title: 'L\'Éducation et Formation',
      description: 'Programmes éducatifs et de formation professionnelle pour favoriser l\'insertion sociale.'
    },
    {
      icon: 'fas fa-chart-line',
      title: 'L\'Évaluation et Suivi',
      description: 'Évaluation de l\'impact des politiques sociales et suivi des bénéficiaires.'
    }
  ];

  recentNews = [
    {
      image: '/assets/news-1.jpg',
      title: 'Lancement du programme d\'aide aux familles vulnérables',
      excerpt: 'Un nouveau programme pour soutenir 5000 familles en situation de précarité.',
      date: '15 août 2025'
    },
    {
      image: '/assets/news-2.jpg',
      title: 'Formation professionnelle : 200 nouveaux bénéficiaires',
      excerpt: 'Extension du programme de formation aux métiers du digital.',
      date: '10 août 2025'
    },
    {
      image: '/assets/news-3.jpg',
      title: 'Partenariat avec les associations locales',
      excerpt: 'Signature de conventions avec 15 associations pour l\'accompagnement social.',
      date: '5 août 2025'
    }
  ];

  activities = [
    {
      image: '/assets/activity-1.jpg',
      type: 'Réunion',
      date: '4 août 2025',
      title: 'Lancement de la Semaine de l\'accompagnement social',
      excerpt: 'La Fondation Sociale organise une semaine dédiée à la sensibilisation aux services sociaux disponibles.'
    },
    {
      image: '/assets/activity-2.jpg',
      type: 'Visite',
      date: '25 juillet 2025',
      title: 'Visite du centre d\'accompagnement de Casablanca',
      excerpt: 'Inauguration du nouveau centre d\'accompagnement social dans la région de Casablanca.'
    },
    {
      image: '/assets/activity-3.jpg',
      type: 'Rencontre',
      date: '20 juillet 2025',
      title: 'Rencontre avec les partenaires sociaux',
      excerpt: 'Table ronde avec les acteurs du secteur social pour améliorer les services aux citoyens.'
    }
  ];

  ngOnInit() {
    this.currentSlide = this.slides[0];
    this.startSlideShow();
  }

  startSlideShow() {
    setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  nextSlide() {
    this.currentSlideIndex = (this.currentSlideIndex + 1) % this.slides.length;
    this.currentSlide = this.slides[this.currentSlideIndex];
  }

  previousSlide() {
    this.currentSlideIndex = this.currentSlideIndex === 0 ? this.slides.length - 1 : this.currentSlideIndex - 1;
    this.currentSlide = this.slides[this.currentSlideIndex];
  }

  goToSlide(index: number) {
    this.currentSlideIndex = index;
    this.currentSlide = this.slides[index];
  }

  onSlideAction() {
    console.log('Action du slide:', this.currentSlide.btnText);
  }
}