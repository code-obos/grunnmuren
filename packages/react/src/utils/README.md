# Horizontal Scroll Utilities

A balanced approach with two simple utilities: `useHorizontalScroll` for scroll state detection and `ScrollButton` for the common visual patterns.

## Hook: useHorizontalScroll

A lightweight hook that tracks scroll capabilities without imposing any UI decisions.

**What it provides:**
- `scrollContainerRef` - Ref to attach to your scrollable element
- `canScrollLeft` - Boolean indicating if there's content to scroll left
- `canScrollRight` - Boolean indicating if there's content to scroll right  
- `hasScrollingOccurred` - Boolean for managing animations (prevents animation on mount)

## Component: ScrollButton

A simple scroll button component that captures the common visual patterns without over-engineering.

**What it handles:**
- Chevron icons (left/right)
- Standard gradient backgrounds
- Show/hide animations
- Consistent hover states

**Props:**
- `direction` - 'left' | 'right'
- `onClick` - Click handler function
- `isVisible` - Whether button should be visible
- `hasScrollingOccurred` - For animation timing
- `className` - Custom positioning and sizing
- `iconClassName` - Custom icon styling

## Usage Examples

### Basic Implementation
```tsx
import { useHorizontalScroll, ScrollButton } from '@obosbbl/grunnmuren-react';

function MyScrollableComponent() {
  const {
    scrollContainerRef,
    canScrollLeft,
    canScrollRight,
    hasScrollingOccurred,
  } = useHorizontalScroll();

  const handleScroll = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (!container) return;
    
    const scrollAmount = container.clientWidth * 0.8;
    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <div className="relative">
      <ScrollButton
        direction="left"
        onClick={() => handleScroll('left')}
        isVisible={canScrollLeft}
        hasScrollingOccurred={hasScrollingOccurred}
        className="absolute left-0 top-1/2 -translate-y-1/2 h-10 w-10"
        iconClassName="h-5 w-5"
      />
      
      <div
        ref={scrollContainerRef}
        className="overflow-x-auto scrollbar-hidden"
      >
        {/* Your content */}
      </div>
      
      <ScrollButton
        direction="right"
        onClick={() => handleScroll('right')}
        isVisible={canScrollRight}
        hasScrollingOccurred={hasScrollingOccurred}
        className="absolute right-0 top-1/2 -translate-y-1/2 h-10 w-10"
        iconClassName="h-5 w-5"
      />
    </div>
  );
}
```

### Table-style Positioning
```tsx
<ScrollButton
  direction="left"
  onClick={() => handleScroll('left')}
  isVisible={canScrollLeft}
  hasScrollingOccurred={hasScrollingOccurred}
  className="-translate-y-1/2 -left-3 absolute top-5 z-10 h-11 w-11"
  iconClassName="h-5 w-5"
/>
```

### Tab-style Positioning
```tsx
<ScrollButton
  direction="left"
  onClick={onPrev}
  isVisible={canScrollLeft}
  hasScrollingOccurred={hasScrollingOccurred}
  className="-left-3 absolute bottom-0.25 size-11"
  iconClassName="mt-0.25 h-6 w-full text-black"
/>
```
