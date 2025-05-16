import { Menu } from '../interfaces/MenuOptions';
import { MvolaService } from '../services/MvolaService';

const mvolaService = new MvolaService();

export const MAIN_MENU: Menu = {
  title: 'Services YAS & MOI',
  options: [
    { id: '1', label: 'MVOLA', action: () => mvolaService.showMvolaMenu() },
    { id: '2', label: 'Rappelle moi' },
    { id: '3', label: 'SOS credit' },
    { id: '4', label: 'Services Yas' },
    { id: '5', label: 'Promotion' },
    { id: '0', label: 'Page suivante' }
  ]
};

export const MVOLA_MENU: Menu = {
  title: 'Services MVOLA',
  options: [
    { id: '1', label: 'Acheter Credit ou offre Yas' },
    { id: '2', label: 'Transferer argent' },
    { id: '3', label: 'Mvola Credit ou Epargne' },
    { id: '4', label: "Retrait d'argent" },
    { id: '5', label: 'Paiement factures' },
    { id: '*', label: 'Page precedente' },
    { id: '**', label: 'Menu principal' }
  ]
}; 