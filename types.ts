
export type CharacterClass = 
  | 'Guerrero' | 'Paladín' | 'Cazador' | 'Pícaro' 
  | 'Sacerdote' | 'Chamán' | 'Mago' | 'Brujo' | 'Druida';

export type Profession = 
  | 'Alquimia' | 'Herrería' | 'Encantamiento' | 'Ingeniería' 
  | 'Peletería' | 'Sastrería' | 'Joyería' | 'Herboristería' 
  | 'Minería' | 'Desuello';

export interface Character {
  id: string;
  name: string;
  class: CharacterClass;
  level: number;
  professions: Profession[];
}

export interface DKPRecord {
  characterName: string;
  dkp: number;
}

export interface DKPTable {
  id: string;
  name: string;
  date: string;
  records: DKPRecord[];
}

export interface GuildEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  description: string;
  type: 'Raid' | 'PVP' | 'Reunión' | 'Otro';
}

export interface DiscordUser {
  id: string;
  username: string;
  status: 'online' | 'idle' | 'dnd' | 'offline';
  avatar: string;
  activity?: string;
}

export interface ForumPost {
  id: string;
  authorName: string;
  authorAvatar: string;
  content: string;
  date: string;
}

export interface ForumThread {
  id: string;
  categoryId: string;
  title: string;
  authorName: string;
  date: string;
  posts: ForumPost[];
}

export interface ForumCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
}
