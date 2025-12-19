import React from 'react';

export type Theme = 'light' | 'dark';

export interface NavLink {
  label: string;
  path: string;
}

export interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
}