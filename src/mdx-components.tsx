import { useMDXComponents as getThemeComponents } from "nextra-theme-docs";
import type { MDXComponents } from "mdx/types.js";

const themeComponents = getThemeComponents();

// Merge components
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...themeComponents,
    ...components,
  };
}
