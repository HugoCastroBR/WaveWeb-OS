export const uuid = (length: number) => {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let result = '';
  const lettersLength = letters.length;

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * lettersLength);
    result += letters.charAt(randomIndex);
  }

  return result;
};

export const getExtension = (filename: string) => {
  const parts = filename.split('.');
  return parts[parts.length - 1];
}

export const verifyIfIsFile = (filename: string) => {
  const parts = filename.split('.');
  return parts.length > 1;
}


export const removeExtension = (filename: string) => {
  const parts = filename.split('.');
  parts.pop();
  return parts.join('.');
}

interface Element {
  x: number;
  y: number;
  width: number;
  height: number;
}

export function areOverlapping(element1: Element, element2: Element): boolean {
  const left1 = element1.x;
  const right1 = element1.x + element1.width;
  const top1 = element1.y;
  const bottom1 = element1.y + element1.height;

  const left2 = element2.x;
  const right2 = element2.x + element2.width;
  const top2 = element2.y;
  const bottom2 = element2.y + element2.height;

  return (
    left1 < right2 &&
    right1 > left2 &&
    top1 < bottom2 &&
    bottom1 > top2
  );
}
