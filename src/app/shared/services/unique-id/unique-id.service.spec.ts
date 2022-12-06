import { TestBed } from '@angular/core/testing';

import { UniqueServiceId } from './unique-id.service';

describe(UniqueServiceId.name, () => {
  let service: UniqueServiceId;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UniqueServiceId); //Injeta a nossa classe de serviço no testBed
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it(`${UniqueServiceId.prototype.generateUniqueIdWithPrefix.name} should generate id when called with prefix`, () => {
    const id = service.generateUniqueIdWithPrefix('app');

    expect(id.startsWith('app-')).toBeTruthy();
  });

  it(`${UniqueServiceId.prototype.generateUniqueIdWithPrefix.name} should not generate duplicate IDs when called multiple times`, () => {
    // const firstId = service.generateUniqueIdWithPrefix('app');
    // const secondId = service.generateUniqueIdWithPrefix('app');
    // expect(firstId).not.toBe(secondId);

    const ids = new Set();
    for (let i = 0; i < 50; i++) {
      ids.add(service.generateUniqueIdWithPrefix('app'));
    }
    expect(ids.size).toBe(50);
  });

  it(`${UniqueServiceId.prototype.getNumberOfGeneratedIds.name} should return the number os generatedIds when called`, () => {
    service.generateUniqueIdWithPrefix('app');
    service.generateUniqueIdWithPrefix('app');

    expect(service.getNumberOfGeneratedIds()).toBe(2);
  });

  it(`${UniqueServiceId.prototype.generateUniqueIdWithPrefix.name} should throw when called with empty prefix`, () => {
    const emptyValues = [null, undefined, '', '0', '1'];
    emptyValues.forEach((element) => {
      expect(() => service.generateUniqueIdWithPrefix(element))
        .withContext(`Empty value: ${element}`)
        .toThrow();
    });

    // expect(() => service.generateUniqueIdWithPrefix(null)).toThrow();
    // expect(() => service.generateUniqueIdWithPrefix(undefined)).toThrow();
    // expect(() => service.generateUniqueIdWithPrefix('')).toThrow();
  });
});
