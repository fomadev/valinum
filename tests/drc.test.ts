import { describe, it, expect } from 'vitest';
import { validateDRC } from '../src/drc';

describe('ValiNum - v1.0.4 Metadata & Prefix 86', () => {
  
  it('doit valider le nouveau prefixe 86 de Vodacom', () => {
    const res = validateDRC('+243860000000');
    expect(res.isValid).toBe(true);
    expect(res.operator).toBe('Vodacom');
    expect(res.region).toBe('National / Extension');
    expect(res.lineType).toBe('Mobile');
  });

  it('doit extraire les métadonnées de région et de ligne fixe pour Orange 80', () => {
    const res = validateDRC('080123456');
    expect(res.isValid).toBe(true);
    expect(res.operator).toBe('Orange');
    expect(res.lineType).toBe('Fixe');
    expect(res.region).toBe('National');
  });

  it('doit extraire la région historique Grand Katanga pour Airtel 98', () => {
    const res = validateDRC('+243980000000');
    expect(res.isValid).toBe(true);
    expect(res.operator).toBe('Airtel');
    expect(res.region).toBe('Grand Katanga / Sud');
    expect(res.lineType).toBe('Mobile');
  });
});