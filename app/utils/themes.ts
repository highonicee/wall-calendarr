

// Every color in the UI pulls from this nothing is hardcoded elsewhere

export type MonthTheme = {
  // Card and page background
  pageBg: string;
  cardBg: string;

  // Image gradient overlay (blends image into card)
  gradientTo: string;

  // Month/year text
  monthColor: string;
  yearColor: string;

  // Navigation arrows
  arrowColor: string;
  arrowHover: string;

  // Weekday labels
  weekdayColor: string;

  // Day cell states
  dayDefault: string;          // normal day text
  dayHover: string;            // hover background
  todayBorder: string;         // today's border ring
  todayText: string;
  selectedBg: string;          // start/end circle fill
  selectedText: string;
  rangeBg: string;             // days between start & end
  rangeText: string;

 
  rangeLabel: string;

  // Notes panel
  noteLabel: string;          
  noteBorder: string;
  noteFocusRing: string;
  notePlaceholder: string;
  noteText: string;
  noteBg: string;

  // Save button
  saveBtnBorder: string;
  saveBtnText: string;
  saveBtnHoverBg: string;
  charCount: string;
};

export const THEMES: MonthTheme[] = [
  // jan blue flowers 
 {
  pageBg:         "#dce8f5",
  cardBg:         "#eef4fb",
  gradientTo:     "rgba(238,244,251,0.85)",
  monthColor:     "#1a3a5c",
  yearColor:      "#4a7aaa",
  arrowColor:     "#6a9ec5",
  arrowHover:     "#1a3a5c",
  weekdayColor:   "#4a7aaa",
  dayDefault:     "#2c5282",
  dayHover:       "#dbeafe",
  todayBorder:    "#3b82f6",
  todayText:      "#1e40af",
  selectedBg:     "#1e40af",
  selectedText:   "#ffffff",
  rangeBg:        "#bfdbfe",
  rangeText:      "#1e3a5f",
  rangeLabel:     "#3b82f6",
  noteLabel:      "#1e40af",
  noteBorder:     "#93c5fd",
  noteFocusRing:  "#3b82f6",
  notePlaceholder:"#6b9fd4",
  noteText:       "#0f2a4a",
  noteBg:         "#dbeafe",
  saveBtnBorder:  "#3b82f6",
  saveBtnText:    "#1e40af",
  saveBtnHoverBg: "#bfdbfe",
  charCount:      "#3b82f6",
},

  // feb pink lily 
 
{
  pageBg:         "#fce7f3",
  cardBg:         "#fdf2f8",
  gradientTo:     "rgba(253,242,248,0.85)",
  monthColor:     "#831843",
  yearColor:      "#be185d",
  arrowColor:     "#f472b6",
  arrowHover:     "#831843",
  weekdayColor:   "#be185d",
  dayDefault:     "#9d174d",
  dayHover:       "#fce7f3",
  todayBorder:    "#ec4899",
  todayText:      "#831843",
  selectedBg:     "#be185d",
  selectedText:   "#ffffff",
  rangeBg:        "#fbcfe8",
  rangeText:      "#831843",
  rangeLabel:     "#ec4899",
  noteLabel:      "#831843",
  noteBorder:     "#f9a8d4",
  noteFocusRing:  "#ec4899",
  notePlaceholder:"#be185d",
  noteText:       "#500d2a",
  noteBg:         "#fce7f3",
  saveBtnBorder:  "#ec4899",
  saveBtnText:    "#831843",
  saveBtnHoverBg: "#fbcfe8",
  charCount:      "#be185d",
},

  // march white and yellow flowers
  {
    pageBg:         "#fefce8",
    cardBg:         "#fffef5",
    gradientTo:     "rgba(255,254,245,0.85)",
    monthColor:     "#713f12",
    yearColor:      "#a16207",
    arrowColor:     "#ca8a04",
    arrowHover:     "#713f12",
    weekdayColor:   "#a16207",
    dayDefault:     "#78350f",
    dayHover:       "#fef9c3",
    todayBorder:    "#eab308",
    todayText:      "#713f12",
    selectedBg:     "#a16207",
    selectedText:   "#fffbeb",
    rangeBg:        "#fef08a",
    rangeText:      "#713f12",
    rangeLabel:     "#ca8a04",
    noteLabel:      "#ca8a04",
    noteBorder:     "#fef08a",
    noteFocusRing:  "#fde047",
    notePlaceholder:"#fde047",
    noteText:       "#78350f",
    noteBg:         "#fffef0",
    saveBtnBorder:  "#fde047",
    saveBtnText:    "#a16207",
    saveBtnHoverBg: "#fef9c3",
    charCount:      "#fde047",
  },

  // april colourful flowers 
  {
    pageBg:         "#f3e8ff",
    cardBg:         "#faf5ff",
    gradientTo:     "rgba(250,245,255,0.85)",
    monthColor:     "#3b0764",
    yearColor:      "#7e22ce",
    arrowColor:     "#a855f7",
    arrowHover:     "#3b0764",
    weekdayColor:   "#7e22ce",
    dayDefault:     "#4c1d95",
    dayHover:       "#f3e8ff",
    todayBorder:    "#a855f7",
    todayText:      "#3b0764",
    selectedBg:     "#7e22ce",
    selectedText:   "#faf5ff",
    rangeBg:        "#e9d5ff",
    rangeText:      "#3b0764",
    rangeLabel:     "#a855f7",
    noteLabel:      "#a855f7",
    noteBorder:     "#e9d5ff",
    noteFocusRing:  "#d8b4fe",
    notePlaceholder:"#d8b4fe",
    noteText:       "#3b0764",
    noteBg:         "#fdf4ff",
    saveBtnBorder:  "#d8b4fe",
    saveBtnText:    "#7e22ce",
    saveBtnHoverBg: "#f3e8ff",
    charCount:      "#d8b4fe",
  },

  // may colourful full bloom 
  {
    pageBg:         "#ecfdf5",
    cardBg:         "#f0fdf4",
    gradientTo:     "rgba(240,253,244,0.85)",
    monthColor:     "#064e3b",
    yearColor:      "#047857",
    arrowColor:     "#10b981",
    arrowHover:     "#064e3b",
    weekdayColor:   "#047857",
    dayDefault:     "#065f46",
    dayHover:       "#d1fae5",
    todayBorder:    "#10b981",
    todayText:      "#064e3b",
    selectedBg:     "#047857",
    selectedText:   "#ecfdf5",
    rangeBg:        "#a7f3d0",
    rangeText:      "#064e3b",
    rangeLabel:     "#10b981",
    noteLabel:      "#10b981",
    noteBorder:     "#a7f3d0",
    noteFocusRing:  "#6ee7b7",
    notePlaceholder:"#6ee7b7",
    noteText:       "#064e3b",
    noteBg:         "#f0fff8",
    saveBtnBorder:  "#6ee7b7",
    saveBtnText:    "#047857",
    saveBtnHoverBg: "#d1fae5",
    charCount:      "#6ee7b7",
  },

  // june  pink lotus in blue water
  {
    pageBg:         "#e0f2fe",
    cardBg:         "#f0f9ff",
    gradientTo:     "rgba(240,249,255,0.85)",
    monthColor:     "#0c4a6e",
    yearColor:      "#0369a1",
    arrowColor:     "#38bdf8",
    arrowHover:     "#0c4a6e",
    weekdayColor:   "#0369a1",
    dayDefault:     "#075985",
    dayHover:       "#e0f2fe",
    todayBorder:    "#e879a0",    
    todayText:      "#0c4a6e",
    selectedBg:     "#0369a1",
    selectedText:   "#f0f9ff",
    rangeBg:        "#bae6fd",
    rangeText:      "#0c4a6e",
    rangeLabel:     "#38bdf8",
    noteLabel:      "#e879a0",   
    noteBorder:     "#bae6fd",
    noteFocusRing:  "#7dd3fc",
    notePlaceholder:"#7dd3fc",
    noteText:       "#0c4a6e",
    noteBg:         "#f0f9ff",
    saveBtnBorder:  "#e879a0",
    saveBtnText:    "#0369a1",
    saveBtnHoverBg: "#fce7f3",
    charCount:      "#7dd3fc",
  },

  // july  pink lily on black bg 
  
{
  pageBg:         "#1a0a0f",
  cardBg:         "#1f0d14",
  gradientTo:     "rgba(31,13,20,0.92)",
  monthColor:     "#fda4af",
  yearColor:      "#fb7185",
  arrowColor:     "#f43f5e",
  arrowHover:     "#fda4af",
  weekdayColor:   "#fb7185",
  dayDefault:     "#fecdd3",
  dayHover:       "#3f0a18",
  todayBorder:    "#f43f5e",
  todayText:      "#fda4af",
  selectedBg:     "#f43f5e",
  selectedText:   "#fff1f2",
  rangeBg:        "#4c0519",
  rangeText:      "#fda4af",
  rangeLabel:     "#fb7185",
  noteLabel:      "#fda4af",        
  noteBorder:     "#6b1a2a",      
  noteFocusRing:  "#f43f5e",
  notePlaceholder:"#c4687a",       
  noteText:       "#fecdd3",       
  noteBg:         "#2d1119",        
  saveBtnBorder:  "#f43f5e",
  saveBtnText:    "#fda4af",
  saveBtnHoverBg: "#3f0a18",
  charCount:      "#fb7185",
},
  // august white lilies on black bg
  {
  pageBg:         "#0a0a0a",
  cardBg:         "#111111",
  gradientTo:     "rgba(17,17,17,0.92)",
  monthColor:     "#f5f5f5",
  yearColor:      "#d4d4d4",        
  arrowColor:     "#a3a3a3",
  arrowHover:     "#f5f5f5",
  weekdayColor:   "#d4d4d4",       
  dayDefault:     "#e5e5e5",
  dayHover:       "#2a2a2a",
  todayBorder:    "#d4d4d4",
  todayText:      "#f5f5f5",
  selectedBg:     "#e5e5e5",
  selectedText:   "#111111",
  rangeBg:        "#262626",
  rangeText:      "#d4d4d4",
  rangeLabel:     "#d4d4d4",        
  noteLabel:      "#f5f5f5",        
  noteBorder:     "#3a3a3a",       
  noteFocusRing:  "#a3a3a3",
  notePlaceholder:"#737373",     
  noteText:       "#f5f5f5",        
  noteBg:         "#1c1c1c",      
  saveBtnBorder:  "#737373",
  saveBtnText:    "#e5e5e5",     
  saveBtnHoverBg: "#2a2a2a",
  charCount:      "#a3a3a3",     
},

  // september purple flowers 
  {
    pageBg:         "#ede9fe",
    cardBg:         "#f5f3ff",
    gradientTo:     "rgba(245,243,255,0.85)",
    monthColor:     "#2e1065",
    yearColor:      "#5b21b6",
    arrowColor:     "#7c3aed",
    arrowHover:     "#2e1065",
    weekdayColor:   "#5b21b6",
    dayDefault:     "#3b0764",
    dayHover:       "#ede9fe",
    todayBorder:    "#7c3aed",
    todayText:      "#2e1065",
    selectedBg:     "#5b21b6",
    selectedText:   "#f5f3ff",
    rangeBg:        "#ddd6fe",
    rangeText:      "#2e1065",
    rangeLabel:     "#7c3aed",
    noteLabel:      "#7c3aed",
    noteBorder:     "#ddd6fe",
    noteFocusRing:  "#c4b5fd",
    notePlaceholder:"#c4b5fd",
    noteText:       "#2e1065",
    noteBg:         "#faf5ff",
    saveBtnBorder:  "#c4b5fd",
    saveBtnText:    "#5b21b6",
    saveBtnHoverBg: "#ede9fe",
    charCount:      "#c4b5fd",
  },

  // october green and peach 
  {
    pageBg:         "#fef3e8",
    cardBg:         "#fdf8f0",
    gradientTo:     "rgba(253,248,240,0.85)",
    monthColor:     "#2d4a22",
    yearColor:      "#3d6b2e",
    arrowColor:     "#f97316",
    arrowHover:     "#2d4a22",
    weekdayColor:   "#4a7c35",
    dayDefault:     "#2d4a22",
    dayHover:       "#dcfce7",
    todayBorder:    "#f97316",
    todayText:      "#2d4a22",
    selectedBg:     "#ea580c",
    selectedText:   "#fff7ed",
    rangeBg:        "#fed7aa",
    rangeText:      "#431407",
    rangeLabel:     "#f97316",
    noteLabel:      "#f97316",
    noteBorder:     "#fed7aa",
    noteFocusRing:  "#fdba74",
    notePlaceholder:"#fdba74",
    noteText:       "#431407",
    noteBg:         "#fff7ed",
    saveBtnBorder:  "#fdba74",
    saveBtnText:    "#ea580c",
    saveBtnHoverBg: "#ffedd5",
    charCount:      "#fdba74",
  },

  // november light blue and white flowers 
  
{
  pageBg:         "#e8f4f8",
  cardBg:         "#f0f8fc",
  gradientTo:     "rgba(240,248,252,0.85)",
  monthColor:     "#0e3a5c",
  yearColor:      "#1d6a8a",
  arrowColor:     "#5ba3c4",
  arrowHover:     "#0e3a5c",
  weekdayColor:   "#2d7fa0",
  dayDefault:     "#0e3a5c",
  dayHover:       "#d0eaf5",
  todayBorder:    "#5ba3c4",
  todayText:      "#0e3a5c",
  selectedBg:     "#1d6a8a",
  selectedText:   "#ffffff",
  rangeBg:        "#b8dff0",
  rangeText:      "#0e3a5c",
  rangeLabel:     "#1d6a8a",
  noteLabel:      "#0e3a5c",       
  noteBorder:     "#7ec8e3",
  noteFocusRing:  "#5ba3c4",
  notePlaceholder:"#2d7fa0",        
  noteText:       "#0a2a42",     
  noteBg:         "#e0f2fa",    
  saveBtnBorder:  "#5ba3c4",
  saveBtnText:    "#0e3a5c",
  saveBtnHoverBg: "#d0eaf5",
  charCount:      "#2d7fa0",
},

  // december purple flowers
  
  
{
  pageBg:         "#1a0a2e",
  cardBg:         "#1e0d35",
  gradientTo:     "rgba(30,13,53,0.92)",
  monthColor:     "#e9d5ff",
  yearColor:      "#c084fc",
  arrowColor:     "#a855f7",
  arrowHover:     "#e9d5ff",
  weekdayColor:   "#c084fc",
  dayDefault:     "#e9d5ff",
  dayHover:       "#2e1065",
  todayBorder:    "#a855f7",
  todayText:      "#f3e8ff",
  selectedBg:     "#7c3aed",
  selectedText:   "#f5f3ff",
  rangeBg:        "#3b0764",
  rangeText:      "#e9d5ff",
  rangeLabel:     "#c084fc",
  noteLabel:      "#e9d5ff",        
  noteBorder:     "#4c1d95",        
  noteFocusRing:  "#7c3aed",
  notePlaceholder:"#9b6fd4",        
  noteText:       "#f3e8ff",       
  noteBg:         "#2d1454",        
  saveBtnBorder:  "#7c3aed",
  saveBtnText:    "#e9d5ff",
  saveBtnHoverBg: "#2e1065",
  charCount:      "#c084fc",        
},
];