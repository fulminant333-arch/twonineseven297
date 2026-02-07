export interface ServiceItem {
  id: string;
  title: string;
  price: string;
  description: string;
  iconName: 'scissors' | 'wand' | 'camera' | 'layers' | 'star';
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export enum AppView {
  HOME = 'HOME',
  MANUAL = 'MANUAL'
}