
import { CharacterClass, Profession } from './types';

export const CLASSES: CharacterClass[] = [
  'Guerrero', 'Paladín', 'Cazador', 'Pícaro', 
  'Sacerdote', 'Chamán', 'Mago', 'Brujo', 'Druida'
];

export const CLASS_ICONS: Record<CharacterClass, string> = {
  'Guerrero': 'https://wow.zamimg.com/images/wow/icons/large/classicon_warrior.jpg',
  'Paladín': 'https://wow.zamimg.com/images/wow/icons/large/classicon_paladin.jpg',
  'Cazador': 'https://wow.zamimg.com/images/wow/icons/large/classicon_hunter.jpg',
  'Pícaro': 'https://wow.zamimg.com/images/wow/icons/large/classicon_rogue.jpg',
  'Sacerdote': 'https://wow.zamimg.com/images/wow/icons/large/classicon_priest.jpg',
  'Chamán': 'https://wow.zamimg.com/images/wow/icons/large/classicon_shaman.jpg',
  'Mago': 'https://wow.zamimg.com/images/wow/icons/large/classicon_mage.jpg',
  'Brujo': 'https://wow.zamimg.com/images/wow/icons/large/classicon_warlock.jpg',
  'Druida': 'https://wow.zamimg.com/images/wow/icons/large/classicon_druid.jpg'
};

export const CLASS_COLORS: Record<CharacterClass, string> = {
  'Guerrero': 'text-[#C79C6E]',
  'Paladín': 'text-[#F58CBA]',
  'Cazador': 'text-[#ABD473]',
  'Pícaro': 'text-[#FFF569]',
  'Sacerdote': 'text-[#FFFFFF]',
  'Chamán': 'text-[#0070DE]',
  'Mago': 'text-[#69CCF0]',
  'Brujo': 'text-[#9482C9]',
  'Druida': 'text-[#FF7D0A]'
};

export const PROFESSIONS: Profession[] = [
  'Alquimia', 'Herrería', 'Encantamiento', 'Ingeniería', 
  'Peletería', 'Sastrería', 'Joyería', 'Herboristería', 
  'Minería', 'Desuello'
];

export const PROFESSION_ICONS: Record<Profession, string> = {
    'Alquimia': 'https://wow.zamimg.com/images/wow/icons/large/trade_alchemy.jpg',
    'Herrería': 'https://wow.zamimg.com/images/wow/icons/large/trade_blacksmithing.jpg',
    'Encantamiento': 'https://wow.zamimg.com/images/wow/icons/large/trade_engraving.jpg',
    'Ingeniería': 'https://wow.zamimg.com/images/wow/icons/large/trade_engineering.jpg',
    'Peletería': 'https://wow.zamimg.com/images/wow/icons/large/trade_leatherworking.jpg',
    'Sastrería': 'https://wow.zamimg.com/images/wow/icons/large/trade_tailoring.jpg',
    'Joyería': 'https://wow.zamimg.com/images/wow/icons/large/inv_misc_gem_01.jpg',
    'Herboristería': 'https://wow.zamimg.com/images/wow/icons/large/spell_nature_naturetouchgrow.jpg',
    'Minería': 'https://wow.zamimg.com/images/wow/icons/large/trade_mining.jpg',
    'Desuello': 'https://wow.zamimg.com/images/wow/icons/large/inv_misc_pelt_wolf_01.jpg'
};

export const HORDE_RED = '#991b1b';
export const HORDE_DARK = '#450a0a';
