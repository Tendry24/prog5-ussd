export interface MvolaTransaction {
  destinataire: string;
  montant: number;
  raison: string;
  fraisRetrait: boolean;
  reference?: string;
} 