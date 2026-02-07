import React from 'react';
import { Scissors, Wand2, Camera, Layers, Star, Info, MessageCircle, X, Send, Menu, Settings, Bot } from 'lucide-react';

export const IconMap = {
  scissors: Scissors,
  wand: Wand2,
  camera: Camera,
  layers: Layers,
  star: Star,
  info: Info,
  chat: MessageCircle,
  close: X,
  send: Send,
  menu: Menu,
  settings: Settings,
  bot: Bot
};

export const ServiceIcon: React.FC<{ name: string; className?: string }> = ({ name, className }) => {
  const Icon = IconMap[name as keyof typeof IconMap] || Star;
  return <Icon className={className} />;
};