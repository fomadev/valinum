import { describe, it, expect } from 'vitest';
import { validateDRC } from '../src/drc';

describe('ValiNum - Validation RDC', () => {
  
  it('doit détecter Vodacom (81, 82, 83)', () => {
    const res = validateDRC('+243824708027');
    expect(res.operator).toBe('Vodacom');
    expect(res.isValid).toBe(true);
  });

  it('doit détecter Orange (80, 84, 85, 89)', () => {
    const res = validateDRC('243890000000');
    expect(res.operator).toBe('Orange');
    expect(res.isValid).toBe(true);
  });

  it('doit être invalide si le numéro est trop court (Temps Réel)', () => {
    const res = validateDRC('81');
    expect(res.operator).toBe('Vodacom');
    expect(res.isValid).toBe(false);
    expect(res.error).toContain('incomplet');
  });

  it('doit rejeter un opérateur inconnu', () => {
    const res = validateDRC('243510000000');
    expect(res.operator).toBe(null);
    expect(res.isValid).toBe(false);
    expect(res.error).toBe('Opérateur inconnu en RDC');
  });

  it('doit nettoyer le "0" initial si présent', () => {
    const res = validateDRC('0814708027');
    expect(res.operator).toBe('Vodacom');
    expect(res.isValid).toBe(true);
    expect(res.formatted).toBe('+243814708027');
  });

  it('doit rejeter un numéro trop long', () => {
    const res = validateDRC('8147080279999');
    expect(res.isValid).toBe(false);
    expect(res.error).toBe('Numéro trop long');
  });

});