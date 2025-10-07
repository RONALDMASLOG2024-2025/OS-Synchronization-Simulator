# OS Synchronization Simulator - Setup Guide

## Project Structure

```
os-synchronization/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Main application page
│   │   ├── layout.tsx            # Root layout
│   │   ├── globals.css           # Global styles with CSS variables
│   │   └── favicon.ico
│   ├── components/
│   │   ├── ui/                   # ShadCN UI components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── badge.tsx
│   │   │   └── tabs.tsx
│   │   ├── SleepingBarberSimulator.tsx
│   │   └── CigaretteSmokersSimulator.tsx
│   └── lib/
│       └── utils.ts              # Utility functions
├── public/                        # Static assets
├── package.json
├── tsconfig.json
├── next.config.ts
└── README.md
```

## Features Implemented

### 1. Sleeping Barber Simulator
- **Visual representation** of barber and waiting area
- **Real-time animation** showing barber states (sleeping, cutting, idle)
- **Customer queue management** with limited waiting chairs
- **Statistics tracking**: customers served, waiting, and rejected
- **Event logging** with timestamps
- **Adjustable speed** controls (slow, normal, fast)
- **Auto-customer generation** during simulation
- **Color-coded states** for easy understanding

### 2. Cigarette Smokers Simulator
- **Visual representation** of agent and three smokers
- **Ingredient display** on table (tobacco, paper, matches)
- **Real-time status** of each smoker
- **Statistics tracking** for total cigarettes smoked and individual counts
- **Event logging** system
- **Adjustable speed** controls
- **Clear visual feedback** when a smoker can smoke
- **Automatic agent** placing ingredients

### 3. User Interface
- **Tab-based navigation** between simulators
- **Responsive design** for desktop and mobile
- **Dark mode support** with system preference detection
- **Educational tooltips** and explanations
- **Clean, modern design** using ShadCN UI components
- **Accessible controls** with clear labels

## Technical Implementation

### Synchronization Logic

#### Sleeping Barber
```typescript
// Key states:
- Barber: sleeping | cutting | idle
- Customers: waiting | getting-haircut | leaving
- Uses React state to manage queue
- Interval-based state transitions
```

#### Cigarette Smokers
```typescript
// Key states:
- Agent: idle | placing
- Smokers: waiting | smoking | done
- Table ingredients array
- Conditional logic to determine which smoker can proceed
```

### UI Components

All UI components follow ShadCN UI design patterns:
- **Consistent styling** with CSS variables
- **Accessible** with proper ARIA labels
- **TypeScript typed** for better DX
- **Customizable** through className props

## Running the Project

### Development Mode
```bash
npm run dev
```
Access at: http://localhost:3000

### Production Build
```bash
npm run build
npm start
```

### Linting
```bash
npm run lint
```

## Customization

### Adjusting Animation Speed
In both simulator components, modify the `speed` state default value:
```typescript
const [speed, setSpeed] = useState(2000); // milliseconds
```

### Changing Waiting Chairs (Barber Problem)
```typescript
const [waitingChairs] = useState(3); // Change the number
```

### Adding More Features
- Add sound effects for events
- Implement manual customer control
- Add more synchronization problems
- Create difficulty levels
- Add tutorial mode with guided steps

## Color Scheme

The application uses a consistent color scheme defined in `globals.css`:

**Light Mode:**
- Primary: Blue (HSL 217 91% 60%)
- Background: White
- Cards: White with subtle borders

**Dark Mode:**
- Primary: Blue (same as light mode for consistency)
- Background: Very dark gray
- Cards: Dark gray with lighter borders

## Browser Support

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- Mobile browsers: ✅ Responsive design

## Performance Considerations

- Uses React hooks efficiently
- Minimal re-renders through proper state management
- Cleanup of intervals to prevent memory leaks
- Optimized animations using CSS transitions

## Accessibility

- Semantic HTML elements
- Proper heading hierarchy
- Button labels and ARIA attributes
- Keyboard navigation support
- Color contrast meets WCAG AA standards

## Future Enhancements

1. **Additional Problems**
   - Dining Philosophers Problem
   - Readers-Writers Problem
   - Producer-Consumer Problem

2. **Educational Features**
   - Step-by-step tutorial mode
   - Quiz mode to test understanding
   - Code examples alongside visualizations
   - Export simulation data

3. **Advanced Controls**
   - Pause at specific events
   - Replay functionality
   - Save/load simulation states
   - Compare different solutions

## Troubleshooting

### Development Server Won't Start
- Ensure Node.js 18+ is installed
- Delete `node_modules` and `.next` folders
- Run `npm install` again

### Styles Not Loading
- Check that PostCSS config is correct
- Verify Tailwind CSS 4 is installed
- Clear browser cache

### Components Not Rendering
- Check browser console for errors
- Verify all imports are correct
- Ensure component file paths match

## Contributing

When adding new features:
1. Follow existing code structure
2. Use TypeScript for type safety
3. Add comments for complex logic
4. Test in both light and dark modes
5. Ensure responsive design

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [ShadCN UI](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Operating Systems Concepts](https://www.os-book.com/)

---

**Last Updated:** October 7, 2025
