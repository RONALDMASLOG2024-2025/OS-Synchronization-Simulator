# 🎨 UI Components & Features Guide

## Theme Toggle

### Location
Top-right corner of the header

### States
- **Light Mode** ☀️ - Bright, clean interface
- **Dark Mode** 🌙 - Easy on the eyes
- **System** 🔄 - Follows OS preference

### How to Use
Click the sun/moon icon to cycle through themes:
Light → Dark → System → Light

---

## Sleeping Barber Simulator

### Control Buttons

| Button | Function | When Available |
|--------|----------|----------------|
| ▶️ Start | Begin simulation | When paused |
| ⏸️ Pause | Pause simulation | When running |
| ➕ Add Customer | Manually add customer | When paused |
| 🔄 Reset | Clear all and restart | Always |
| ⚙️ Settings | Show/hide settings | Always |

### Settings Panel

#### Waiting Chairs
- **Range**: 1-10 chairs
- **Default**: 3 chairs
- **Effect**: More chairs = fewer rejected customers
- **Input**: Number input field

#### Customer Arrival Rate
- **Range**: 10%-100%
- **Default**: 70%
- **Effect**: Higher = more frequent customers
- **Control**: Slider

#### Animation Speed
- **Slow**: 3000ms intervals
- **Normal**: 2000ms intervals  
- **Fast**: 1000ms intervals
- **Control**: Three buttons

### Statistics Cards

#### Served (Green)
- Shows total customers who got haircuts
- Increments when barber finishes

#### Waiting (Blue)
- Shows current customers in waiting area
- Updates in real-time

#### Rejected (Red)
- Shows customers who left (no chairs)
- Increments when all chairs full

### Barber States

| State | Visual | Meaning |
|-------|--------|---------|
| 😴 Sleeping | Gray circle | No customers |
| ✂️ Cutting | Green pulsing | Serving customer |
| 💤 Idle | Yellow | Between customers |

### Waiting Area
- **Empty chair**: Gray, dashed border
- **Occupied chair**: Blue, solid border, customer icon
- **Grid adapts** to number of chairs

---

## Cigarette Smokers Simulator

### Control Buttons

| Button | Function | When Available |
|--------|----------|----------------|
| ▶️ Start | Begin simulation | When paused |
| ⏸️ Pause | Pause simulation | When running |
| 🔄 Reset | Clear all and restart | Always |
| ⚙️ Settings | Show/hide settings | Always |

### Settings Panel

#### Animation Speed
- **Slow**: 3000ms per cycle
- **Normal**: 2000ms per cycle
- **Fast**: 1000ms per cycle
- **Control**: Three buttons

### Statistics

#### Total Cigarettes Smoked
- Central purple card
- Shows cumulative count
- Updates when smoker finishes

### Agent States

| State | Visual | Meaning |
|-------|--------|---------|
| 🤵 Idle | Gray circle | Waiting for smoker |
| 🤵 Placing | Yellow pulsing | Placing ingredients |

### Table States

| State | Visual | Contents |
|-------|--------|----------|
| Empty | Gray, dashed | "Empty Table" |
| Has Ingredients | Amber, solid | 2 ingredient icons |

### Ingredients

| Icon | Color | Name |
|------|-------|------|
| 🌿 | Green | Tobacco |
| 📄 | Blue | Paper |
| 🔥 | Red | Matches |

### Smoker States

| State | Visual | Card Style |
|-------|--------|------------|
| 🧑 Waiting | Blue gradient | Normal size |
| 🚬 Smoking | Green gradient | Scaled up, pulsing |

### Smoker Cards Show
1. **Emoji**: Current state
2. **Badge**: Status label
3. **Has section**: Their ingredient
4. **Smoked count**: Individual count

---

## Color System

### Light Mode
```
Background:     White → Light Blue gradient
Primary:        Blue (#3B82F6)
Success:        Green (#10B981)
Warning:        Yellow (#F59E0B)
Danger:         Red (#EF4444)
Cards:          White with shadows
Text:           Dark Gray (#171717)
```

### Dark Mode
```
Background:     Dark Slate gradient
Primary:        Blue (#3B82F6)
Success:        Green (#10B981)
Warning:        Yellow (#F59E0B)
Danger:         Red (#EF4444)
Cards:          Dark Gray with borders
Text:           Light Gray (#EDEDED)
```

---

## Event Log

### Features
- **Terminal-style** black background
- **Green text** for visibility
- **Timestamps** on each entry
- **Scrollable** history
- **Hover effects** on entries
- **Auto-scroll** to latest

### Event Types
- ✅ Customer actions
- 💈 Barber state changes
- ❌ Rejections
- 🔄 System events
- 📋 Agent actions
- 🚬 Smoking events

---

## Keyboard Navigation

### Tab Order
1. Theme toggle
2. GitHub link
3. Tab buttons (Barber/Smokers)
4. Control buttons
5. Settings button
6. Settings inputs (when open)

### Shortcuts
- **Enter/Space**: Activate buttons
- **Tab**: Navigate between elements
- **Shift+Tab**: Navigate backward
- **Esc**: Close settings (suggested)

---

## Responsive Breakpoints

### Mobile (< 768px)
- Single column layout
- Stacked statistics
- Smaller cards
- Touch-friendly controls

### Tablet (768px - 1024px)
- Two column layouts
- Medium cards
- Optimized spacing

### Desktop (> 1024px)
- Three column layouts
- Full features
- Maximum spacing
- Enhanced animations

---

## Animation Timings

### Quick (150ms)
- Hover states
- Button clicks
- Badge changes

### Normal (300ms)
- Card transitions
- Theme changes
- Settings toggle

### Slow (500ms)
- Barber state changes
- Smoker state changes
- Scale animations

---

## Tips for Best Experience

1. **Start with Normal speed** to understand the flow
2. **Use Settings** to customize experience
3. **Watch Event Log** for detailed activity
4. **Try Dark Mode** for extended viewing
5. **Adjust arrival rate** to see different scenarios
6. **Reset frequently** to try different configurations

---

## Troubleshooting

### Simulation won't start
- Check if already running (Pause button showing)
- Try Reset button first

### Theme not changing
- Check browser compatibility
- Clear local storage
- Refresh page

### Animations choppy
- Close other browser tabs
- Check system resources
- Try slower speed setting

### Settings not saving
- Settings are per-session
- Reset will clear all
- No persistence by design (educational tool)

---

**Enjoy exploring Operating System synchronization concepts! 🎓**
