import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
export interface Prestation {
  id: number;
  nom: string;
  categorie: string;
  description: string;
  montantMax: string;
  duree: string;
  conditions: string;
  couleur: string;
  icone: string;
}

export interface Demande {
  id: number;
  prestationId: number;
  userId: number;
  statut: 'en_cours' | 'approuvee' | 'refusee';
  dateCreation: Date;
  dateMiseAJour: Date;
  montantDemande?: number;
  motif: string;
  documents: string[];
}

@Injectable({
  providedIn: 'root'
})
export class PrestationsService {
  private apiUrl = '/api/prestations';

  constructor(private http: HttpClient) {}

  getPrestations(): Observable<Prestation[]> {
    // Simulation des données
    const prestations: Prestation[] = [
      {
        id: 1,
        nom: 'Aide au logement',
        categorie: 'Logement',
        description: 'Aide financière pour l\'accès au logement et les charges locatives pour les jeunes fonctionnaires.',
        montantMax: '800€/mois',
        duree: '24 mois',
        conditions: 'Âge < 30 ans',
        couleur: 'bg-blue-100',
        icone: 'fas fa-home text-blue-600'
      },
      {
        id: 2,
        nom: 'Bourse de formation',
        categorie: 'Formation',
        description: 'Financement des formations professionnelles et certifications pour développer vos compétences.',
        montantMax: '3 000€',
        duree: '12 mois',
        conditions: 'Ancienneté > 2 ans',
        couleur: 'bg-green-100',
        icone: 'fas fa-graduation-cap text-green-600'
      }
      // ... autres prestations
    ];

    return of(prestations);
  }

  getPrestation(id: number): Observable<Prestation | undefined> {
    return this.getPrestations().pipe(
      map(prestations => prestations.find(p => p.id === id))
    );
  }

  creerDemande(demande: Partial<Demande>): Observable<Demande> {
    const nouvelleDemande: Demande = {
      id: Date.now(),
      prestationId: demande.prestationId!,
      userId: demande.userId!,
      statut: 'en_cours',
      dateCreation: new Date(),
      dateMiseAJour: new Date(),
      montantDemande: demande.montantDemande,
      motif: demande.motif || '',
      documents: demande.documents || []
    };

    return of(nouvelleDemande);
  }

  getDemandesUtilisateur(userId: number): Observable<Demande[]> {
    // Simulation des demandes de l'utilisateur
    const demandes: Demande[] = [
      {
        id: 1,
        prestationId: 1,
        userId: userId,
        statut: 'en_cours',
        dateCreation: new Date('2024-12-10'),
        dateMiseAJour: new Date('2024-12-15'),
        montantDemande: 600,
        motif: 'Recherche de logement à Paris',
        documents: ['justificatif_revenus.pdf']
      }
    ];

    return of(demandes);
  }
}

