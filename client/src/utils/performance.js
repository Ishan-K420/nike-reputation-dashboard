import { useState, memo } from 'react';

// Memoized components to prevent unnecessary re-renders
export const MemoizedProductCard = memo(function ProductCard(props) {
  // Component will only re-render if props change
  return props.children;
}, (prevProps, nextProps) => {
  // Custom comparison - only re-render if score or name changes
  return prevProps.product.Score === nextProps.product.Score &&
         prevProps.product.Name === nextProps.product.Name;
});

export const MemoizedComponent = memo(function Component({ children }) {
  return children;
});

// Debounce function for search/filter
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttle function for scroll events
export function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Virtual scrolling helper
export function useVirtualScroll(items, containerHeight, itemHeight) {
  const [scrollTop, setScrollTop] = useState(0);
  
  const startIndex = Math.floor(scrollTop / itemHeight);
  const endIndex = Math.min(
    startIndex + Math.ceil(containerHeight / itemHeight) + 1,
    items.length
  );
  
  const visibleItems = items.slice(startIndex, endIndex);
  const offsetY = startIndex * itemHeight;
  
  return { visibleItems, offsetY, setScrollTop };
}
