export function toast(message: string) {
  // minimal fallback toast while debugging
  console.log("TOAST:", message);
}

export function useToast() {
  return { toast };
}