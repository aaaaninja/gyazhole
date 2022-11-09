export function uploadToGyazo() {
  return false;
};

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest;
  it('add', () => {
    expect(0).toBe(0);
    expect(1).toBe(1);
    expect(2 + 2 + 2).toBe(6);
  });
}
