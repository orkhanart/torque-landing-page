I'll help you create a methodical plan for this redesign. Let me first examine the current implementation to understand the architecture better.

[4 tools called]

Based on my examination of your codebase, here's a comprehensive plan for methodically implementing the redesign:

## **Phase 1: Design Tokens Setup (Foundation)**

### 1.1 **Colors**
- **Action**: Update CSS custom properties in `globals.css`
- **Process**:
  1. Extract exact color values from Figma (use Inspect panel)
  2. Convert to HSL format (Tailwind best practice for color manipulation)
  3. Map Figma colors to semantic tokens:
     - Primary (main brand color)
     - Accent/Secondary
     - Background colors (likely multiple shades)
     - Text colors (body, headings, muted)
     - Border colors
     - State colors (hover, focus, active)
  4. Update the `:root` section in `globals.css` lines 26-69
  5. Update `tailwind.config.ts` color extensions if needed (lines 12-60)

### 1.2 **Typography**
- **Action**: Update font imports and configuration
- **Process**:
  1. Identify new font family/families from Figma
  2. Add Google Fonts import in `globals.css` (line 4) or use local font files
  3. Update `tailwind.config.ts` fontFamily (lines 89-91)
  4. Define font size scale, line heights, and letter spacing if different
  5. Consider adding font weight utilities if using multiple weights

### 1.3 **Spacing & Layout**
- **Check Figma for**:
  - Section padding consistency
  - Container max-widths
  - Grid gaps
  - Component spacing scale

---

## **Phase 2: Component Audit & Categorization**

### 2.1 **Categorize Components by Change Type**

**No changes needed (likely):**
- Base UI primitives from shadcn (`accordion.tsx`, `button.tsx`, etc.)

**Minor style updates:**
- Components that just need color/spacing tweaks
- Likely: `CustomButton`, `ContactModal`, `ContactForm`

**Major redesign:**
- Components with structural changes
- Based on Figma: likely `hero`, `PlatformFeatures`, `AuditSection`

**New components:**
- Any new sections in the Figma

### 2.2 **Create Component Checklist**
Document which components to:
- Keep as-is
- Update styles only
- Restructure
- Create new

---

## **Phase 3: Implementation Strategy**

### 3.1 **Recommended Order**

**Step 1: Foundation (30 min - 1 hour)**
```
1. Update globals.css with new colors
2. Update tailwind.config.ts
3. Test color system on one component
4. Update typography
```

**Step 2: Core UI Components (1-2 hours)**
```
1. Update CustomButton variants if design changed
2. Update any modified shadcn components
3. Test in isolation
```

**Step 3: Layout Components (Sequential, top to bottom)**
```
1. Navbar (affects entire page, do first)
2. Hero section (most visible, high priority)
3. Feature sections (middle priority)
4. Footer (lower priority)
```

**Step 4: Specialty Components**
```
1. Modals (ContactModal)
2. Forms (ContactForm)
3. Any animations/transitions
```

### 3.2 **Best Practices for Each Component Update**

**Before editing:**
1. Read the component file completely
2. Note all color references (look for: `text-`, `bg-`, `border-`, hardcoded hex)
3. Note font references
4. Screenshot current state for comparison

**During editing:**
1. Update colors systematically:
   - Replace hex codes with Tailwind color tokens
   - Use semantic names (`text-primary` not `text-[#A1FFFF]`)
2. Update spacing to match Figma
3. Maintain responsive behavior (`sm:`, `md:`, `lg:` breakpoints)
4. Keep accessibility features (ARIA labels, focus states)

**After editing:**
1. Test all interactive states (hover, focus, active)
2. Test all breakpoints (mobile, tablet, desktop)
3. Check for any console errors

---

## **Phase 4: Quality Assurance Checklist**

### 4.1 **Visual QA**
- [ ] Colors match Figma exactly
- [ ] Fonts render correctly (family, size, weight)
- [ ] Spacing matches design system
- [ ] All breakpoints look good
- [ ] Dark mode works (if applicable)

### 4.2 **Functional QA**
- [ ] All buttons work
- [ ] Forms submit correctly
- [ ] Modals open/close
- [ ] Navigation works
- [ ] Animations perform smoothly
- [ ] No console errors

### 4.3 **Performance**
- [ ] No hydration errors
- [ ] Images optimized
- [ ] Fonts load efficiently (font-display strategy)
- [ ] No layout shift

---

## **Specific Recommendations for Your Codebase**

### **Key Files to Update in Order:**

1. **`src/app/globals.css`** - Color system & fonts (FIRST)
2. **`tailwind.config.ts`** - Extended theme (SECOND)
3. **`src/components/ui/customButton.tsx`** - Core button component
4. **`src/app/components/navbar.tsx`** - Header (affects all pages)
5. **`src/app/components/hero.tsx`** - Main hero section
6. **`src/app/components/PlatformFeatures.tsx`** - Features section
7. **`src/app/components/AuditSection.tsx`** - Audit section
8. **`src/app/components/getStarted.tsx`** - CTA section
9. **`src/app/components/footer.tsx`** - Footer

### **Anti-Patterns to Avoid:**

1. ❌ Don't hardcode colors in multiple places - use CSS variables
2. ❌ Don't inline styles when Tailwind classes work
3. ❌ Don't break responsive design - test each breakpoint
4. ❌ Don't remove accessibility features
5. ❌ Don't skip the design token setup phase

### **Pro Tips:**

1. ✅ Use Tailwind's `@apply` sparingly - prefer utility classes
2. ✅ Keep framer-motion animations unless design changes them
3. ✅ Maintain the custom button shape system (it's well-architected)
4. ✅ Use `cn()` utility for conditional classes (you already do this)
5. ✅ Keep semantic HTML structure

---

## **Suggested Workflow:**

1. **Extract design tokens from Figma** (30 min)
   - Colors, fonts, spacing scale
   - Document in a temporary markdown file

2. **Update foundation** (1 hour)
   - Colors & fonts in config files

3. **Component-by-component implementation** (4-8 hours)
   - One component at a time
   - Test after each one

4. **Cross-browser testing** (1 hour)
   - Chrome, Safari, Firefox
   - Mobile devices

5. **Performance audit** (30 min)
   - Lighthouse score
   - Check bundle size

---

Would you like me to start with Phase 1 (extracting and setting up the design tokens)? If you share screenshots of the Figma design or the color palette, I can help you set up the exact HSL values and create a migration plan for each component.