import { describe, expect, it } from 'vitest';

import { Product } from '../../src/product/entities/Product.js';
import { ProductId } from '../../src/product/value-objects/ProductId.js';

describe('Product', () => {
  it('creates a product', () => {
    const product = new Product(new ProductId('PROD-1001'), {
      code: 'CHK-001',
      name: 'Everyday Chequing',
      category: 'DEPOSIT',
      status: 'DESIGNED'
    });

    expect(product.getId().toString()).toBe('PROD-1001');
    expect(product.getCode()).toBe('CHK-001');
    expect(product.getName()).toBe('Everyday Chequing');
    expect(product.getCategory()).toBe('DEPOSIT');
    expect(product.getStatus()).toBe('DESIGNED');
  });

  it('approves a product', () => {
    const product = new Product(new ProductId('PROD-1002'), {
      code: 'SAV-001',
      name: 'Premium Savings',
      category: 'DEPOSIT',
      status: 'DESIGNED'
    });

    product.approve();

    expect(product.getStatus()).toBe('APPROVED');
  });

  it('makes a product available', () => {
    const product = new Product(new ProductId('PROD-1003'), {
      code: 'LOC-001',
      name: 'Line of Credit',
      category: 'LINE_OF_CREDIT',
      status: 'APPROVED'
    });

    product.makeAvailable();

    expect(product.getStatus()).toBe('AVAILABLE');
  });

  it('suspends a product', () => {
    const product = new Product(new ProductId('PROD-1004'), {
      code: 'CC-001',
      name: 'Credit Card',
      category: 'CREDIT_CARD',
      status: 'AVAILABLE'
    });

    product.suspend();

    expect(product.getStatus()).toBe('SUSPENDED');
  });

  it('retires a product', () => {
    const product = new Product(new ProductId('PROD-1005'), {
      code: 'LOAN-001',
      name: 'Personal Loan',
      category: 'LOAN',
      status: 'AVAILABLE'
    });

    product.retire();

    expect(product.getStatus()).toBe('RETIRED');
  });

  it('renames a product', () => {
    const product = new Product(new ProductId('PROD-1006'), {
      code: 'MTG-001',
      name: 'Mortgage',
      category: 'MORTGAGE',
      status: 'AVAILABLE'
    });

    product.rename('Fixed Rate Mortgage');

    expect(product.getName()).toBe('Fixed Rate Mortgage');
  });
});