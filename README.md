/app
├── api/
│   ├── food/
│   │   └── route.ts               # API-Route für Lebensmittel
│   ├── pantry/
│   │   └── route.ts              # API-Route für Vorratskammer
│   └── recipes/
│       └── route.ts              # API-Route für Rezepte
├── dashboard/
│   ├── components/
│   │   ├── BudgetDetails.tsx     # Budget-Übersicht
│   │   ├── BudgetRing.tsx        # Kreisdiagramm für Budget
│   │   ├── BudgetSetter.tsx      # Budget-Einstellungen
│   │   ├── BudgetTracker.tsx     # Budget-Tracking
│   │   ├── CategoryGrid.tsx      # Kategorie-Raster
│   │   ├── Header.tsx            # Dashboard-Header
│   │   ├── Kostenteiler.tsx      # Kosten-Splitting
│   │   ├── MealModal.tsx         # Modal für Mahlzeiten
│   │   ├── MobileNavigation.tsx  # Mobile Navigation
│   │   ├── NotificationDropdown  # Benachrichtigungen
│   │   ├── PantryPreview.tsx     # Vorratskammer-Vorschau
│   │   ├── SmartNotifications    # Intelligente Benachrichtigungen
│   │   ├── TopNavigation.tsx     # Hauptnavigation
│   │   ├── TransactionHistory    # Transaktionsverlauf
│   │   └── WeeklyMealPlanner.tsx # Wochenplaner
│   └── page.tsx                  # Dashboard-Hauptseite
├── pantry/
│   ├── components/
│   │   ├── AddItemModal.tsx      # Modal für neue Artikel
│   │   ├── CategorySidebar.tsx   # Kategorie-Seitenleiste
│   │   ├── ExpiryAlerts.tsx      # Ablauf-Warnungen
│   │   ├── PantryAnalytics.tsx   # Vorrats-Analysen
│   │   ├── PantryFilters.tsx     # Filter-Komponente
│   │   ├── PantryGrid.tsx        # Artikel-Raster
│   │   ├── PantryHeader.tsx      # Vorrats-Header
│   │   └── PantryStats.tsx       # Statistik-Komponente
│   └── page.tsx                  # Vorratskammer-Hauptseite
├── recipes/
│   ├── components/
│   │   ├── AllergiesIntolerances.tsx  # Allergien-Komponente
│   │   ├── AutoComplete.tsx      # Autovervollständigung
│   │   ├── DietaryPreferences.tsx # Ernährungspräferenzen
│   │   ├── HeroSection.tsx       # Hero-Bereich
│   │   ├── HowItWorks.tsx        # Erklärungssektion
│   │   ├── IngredientInput.tsx   # Zutaten-Eingabe
│   │   ├── RecipeDetail.tsx      # Rezept-Details
│   │   └── RecipeSuggestions.tsx # Rezeptvorschläge
│   └── page.tsx                  # Rezept-Hauptseite
├── types/
│   └── ingredients.ts            # Typdefinitionen
├── footer.tsx                    # Globaler Footer
├── globals.css                   # Globale Styles
├── header.tsx                    # Globaler Header
├── layout.tsx                    # Root Layout
├── page.tsx                      # Landing Page
└── ResponsiveFooter.tsx          # Responsiver Footer

/config
├── next.config.js               # Next.js Konfiguration
└── tailwind.config.js           # Tailwind Konfiguration

/.env                            # Umgebungsvariablen
