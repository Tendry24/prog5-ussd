import { Menu } from '../interfaces/MenuOptions';

export const MVOLA_MENU: Menu = {
  title: 'Services MVOLA',
  options: [
    { id: '1', label: 'Acheter Credit ou offre Yas' },
    { id: '2', label: 'Transferer argent' },
    { id: '3', label: 'Mvola Credit ou Epargne' },
    { id: '4', label: 'Retrait d\'argent' },
    { id: '5', label: 'Paiement factures' },
    { id: '*', label: 'Page precedente' },
    { id: '**', label: 'Menu principal' },
    { id: '0', label: 'Quitter' }
  ]
};

export const MAIN_MENU: Menu = {
  title: 'Services YAS & MOI',
  options: [
    { id: '1', label: 'MVOLA' },
    { id: '2', label: 'Rappelle moi' },
    { id: '3', label: 'SOS credit' },
    { id: '4', label: 'Services Yas' },
    { id: '5', label: 'Promotion' },
    { id: '0', label: 'Page suivante' }
  ]
};

export const CREDIT_OPTIONS_MENU: Menu = {
  title: 'ACHETER CREDIT OU OFFRE YAS',
  options: [
    { id: '1', label: 'Credit pour mon numero' },
    { id: '2', label: 'Credit pour autre numero' },
    { id: '3', label: 'Offre pour autre numero' },
    { id: '4', label: 'Offre pour mon numero' },
    { id: '*', label: 'Page precedente' },
    { id: '**', label: 'Menu principal' },
    { id: '0', label: 'Quitter' }
  ]
};

export const RECHARGE_OPTIONS_MENU: Menu = {
  title: 'OPTIONS DE RECHARGE',
  options: [
    { id: '1', label: 'Recharger directement' },
    { id: '2', label: 'Code recharge' },
    { id: '*', label: 'Page precedente' },
    { id: '**', label: 'Menu principal' },
    { id: '0', label: 'Quitter' }
  ]
}; 