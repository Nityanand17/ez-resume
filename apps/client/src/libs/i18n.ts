/**
 * Simple replacement for the Lingui t function.
 * After removing the translation feature, this function simply returns the string as-is.
 */
export const t = (str: any, ...values: any[]): string => {
  // Handle template literal
  if (typeof str === 'string') return str;
  
  // Handle template literal with values (e.g. t`Page ${pageNumber}`)
  if (Array.isArray(str) && values && values.length > 0) {
    return String.raw({ raw: str }, ...values);
  }
  
  // Handle object literal format (e.g. t({ message: "Text", context: "Context" }))
  if (str && typeof str === 'object' && 'message' in str) {
    return str.message;
  }
  
  // Default case - just return the first element if it's an array
  if (Array.isArray(str)) return str[0];
  
  // Fallback
  return String(str);
};

/**
 * Simple replacement for the Lingui Trans component.
 * After removing the translation feature, this function simply returns the content as-is.
 */
export const Trans = ({ children }: { children: React.ReactNode }): React.ReactNode => {
  return children;
};

/**
 * Simple replacement for the Lingui plural function.
 */
export const plural = (count: number, options: Record<string, string>): string => {
  const key = count === 1 ? 'one' : 'other';
  return options[key] || '';
};

/**
 * Simple replacement for the Lingui msg function.
 */
export const msg = (str: string | TemplateStringsArray): string => {
  if (typeof str === 'string') return str;
  return str[0];
};

/**
 * Mock for the Lingui i18n object
 */
export const i18n = {
  _: (str: any): string => {
    if (typeof str === 'function') {
      return str();
    }
    return String(str);
  },
  locale: 'en-US'
}; 