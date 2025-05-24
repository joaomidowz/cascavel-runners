export interface UserProfile {
  id: number;
  nome: string;
  email: string;
  biografia: string;
  fotoPerfilUrl?: string;
  cidade: string;
  estado: string;
  pais: string;
  dataRegistro: string;
  nivelPermissao: number;
}
