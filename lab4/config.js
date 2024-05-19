const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const RADIUS = 20;
const MARGIN = 250;
const VARIANT = 3120;

const k1 = (n = VARIANT) => {
    const variant = Array.from(String(n), Number);
    const k = 1 - variant[2] * 0.02 - variant[3] * 0.005 - 0.25;
    return k;
}
  
const k2 = (n = VARIANT) => {
    const variant = Array.from(String(n), Number);
    const k = 1 - variant[2] * 0.01 - variant[3] * 0.01 - 0.3;
    return k;
}
  
const k3 = (n = VARIANT) => {
    const variant = Array.from(String(n), Number);
    const k = 1 - variant[2] * 0.005 - variant[3] * 0.005 - 0.27;
    return k;
}

export {ctx, RADIUS, MARGIN, VARIANT, k1, k2, k3};