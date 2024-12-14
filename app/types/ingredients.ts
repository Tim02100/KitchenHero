// app/types/ingredients.ts

export interface Ingredient {
    name: string;
    category: string;
    icon: string;
    subcategory?: string;
    season?: string[];
    tags?: string[];
  }
  
  export const categories = {
    VEGETABLES: 'Gemüse',
    FRUITS: 'Obst',
    BASICS: 'Basis',
    GRAINS: 'Getreide',
    DAIRY: 'Milchprodukte',
    MEAT: 'Fleisch',
    FISH: 'Fisch',
    SPICES: 'Gewürze',
    HERBS: 'Kräuter',
    NUTS: 'Nüsse & Samen',
    SAUCES: 'Saucen & Öle',
    SNACKS: 'Snacks',
    BEVERAGES: 'Getränke',
  } as const;
  
  export const commonIngredients: Ingredient[] = [
  // Gemüse
   { name: 'Kartoffeln', category: categories.VEGETABLES, icon: '🥔', subcategory: 'Knollen', tags: ['kohlenhydratreich', 'sättigend'] },
   { name: 'Süßkartoffeln', category: categories.VEGETABLES, icon: '🍠', subcategory: 'Knollen', tags: ['kohlenhydratreich', 'vitaminreich'] },
   { name: 'Zwiebeln', category: categories.VEGETABLES, icon: '🧅', subcategory: 'Wurzelgemüse', tags: ['basis', 'würzig'] },
   { name: 'Knoblauch', category: categories.VEGETABLES, icon: '🧄', subcategory: 'Wurzelgemüse', tags: ['würzig', 'gesund'] },
   { name: 'Tomaten', category: categories.VEGETABLES, icon: '🍅', subcategory: 'Fruchtgemüse', tags: ['vitaminreich', 'vielseitig'] },
   { name: 'Karotten', category: categories.VEGETABLES, icon: '🥕', subcategory: 'Wurzelgemüse', tags: ['vitaminreich', 'knackig'] },
   { name: 'Brokkoli', category: categories.VEGETABLES, icon: '🥦', subcategory: 'Kohlgemüse', tags: ['gesund', 'vitaminreich'] },
   { name: 'Blumenkohl', category: categories.VEGETABLES, icon: '🥬', subcategory: 'Kohlgemüse', tags: ['kalorienarm', 'vielseitig'] },
   { name: 'Zucchini', category: categories.VEGETABLES, icon: '🥒', subcategory: 'Fruchtgemüse', tags: ['kalorienarm', 'vielseitig'] },
   { name: 'Aubergine', category: categories.VEGETABLES, icon: '🍆', subcategory: 'Fruchtgemüse', tags: ['mediterran', 'vielseitig'] },
   { name: 'Paprika', category: categories.VEGETABLES, icon: '🫑', subcategory: 'Fruchtgemüse', tags: ['vitaminreich', 'knackig'] },
   { name: 'Spinat', category: categories.VEGETABLES, icon: '🥬', subcategory: 'Blattgemüse', tags: ['eisenreich', 'gesund'] },
   { name: 'Gurke', category: categories.VEGETABLES, icon: '🥒', subcategory: 'Fruchtgemüse', tags: ['erfrischend', 'kalorienarm'] },
   { name: 'Champignons', category: categories.VEGETABLES, icon: '🍄', subcategory: 'Pilze', tags: ['proteinreich', 'würzig'] },
   { name: 'Mais', category: categories.VEGETABLES, icon: '🌽', subcategory: 'Getreide', tags: ['süß', 'knackig'] },
   { name: 'Erbsen', category: categories.VEGETABLES, icon: '🟢', subcategory: 'Hülsenfrüchte', tags: ['proteinreich', 'süß'] },
   { name: 'Bohnen', category: categories.VEGETABLES, icon: '🫘', subcategory: 'Hülsenfrüchte', tags: ['faserreich', 'sättigend'] },
   { name: 'Lauch', category: categories.VEGETABLES, icon: '🧅', subcategory: 'Wurzelgemüse', tags: ['aromatisch', 'basis'] },
   { name: 'Kohlrabi', category: categories.VEGETABLES, icon: '🥗', subcategory: 'Kohlgemüse', tags: ['knackig', 'vitaminreich'] },
   { name: 'Rosenkohl', category: categories.VEGETABLES, icon: '🥬', subcategory: 'Kohlgemüse', tags: ['gesund', 'winterlich'] },
   { name: 'Grünkohl', category: categories.VEGETABLES, icon: '🥬', subcategory: 'Blattgemüse', tags: ['eisenreich', 'superfood'] },
   { name: 'Sellerie', category: categories.VEGETABLES, icon: '🌱', subcategory: 'Wurzelgemüse', tags: ['basis', 'aromatisch'] },
   { name: 'Rote Bete', category: categories.VEGETABLES, icon: '🟥', subcategory: 'Knollen', tags: ['eisenreich', 'gesund'] },
   { name: 'Spargel', category: categories.VEGETABLES, icon: '🌱', subcategory: 'Frühlingsgemüse', tags: ['fein', 'gesund'] },
   { name: 'Mangold', category: categories.VEGETABLES, icon: '🥬', subcategory: 'Blattgemüse', tags: ['eisenreich', 'mediterran'] },
   { name: 'Fenchel', category: categories.VEGETABLES, icon: '🌾', subcategory: 'Fruchtgemüse', tags: ['aromatisch', 'verdauungsfördernd'] },
   { name: 'Radieschen', category: categories.VEGETABLES, icon: '🌶️', subcategory: 'Knollen', tags: ['würzig', 'frisch'] },
   { name: 'Artischocken', category: categories.VEGETABLES, icon: '🌿', subcategory: 'Blütengemüse', tags: ['mediterran', 'gesund'] },
   { name: 'Kürbis', category: categories.VEGETABLES, icon: '🎃', subcategory: 'Fruchtgemüse', tags: ['herbstlich', 'süß'] },
   { name: 'Chili', category: categories.VEGETABLES, icon: '🌶️', subcategory: 'Fruchtgemüse', tags: ['scharf', 'aromatisch'] },

     // Obst
   { name: 'Äpfel', category: categories.FRUITS, icon: '🍎', subcategory: 'Kernobst', tags: ['süß', 'saftig'] },
   { name: 'Bananen', category: categories.FRUITS, icon: '🍌', subcategory: 'Exotisch', tags: ['süß', 'energiereich'] },
   { name: 'Orangen', category: categories.FRUITS, icon: '🍊', subcategory: 'Zitrusfrüchte', tags: ['vitaminreich', 'saftig'] },
   { name: 'Zitronen', category: categories.FRUITS, icon: '🍋', subcategory: 'Zitrusfrüchte', tags: ['sauer', 'vitaminreich'] },
   { name: 'Erdbeeren', category: categories.FRUITS, icon: '🍓', subcategory: 'Beeren', tags: ['süß', 'vitaminreich'] },
   { name: 'Weintrauben', category: categories.FRUITS, icon: '🍇', subcategory: 'Beeren', tags: ['süß', 'snack'] },
   { name: 'Birnen', category: categories.FRUITS, icon: '🍐', subcategory: 'Kernobst', tags: ['süß', 'saftig'] },
   { name: 'Ananas', category: categories.FRUITS, icon: '🍍', subcategory: 'Exotisch', tags: ['süß-sauer', 'exotisch'] },
   { name: 'Kirschen', category: categories.FRUITS, icon: '🍒', subcategory: 'Steinobst', tags: ['süß', 'saftig'] },
   { name: 'Pfirsiche', category: categories.FRUITS, icon: '🍑', subcategory: 'Steinobst', tags: ['süß', 'fruchtig'] },
   { name: 'Mango', category: categories.FRUITS, icon: '🥭', subcategory: 'Exotisch', tags: ['süß', 'exotisch'] },
   { name: 'Melonen', category: categories.FRUITS, icon: '🍈', subcategory: 'Fruchtgemüse', tags: ['erfrischend', 'saftig'] },
   { name: 'Wassermelonen', category: categories.FRUITS, icon: '🍉', subcategory: 'Fruchtgemüse', tags: ['erfrischend', 'saftig'] },
   { name: 'Blaubeeren', category: categories.FRUITS, icon: '🫐', subcategory: 'Beeren', tags: ['süß', 'antioxidativ'] },
   { name: 'Himbeeren', category: categories.FRUITS, icon: '🍓', subcategory: 'Beeren', tags: ['süß-sauer', 'aromatisch'] },
   { name: 'Johannisbeeren', category: categories.FRUITS, icon: '🍒', subcategory: 'Beeren', tags: ['sauer', 'vitaminreich'] },
   { name: 'Pflaumen', category: categories.FRUITS, icon: '🍑', subcategory: 'Steinobst', tags: ['süß', 'fruchtig'] },
   { name: 'Granatapfel', category: categories.FRUITS, icon: '🍎', subcategory: 'Exotisch', tags: ['süß-sauer', 'antioxidativ'] },
   { name: 'Feigen', category: categories.FRUITS, icon: '🍇', subcategory: 'Exotisch', tags: ['süß', 'faserreich'] },
   { name: 'Kiwi', category: categories.FRUITS, icon: '🥝', subcategory: 'Exotisch', tags: ['süß-sauer', 'vitaminreich'] },
   { name: 'Litschi', category: categories.FRUITS, icon: '🍒', subcategory: 'Exotisch', tags: ['süß', 'fruchtig'] },
   { name: 'Passionsfrucht', category: categories.FRUITS, icon: '🥭', subcategory: 'Exotisch', tags: ['süß-sauer', 'aromatisch'] },
   { name: 'Mandarinen', category: categories.FRUITS, icon: '🍊', subcategory: 'Zitrusfrüchte', tags: ['süß', 'vitaminreich'] },
   { name: 'Datteln', category: categories.FRUITS, icon: '🍇', subcategory: 'Trockenfrüchte', tags: ['süß', 'energiereich'] },
   { name: 'Cranberries', category: categories.FRUITS, icon: '🫐', subcategory: 'Beeren', tags: ['sauer', 'antioxidativ'] },
   { name: 'Avocado', category: categories.FRUITS, icon: '🥑', subcategory: 'Exotisch', tags: ['cremig', 'gesund'] },
   { name: 'Kokosnuss', category: categories.FRUITS, icon: '🥥', subcategory: 'Exotisch', tags: ['süß', 'aromatisch'] },

    
    // Basis & Grundzutaten
   { name: 'Eier', category: categories.BASICS, icon: '🥚', tags: ['proteinreich', 'vielseitig'] },
   { name: 'Milch', category: categories.BASICS, icon: '🥛', tags: ['calcium', 'basis'] },
   { name: 'Mehl', category: categories.BASICS, icon: '🌾', tags: ['basis', 'backzutat'] },
   { name: 'Butter', category: categories.BASICS, icon: '🧈', tags: ['fettreich', 'basis'] },
   { name: 'Olivenöl', category: categories.BASICS, icon: '🫒', tags: ['gesund', 'basis'] },
   { name: 'Zucker', category: categories.BASICS, icon: '🧂', tags: ['süß', 'backzutat'] },
   { name: 'Salz', category: categories.BASICS, icon: '🧂', tags: ['würzig', 'basis'] },
   { name: 'Hefe', category: categories.BASICS, icon: '🍞', tags: ['backzutat', 'basis'] },
   { name: 'Vanillezucker', category: categories.BASICS, icon: '🧂', tags: ['süß', 'aromatisch'] },
   { name: 'Backpulver', category: categories.BASICS, icon: '⚗️', tags: ['lockernd', 'backzutat'] },
   { name: 'Schlagsahne', category: categories.BASICS, icon: '🥛', tags: ['fettreich', 'vielseitig'] },
   { name: 'Essig', category: categories.BASICS, icon: '🍶', tags: ['säuerlich', 'konservierend'] },
   { name: 'Pflanzenöl', category: categories.BASICS, icon: '🌻', tags: ['neutral', 'basis'] },
   { name: 'Honig', category: categories.BASICS, icon: '🍯', tags: ['natürlich', 'süß'] },
   { name: 'Sojasauce', category: categories.BASICS, icon: '🥢', tags: ['würzig', 'asiatisch'] },
   { name: 'Kokosmilch', category: categories.BASICS, icon: '🥥', tags: ['cremig', 'exotisch'] },
   { name: 'Speisestärke', category: categories.BASICS, icon: '🌾', tags: ['andickend', 'basis'] },
   { name: 'Tomatenmark', category: categories.BASICS, icon: '🍅', tags: ['würzig', 'vielseitig'] },
   { name: 'Senf', category: categories.BASICS, icon: '🌰', tags: ['würzig', 'aromatisch'] },
   { name: 'Brühe (Pulver)', category: categories.BASICS, icon: '🫕', tags: ['würzig', 'basis'] },
   { name: 'Parmesan', category: categories.BASICS, icon: '🧀', tags: ['herzhaft', 'italienisch'] },
   { name: 'Kakao', category: categories.BASICS, icon: '🍫', tags: ['süß', 'backzutat'] },
   { name: 'Puderzucker', category: categories.BASICS, icon: '🍚', tags: ['süß', 'verzierung'] },
   { name: 'Trockenfrüchte', category: categories.BASICS, icon: '🍇', tags: ['süß', 'snack'] },
   { name: 'Haferflocken', category: categories.BASICS, icon: '🥣', tags: ['faserreich', 'sättigend'] },
   { name: 'Paniermehl', category: categories.BASICS, icon: '🍞', tags: ['knusprig', 'basis'] },

   // Getreide & Beilagen

   { name: 'Reis', category: categories.GRAINS, icon: '🍚', tags: ['kohlenhydratreich', 'beilage'] },
   { name: 'Nudeln', category: categories.GRAINS, icon: '🍝', tags: ['kohlenhydratreich', 'basis'] },
   { name: 'Quinoa', category: categories.GRAINS, icon: '🌾', tags: ['proteinreich', 'glutenfrei'] },
   { name: 'Haferflocken', category: categories.GRAINS, icon: '🥣', tags: ['ballaststoffreich', 'frühstück'] },
   { name: 'Couscous', category: categories.GRAINS, icon: '🌾', tags: ['schnell', 'beilage'] },
   { name: 'Bulgur', category: categories.GRAINS, icon: '🌾', tags: ['ballaststoffreich', 'beilage'] },
   { name: 'Wildreis', category: categories.GRAINS, icon: '🌾', tags: ['nussig', 'glutenfrei'] },
   { name: 'Basmatireis', category: categories.GRAINS, icon: '🍚', tags: ['aromatisch', 'beilage'] },
   { name: 'Jasminreis', category: categories.GRAINS, icon: '🍚', tags: ['duftend', 'asiatisch'] },
   { name: 'Arborioreis', category: categories.GRAINS, icon: '🍚', tags: ['risotto', 'cremig'] },
   { name: 'Vollkornnudeln', category: categories.GRAINS, icon: '🍝', tags: ['ballaststoffreich', 'gesund'] },
   { name: 'Glasnudeln', category: categories.GRAINS, icon: '🍜', tags: ['asiatisch', 'leicht'] },
   { name: 'Soba-Nudeln', category: categories.GRAINS, icon: '🍜', tags: ['japanisch', 'buchweizen'] },
   { name: 'Udon-Nudeln', category: categories.GRAINS, icon: '🍜', tags: ['japanisch', 'sättigend'] },
   { name: 'Hirse', category: categories.GRAINS, icon: '🌾', tags: ['glutenfrei', 'sättigend'] },
   { name: 'Polenta', category: categories.GRAINS, icon: '🌽', tags: ['glutenfrei', 'italienisch'] },
   { name: 'Dinkel', category: categories.GRAINS, icon: '🌾', tags: ['nussig', 'ballaststoffreich'] },
   { name: 'Amaranth', category: categories.GRAINS, icon: '🌾', tags: ['proteinreich', 'glutenfrei'] },
   { name: 'Buchweizen', category: categories.GRAINS, icon: '🌾', tags: ['glutenfrei', 'erdig'] },
   { name: 'Farro', category: categories.GRAINS, icon: '🌾', tags: ['italienisch', 'nussig'] },
   { name: 'Teff', category: categories.GRAINS, icon: '🌾', tags: ['glutenfrei', 'afrikanisch'] },
   { name: 'Gerste', category: categories.GRAINS, icon: '🌾', tags: ['sättigend', 'herzhaft'] },
   { name: 'Freekeh', category: categories.GRAINS, icon: '🌾', tags: ['geröstet', 'aromatisch'] },
   { name: 'Grünkern', category: categories.GRAINS, icon: '🌾', tags: ['aromatisch', 'deftig'] },
   { name: 'Glutenfreies Brot', category: categories.GRAINS, icon: '🍞', tags: ['glutenfrei', 'sättigend'] },
   { name: 'Baguette', category: categories.GRAINS, icon: '🍞', tags: ['französisch', 'sättigend'] },
   { name: 'Tortilla', category: categories.GRAINS, icon: '🌮', tags: ['mexikanisch', 'basis'] },
   { name: 'Pita-Brot', category: categories.GRAINS, icon: '🥙', tags: ['orientalisch', 'basis'] },
   { name: 'Bagel', category: categories.GRAINS, icon: '🥯', tags: ['frühstück', 'snack'] },
   { name: 'Maisgrieß', category: categories.GRAINS, icon: '🌽', tags: ['glutenfrei', 'basis'] },
   { name: 'Cracker', category: categories.GRAINS, icon: '🍘', tags: ['knusprig', 'snack'] },
   { name: 'Reiswaffeln', category: categories.GRAINS, icon: '🍘', tags: ['leicht', 'snack'] },
   { name: 'Kartoffelgnocchi', category: categories.GRAINS, icon: '🥔', tags: ['italienisch', 'basis'] },
   { name: 'Lasagneblätter', category: categories.GRAINS, icon: '🍝', tags: ['italienisch', 'basis'] },
   { name: 'Spätzle', category: categories.GRAINS, icon: '🍝', tags: ['deutsch', 'herzhaft'] },
   { name: 'Müsli', category: categories.GRAINS, icon: '🥣', tags: ['frühstück', 'ballaststoffreich'] },
   { name: 'Cornflakes', category: categories.GRAINS, icon: '🥣', tags: ['frühstück', 'süß'] },
   { name: 'Toastbrot', category: categories.GRAINS, icon: '🍞', tags: ['basis', 'frühstück'] },
    
   // Milchprodukte
   { name: 'Käse', category: categories.DAIRY, icon: '🧀', tags: ['proteinreich', 'calcium'] },
   { name: 'Joghurt', category: categories.DAIRY, icon: '🥛', tags: ['probiotisch', 'proteinreich'] },
   { name: 'Quark', category: categories.DAIRY, icon: '🥛', tags: ['proteinreich', 'vielseitig'] },
   { name: 'Sahne', category: categories.DAIRY, icon: '🥛', tags: ['fettreich', 'sauce'] },
   { name: 'Schmand', category: categories.DAIRY, icon: '🥛', tags: ['fettreich', 'sauce'] },
   { name: 'Buttermilch', category: categories.DAIRY, icon: '🥛', tags: ['probiotisch', 'erfrischend'] },
   { name: 'Mascarpone', category: categories.DAIRY, icon: '🥛', tags: ['cremig', 'dessert'] },
   { name: 'Frischkäse', category: categories.DAIRY, icon: '🧀', tags: ['cremig', 'vielseitig'] },
   { name: 'Ricotta', category: categories.DAIRY, icon: '🧀', tags: ['italienisch', 'cremig'] },
   { name: 'Mozzarella', category: categories.DAIRY, icon: '🧀', tags: ['italienisch', 'mild'] },
   { name: 'Parmesan', category: categories.DAIRY, icon: '🧀', tags: ['italienisch', 'würzig'] },
   { name: 'Feta', category: categories.DAIRY, icon: '🧀', tags: ['salzig', 'griechisch'] },
   { name: 'Hüttenkäse', category: categories.DAIRY, icon: '🥛', tags: ['leicht', 'proteinreich'] },
   { name: 'Gorgonzola', category: categories.DAIRY, icon: '🧀', tags: ['würzig', 'italienisch'] },
   { name: 'Sauerrahm', category: categories.DAIRY, icon: '🥛', tags: ['cremig', 'basis'] },
   { name: 'Crème fraîche', category: categories.DAIRY, icon: '🥛', tags: ['französisch', 'cremig'] },
   { name: 'Ziegenkäse', category: categories.DAIRY, icon: '🧀', tags: ['aromatisch', 'vielseitig'] },
   { name: 'Burrata', category: categories.DAIRY, icon: '🧀', tags: ['aromatisch', 'vielseitig'] },
   { name: 'Kondensmilch', category: categories.DAIRY, icon: '🥛', tags: ['süß', 'backzutat'] },
   { name: 'Milchpulver', category: categories.DAIRY, icon: '🥛', tags: ['praktisch', 'backzutat'] },
   { name: 'Halbfettkäse', category: categories.DAIRY, icon: '🧀', tags: ['leicht', 'proteinreich'] },
   { name: 'Laktosefreie Milch', category: categories.DAIRY, icon: '🥛', tags: ['laktosefrei', 'basis'] },
   { name: 'Laktosefreier Joghurt', category: categories.DAIRY, icon: '🥛', tags: ['laktosefrei', 'probiotisch'] },
   { name: 'Laktosefreier Käse', category: categories.DAIRY, icon: '🧀', tags: ['laktosefrei', 'calcium'] },
   { name: 'Schlagsahne', category: categories.DAIRY, icon: '🥛', tags: ['süß', 'dessert'] },
   { name: 'Butter', category: categories.DAIRY, icon: '🧈', tags: ['fettreich', 'basis'] },
   { name: 'Ghee', category: categories.DAIRY, icon: '🧈', tags: ['geklärt', 'ayurvedisch'] },
   { name: 'Pecorino', category: categories.DAIRY, icon: '🧀', tags: ['italienisch', 'würzig'] },
   { name: 'Paneer', category: categories.DAIRY, icon: '🧀', tags: ['indisch', 'proteinreich'] },
   { name: 'Camembert', category: categories.DAIRY, icon: '🧀', tags: ['französisch', 'mild'] },
   { name: 'Brie', category: categories.DAIRY, icon: '🧀', tags: ['französisch', 'cremig'] },
   { name: 'Halloumi', category: categories.DAIRY, icon: '🧀', tags: ['zypriotisch', 'grillbar'] },
    
  // Fleisch

   { name: 'Hähnchen', category: categories.MEAT, icon: '🍗', tags: ['proteinreich', 'mager'] },
   { name: 'Rinderhack', category: categories.MEAT, icon: '🥩', tags: ['proteinreich', 'vielseitig'] },
   { name: 'Schweinefleisch', category: categories.MEAT, icon: '🥩', tags: ['proteinreich', 'deftig'] },
   { name: 'Putenbrust', category: categories.MEAT, icon: '🍗', tags: ['proteinreich', 'mager'] },
   { name: 'Speck', category: categories.MEAT, icon: '🥓', tags: ['würzig', 'fettreich'] },
   { name: 'Lammfleisch', category: categories.MEAT, icon: '🍖', tags: ['aromatisch', 'proteinreich'] },
   { name: 'Kalbfleisch', category: categories.MEAT, icon: '🥩', tags: ['zart', 'mager'] },
   { name: 'Hühnerschenkel', category: categories.MEAT, icon: '🍗', tags: ['saftig', 'proteinreich'] },
   { name: 'Entenbrust', category: categories.MEAT, icon: '🍗', tags: ['exklusiv', 'aromatisch'] },
   { name: 'Gänsefleisch', category: categories.MEAT, icon: '🍗', tags: ['festlich', 'fettreich'] },
   { name: 'Wildfleisch', category: categories.MEAT, icon: '🍖', tags: ['aromatisch', 'fettarm'] },
   { name: 'Rehfleisch', category: categories.MEAT, icon: '🍖', tags: ['edel', 'mager'] },
   { name: 'Wildschweinfleisch', category: categories.MEAT, icon: '🍖', tags: ['deftig', 'aromatisch'] },
   { name: 'Rindersteak', category: categories.MEAT, icon: '🥩', tags: ['zart', 'premium'] },
   { name: 'Filet Mignon', category: categories.MEAT, icon: '🥩', tags: ['exklusiv', 'zart'] },
   { name: 'T-Bone Steak', category: categories.MEAT, icon: '🥩', tags: ['grillen', 'premium'] },
   { name: 'Schweinebauch', category: categories.MEAT, icon: '🥩', tags: ['deftig', 'aromatisch'] },
   { name: 'Bratwurst', category: categories.MEAT, icon: '🌭', tags: ['grillen', 'deftig'] },
   { name: 'Leber', category: categories.MEAT, icon: '🍖', tags: ['eisenreich', 'deftig'] },
   { name: 'Nieren', category: categories.MEAT, icon: '🍖', tags: ['aromatisch', 'traditionell'] },
   { name: 'Salami', category: categories.MEAT, icon: '🍕', tags: ['würzig', 'snack'] },
   { name: 'Schinken', category: categories.MEAT, icon: '🥓', tags: ['mild', 'vielseitig'] },
   { name: 'Rostbraten', category: categories.MEAT, icon: '🥩', tags: ['aromatisch', 'saftig'] },
   { name: 'Hackfleisch (gemischt)', category: categories.MEAT, icon: '🥩', tags: ['vielseitig', 'deftig'] },
   { name: 'Kassler', category: categories.MEAT, icon: '🥩', tags: ['geräuchert', 'würzig'] },
   { name: 'Geflügelwurst', category: categories.MEAT, icon: '🌭', tags: ['mager', 'vielseitig'] },
   { name: 'Rippchen', category: categories.MEAT, icon: '🍖', tags: ['deftig', 'grillen'] },
   { name: 'Kaninchenfleisch', category: categories.MEAT, icon: '🍖', tags: ['zart', 'aromatisch'] },
    
 // Fisch & Meeresfrüchte

   { name: 'Lachs', category: categories.FISH, icon: '🐟', tags: ['omega-3', 'proteinreich'] },
   { name: 'Thunfisch', category: categories.FISH, icon: '🐟', tags: ['proteinreich', 'omega-3'] },
   { name: 'Garnelen', category: categories.FISH, icon: '🦐', tags: ['proteinreich', 'meeresfrüchte'] },
   { name: 'Forelle', category: categories.FISH, icon: '🐟', tags: ['proteinreich', 'omega-3'] },
   { name: 'Zander', category: categories.FISH, icon: '🐟', tags: ['mager', 'proteinreich'] },
   { name: 'Makrele', category: categories.FISH, icon: '🐟', tags: ['omega-3', 'fettreich'] },
   { name: 'Scholle', category: categories.FISH, icon: '🐟', tags: ['mager', 'proteinreich'] },
   { name: 'Heilbutt', category: categories.FISH, icon: '🐟', tags: ['mager', 'fettarm'] },
   { name: 'Hering', category: categories.FISH, icon: '🐟', tags: ['omega-3', 'salzig'] },
   { name: 'Sardinen', category: categories.FISH, icon: '🐟', tags: ['omega-3', 'fettarm'] },
   { name: 'Wels', category: categories.FISH, icon: '🐟', tags: ['mager', 'proteinreich'] },
   { name: 'Seelachs', category: categories.FISH, icon: '🐟', tags: ['mager', 'proteinreich'] },
   { name: 'Schwämme', category: categories.FISH, icon: '🦑', tags: ['meeresfrüchte', 'eiweißreich'] },
   { name: 'Tintenfisch', category: categories.FISH, icon: '🦑', tags: ['meeresfrüchte', 'proteinreich'] },
   { name: 'Austern', category: categories.FISH, icon: '🦪', tags: ['meeresfrüchte', 'edel'] },
   { name: 'Muscheln', category: categories.FISH, icon: '🦪', tags: ['meeresfrüchte', 'reichhaltig'] },
   { name: 'Lobster', category: categories.FISH, icon: '🦞', tags: ['edel', 'meeresfrüchte'] },
   { name: 'Kabeljau', category: categories.FISH, icon: '🐟', tags: ['mager', 'proteinreich'] },
   { name: 'Seezunge', category: categories.FISH, icon: '🐟', tags: ['zart', 'mager'] },
   { name: 'Barramundi', category: categories.FISH, icon: '🐟', tags: ['fettarm', 'proteinreich'] },
   { name: 'Tilapia', category: categories.FISH, icon: '🐟', tags: ['mager', 'proteinreich'] },
   { name: 'Schwertfisch', category: categories.FISH, icon: '🐟', tags: ['proteinreich', 'mager'] },

  // Gewürze

   { name: 'Pfeffer', category: categories.SPICES, icon: '🌶️', tags: ['scharf', 'basis'] },
   { name: 'Paprikapulver', category: categories.SPICES, icon: '🌶️', tags: ['würzig', 'farbe'] },
   { name: 'Curry', category: categories.SPICES, icon: '🍛', tags: ['würzig', 'exotisch'] },
   { name: 'Zimt', category: categories.SPICES, icon: '🧂', tags: ['süß', 'backgewürz'] },
   { name: 'Kurkuma', category: categories.SPICES, icon: '🧂', tags: ['würzig', 'gesund'] },
   { name: 'Ingwer', category: categories.SPICES, icon: '🧂', tags: ['scharf', 'würzig'] },
   { name: 'Muskatnuss', category: categories.SPICES, icon: '🌰', tags: ['würzig', 'süß'] },
   { name: 'Nelken', category: categories.SPICES, icon: '🌰', tags: ['scharf', 'würzig'] },
   { name: 'Kreuzkümmel', category: categories.SPICES, icon: '🧂', tags: ['exotisch', 'würzig'] },
   { name: 'Fenchelsamen', category: categories.SPICES, icon: '🌱', tags: ['aromatisch', 'süß'] },
   { name: 'Basilikum', category: categories.SPICES, icon: '🌿', tags: ['aromatisch', 'frisch'] },
   { name: 'Rosmarin', category: categories.SPICES, icon: '🌿', tags: ['aromatisch', 'würzig'] },
   { name: 'Thymian', category: categories.SPICES, icon: '🌿', tags: ['aromatisch', 'würzig'] },
   { name: 'Oregano', category: categories.SPICES, icon: '🌿', tags: ['würzig', 'mediterran'] },
   { name: 'Salbei', category: categories.SPICES, icon: '🌿', tags: ['würzig', 'aromatisch'] },
   { name: 'Lorbeerblätter', category: categories.SPICES, icon: '🍃', tags: ['aromatisch', 'würzig'] },
   { name: 'Dill', category: categories.SPICES, icon: '🌿', tags: ['frisch', 'aromatisch'] },
   { name: 'Petersilie', category: categories.SPICES, icon: '🌿', tags: ['frisch', 'aromatisch'] },
   { name: 'Koriander', category: categories.SPICES, icon: '🌿', tags: ['frisch', 'aromatisch'] },
   { name: 'Chili', category: categories.SPICES, icon: '🌶️', tags: ['scharf', 'würzig'] },
   { name: 'Saffran', category: categories.SPICES, icon: '🧂', tags: ['exotisch', 'edel'] },
   { name: 'Kardamom', category: categories.SPICES, icon: '🧂', tags: ['aromatisch', 'exotisch'] },
   { name: 'Vanille', category: categories.SPICES, icon: '🍦', tags: ['süß', 'edel'] },
   { name: 'Zitronenschale', category: categories.SPICES, icon: '🍋', tags: ['frisch', 'zitrus'] },
   { name: 'Anis', category: categories.SPICES, icon: '🌱', tags: ['süß', 'würzig'] },
   { name: 'Lorbeer', category: categories.SPICES, icon: '🍃', tags: ['würzig', 'aromatisch'] },
   { name: 'Piment', category: categories.SPICES, icon: '🌶️', tags: ['scharf', 'würzig'] },
   { name: 'Senf', category: categories.SPICES, icon: '🌰', tags: ['scharf', 'würzig'] },
   { name: 'Estragon', category: categories.SPICES, icon: '🌿', tags: ['aromatisch', 'würzig'] },
   { name: 'Kümmel', category: categories.SPICES, icon: '🌿', tags: ['würzig', 'aromatisch'] },

   // Kräuter

   { name: 'Basilikum', category: categories.HERBS, icon: '🌿', tags: ['frisch', 'mediterran'] },
   { name: 'Petersilie', category: categories.HERBS, icon: '🌿', tags: ['frisch', 'dekorativ'] },
   { name: 'Thymian', category: categories.HERBS, icon: '🌿', tags: ['würzig', 'mediterran'] },
   { name: 'Rosmarin', category: categories.HERBS, icon: '🌿', tags: ['würzig', 'mediterran'] },
   { name: 'Minze', category: categories.HERBS, icon: '🌿', tags: ['frisch', 'erfrischend'] },
   { name: 'Dill', category: categories.HERBS, icon: '🌿', tags: ['frisch', 'fisch'] },
   { name: 'Oregano', category: categories.HERBS, icon: '🌿', tags: ['würzig', 'mediterran'] },
   { name: 'Estragon', category: categories.HERBS, icon: '🌿', tags: ['aromatisch', 'frisch'] },
   { name: 'Koriander', category: categories.HERBS, icon: '🌿', tags: ['frisch', 'aromatisch'] },
   { name: 'Schnittlauch', category: categories.HERBS, icon: '🌿', tags: ['frisch', 'würzig'] },
   { name: 'Salbei', category: categories.HERBS, icon: '🌿', tags: ['würzig', 'aromatisch'] },
   { name: 'Lorbeerblätter', category: categories.HERBS, icon: '🍃', tags: ['aromatisch', 'würzig'] },
   { name: 'Bärlauch', category: categories.HERBS, icon: '🌿', tags: ['frisch', 'würzig'] },
   { name: 'Melisse', category: categories.HERBS, icon: '🌿', tags: ['frisch', 'zitrus'] },
   { name: 'Pfefferminze', category: categories.HERBS, icon: '🌿', tags: ['frisch', 'erfrischend'] },
   { name: 'Lavendel', category: categories.HERBS, icon: '🌿', tags: ['aromatisch', 'blumig'] },
   { name: 'Majoran', category: categories.HERBS, icon: '🌿', tags: ['würzig', 'mediterran'] },
   { name: 'Kräuter der Provence', category: categories.HERBS, icon: '🌿', tags: ['würzig', 'mediterran'] },
   { name: 'Tarragon', category: categories.HERBS, icon: '🌿', tags: ['würzig', 'aromatisch'] },
   { name: 'Chili', category: categories.HERBS, icon: '🌶️', tags: ['scharf', 'würzig'] },
   { name: 'Thymian Zitrone', category: categories.HERBS, icon: '🌿', tags: ['zitrusartig', 'würzig'] },
   { name: 'Fenchelgrün', category: categories.HERBS, icon: '🌿', tags: ['frisch', 'aromatisch'] },
   { name: 'Wildkräuter', category: categories.HERBS, icon: '🌿', tags: ['wild', 'aromatisch'] },
    
   // Nüsse & Samen

   { name: 'Mandeln', category: categories.NUTS, icon: '🥜', tags: ['proteinreich', 'snack'] },
   { name: 'Walnüsse', category: categories.NUTS, icon: '🌰', tags: ['omega-3', 'snack'] },
   { name: 'Cashews', category: categories.NUTS, icon: '🥜', tags: ['proteinreich', 'snack'] },
   { name: 'Kürbiskerne', category: categories.NUTS, icon: '🎃', tags: ['proteinreich', 'snack'] },
   { name: 'Sonnenblumenkerne', category: categories.NUTS, icon: '🌻', tags: ['proteinreich', 'snack'] },
   { name: 'Chiasamen', category: categories.NUTS, icon: '🌱', tags: ['omega-3', 'superfood'] },
   { name: 'Leinsamen', category: categories.NUTS, icon: '🌱', tags: ['omega-3', 'ballaststoffreich'] },
   { name: 'Haselnüsse', category: categories.NUTS, icon: '🌰', tags: ['vitaminreich', 'snack'] },
   { name: 'Pistazien', category: categories.NUTS, icon: '🌰', tags: ['proteinreich', 'snack'] },
   { name: 'Macadamianüsse', category: categories.NUTS, icon: '🌰', tags: ['fettreich', 'snack'] },
   { name: 'Paranüsse', category: categories.NUTS, icon: '🌰', tags: ['selenreich', 'snack'] },
   { name: 'Pinienkerne', category: categories.NUTS, icon: '🌰', tags: ['eisenreich', 'mediterran'] },
   { name: 'Kakaonibs', category: categories.NUTS, icon: '🍫', tags: ['antioxidantien', 'superfood'] },
   { name: 'Sesam', category: categories.NUTS, icon: '🌱', tags: ['calciumreich', 'snack'] },
   { name: 'Hanfsamen', category: categories.NUTS, icon: '🌱', tags: ['proteinreich', 'superfood'] },
   { name: 'Tigernüsse', category: categories.NUTS, icon: '🌰', tags: ['ballaststoffreich', 'snack'] },
   { name: 'Kokosraspeln', category: categories.NUTS, icon: '🥥', tags: ['fettreich', 'süß'] },
   { name: 'Hanfherzen', category: categories.NUTS, icon: '🌱', tags: ['proteinreich', 'superfood'] },
   { name: 'Baumnüsse', category: categories.NUTS, icon: '🌰', tags: ['omega-3', 'snack'] },
   { name: 'Acaibeeren', category: categories.NUTS, icon: '🍇', tags: ['superfood', 'antioxidantien'] },

    
   // Saucen & Öle

   { name: 'Sojasauce', category: categories.SAUCES, icon: '🥢', tags: ['asiatisch', 'würzig'] },
   { name: 'Balsamico', category: categories.SAUCES, icon: '🍶', tags: ['mediterran', 'säuerlich'] },
   { name: 'Tomatenmark', category: categories.SAUCES, icon: '🥫', tags: ['basis', 'würzig'] },
   { name: 'Senf', category: categories.SAUCES, icon: '🌭', tags: ['würzig', 'scharf'] },
   { name: 'Mayonnaise', category: categories.SAUCES, icon: '🥗', tags: ['fettreich', 'sauce'] },
   { name: 'Rapsöl', category: categories.SAUCES, icon: '🫙', tags: ['neutral', 'basis'] },
   { name: 'Sesamöl', category: categories.SAUCES, icon: '🫙', tags: ['asiatisch', 'würzig'] },
   { name: 'Olivenöl', category: categories.SAUCES, icon: '🫒', tags: ['gesund', 'mediterran'] },
   { name: 'Kokosöl', category: categories.SAUCES, icon: '🥥', tags: ['fettreich', 'tropisch'] },
   { name: 'Apfelessig', category: categories.SAUCES, icon: '🍏', tags: ['säuerlich', 'gesund'] },
   { name: 'Weißweinessig', category: categories.SAUCES, icon: '🍇', tags: ['säuerlich', 'mediterran'] },
   { name: 'Chilisauce', category: categories.SAUCES, icon: '🌶️', tags: ['scharf', 'asiatisch'] },
   { name: 'Barbecuesauce', category: categories.SAUCES, icon: '🍖', tags: ['süß-sauer', 'grillen'] },
   { name: 'Ketchup', category: categories.SAUCES, icon: '🍅', tags: ['süß', 'würzig'] },
   { name: 'Worcestershiresauce', category: categories.SAUCES, icon: '🍶', tags: ['würzig', 'scharf'] },
   { name: 'Pesto', category: categories.SAUCES, icon: '🌿', tags: ['mediterran', 'kräuter'] },
   { name: 'Teriyakisauce', category: categories.SAUCES, icon: '🍚', tags: ['asiatisch', 'süß-sauer'] },
   { name: 'Hoisinsauce', category: categories.SAUCES, icon: '🥡', tags: ['süß', 'asiatisch'] },
   { name: 'Creme Fraiche', category: categories.SAUCES, icon: '🥛', tags: ['fettreich', 'sauce'] },
   { name: 'Fischsauce', category: categories.SAUCES, icon: '🐟', tags: ['salzig', 'asiatisch'] },
   { name: 'Tahin', category: categories.SAUCES, icon: '🌰', tags: ['sesam', 'cremig'] },
   { name: 'Aioli', category: categories.SAUCES, icon: '🧄', tags: ['knoblauch', 'sauce'] },
   { name: 'Trüffelöl', category: categories.SAUCES, icon: '🍄', tags: ['edel', 'würzig'] },
   { name: 'Zitronensaft', category: categories.SAUCES, icon: '🍋', tags: ['sauer', 'frisch'] },
   { name: 'Limonenöl', category: categories.SAUCES, icon: '🍋', tags: ['frisch', 'mediterran'] },

   // Snacks & Süßigkeiten

   { name: 'Schokolade', category: categories.SNACKS, icon: '🍫', tags: ['süß', 'dessert'] },
   { name: 'Honig', category: categories.SNACKS, icon: '🍯', tags: ['süß', 'natürlich'] },
   { name: 'Marmelade', category: categories.SNACKS, icon: '🍯', tags: ['süß', 'frühstück'] },
   { name: 'Erdnussbutter', category: categories.SNACKS, icon: '🥜', tags: ['proteinreich', 'aufstrich'] },
   { name: 'Lutscher', category: categories.SNACKS, icon: '🍭', tags: ['süß', 'leckerei'] },
   { name: 'Kekse', category: categories.SNACKS, icon: '🍪', tags: ['süß', 'snack'] },
   { name: 'Gummibärchen', category: categories.SNACKS, icon: '🍬', tags: ['süß', 'fruchtig'] },
   { name: 'Popcorn', category: categories.SNACKS, icon: '🍿', tags: ['salzig', 'snack'] },
   { name: 'Karamell', category: categories.SNACKS, icon: '🍬', tags: ['süß', 'dessert'] },
   { name: 'Nougat', category: categories.SNACKS, icon: '🍫', tags: ['süß', 'nussig'] },
   { name: 'Gebackene Waffeln', category: categories.SNACKS, icon: '🧇', tags: ['süß', 'snack'] },
   { name: 'Marzipan', category: categories.SNACKS, icon: '🍫', tags: ['süß', 'nussig'] },
   { name: 'Fruchtgummis', category: categories.SNACKS, icon: '🍬', tags: ['süß', 'fruchtig'] },
   { name: 'Tortillas', category: categories.SNACKS, icon: '🌮', tags: ['salzig', 'snack'] },
   { name: 'Chips', category: categories.SNACKS, icon: '🍟', tags: ['salzig', 'knusprig'] },
   { name: 'Müsli-Riegel', category: categories.SNACKS, icon: '🍫', tags: ['süß', 'snack'] },
   { name: 'Nüsse', category: categories.SNACKS, icon: '🥜', tags: ['proteinreich', 'snack'] },
   { name: 'Trockenfrüchte', category: categories.SNACKS, icon: '🍇', tags: ['süß', 'gesund'] },
   { name: 'Eiscreme', category: categories.SNACKS, icon: '🍨', tags: ['süß', 'dessert'] },
   { name: 'Zuckerstangen', category: categories.SNACKS, icon: '🍭', tags: ['süß', 'festlich'] },
   { name: 'Pudding', category: categories.SNACKS, icon: '🍮', tags: ['süß', 'dessert'] },
   { name: 'Gebackene Donuts', category: categories.SNACKS, icon: '🍩', tags: ['süß', 'snack'] },

    
    // Getränke
    { name: 'Kaffee', category: categories.BEVERAGES, icon: '☕', tags: ['koffeinhaltig', 'heißgetränk'] },
    { name: 'Tee', category: categories.BEVERAGES, icon: '🫖', tags: ['heißgetränk', 'vielseitig'] },
    { name: 'Grüner Tee', category: categories.BEVERAGES, icon: '🫖', tags: ['heißgetränk', 'gesund'] },
    { name: 'Kamillentee', category: categories.BEVERAGES, icon: '🫖', tags: ['heißgetränk', 'beruhigend'] },
    { name: 'Pfefferminztee', category: categories.BEVERAGES, icon: '🫖', tags: ['heißgetränk', 'erfrischend'] },
    { name: 'Kakao', category: categories.BEVERAGES, icon: '🍫', tags: ['heißgetränk', 'süß'] },
    { name: 'Milchshake', category: categories.BEVERAGES, icon: '🥤', tags: ['kaltgetränk', 'süß'] },
    { name: 'Smoothie', category: categories.BEVERAGES, icon: '🥤', tags: ['kaltgetränk', 'gesund'] },
    { name: 'Limonade', category: categories.BEVERAGES, icon: '🥤', tags: ['kaltgetränk', 'süß'] },
    { name: 'Cola', category: categories.BEVERAGES, icon: '🥤', tags: ['kaltgetränk', 'koffeinhaltig'] },
    { name: 'Mineralwasser', category: categories.BEVERAGES, icon: '💧', tags: ['kaltgetränk', 'erfrischend'] },
    { name: 'Orangensaft', category: categories.BEVERAGES, icon: '🍊', tags: ['fruchtsaft', 'vitaminreich'] },
    { name: 'Apfelsaft', category: categories.BEVERAGES, icon: '🍎', tags: ['fruchtsaft', 'süß'] },
    { name: 'Traubensaft', category: categories.BEVERAGES, icon: '🍇', tags: ['fruchtsaft', 'süß'] },
    { name: 'Ananassaft', category: categories.BEVERAGES, icon: '🍍', tags: ['fruchtsaft', 'exotisch'] },
    { name: 'Tomatensaft', category: categories.BEVERAGES, icon: '🍅', tags: ['gemüsesaft', 'herzhaft'] },
    { name: 'Bier', category: categories.BEVERAGES, icon: '🍺', tags: ['alkoholisch', 'herzhaft'] },
    { name: 'Weißwein', category: categories.BEVERAGES, icon: '🍷', tags: ['alkoholisch', 'kochen'] },
    { name: 'Rotwein', category: categories.BEVERAGES, icon: '🍷', tags: ['alkoholisch', 'kochen'] },
    { name: 'Sekt', category: categories.BEVERAGES, icon: '🍾', tags: ['alkoholisch', 'festlich'] },
    { name: 'Rum', category: categories.BEVERAGES, icon: '🥃', tags: ['alkoholisch', 'kochen'] },
    { name: 'Cognac', category: categories.BEVERAGES, icon: '🥃', tags: ['alkoholisch', 'kochen'] },
    { name: 'Espresso', category: categories.BEVERAGES, icon: '☕', tags: ['koffeinhaltig', 'stark'] },
    { name: 'Cappuccino', category: categories.BEVERAGES, icon: '☕', tags: ['koffeinhaltig', 'milchig'] },
    { name: 'Latte Macchiato', category: categories.BEVERAGES, icon: '☕', tags: ['koffeinhaltig', 'milchig'] },
    { name: 'Eiskaffee', category: categories.BEVERAGES, icon: '🧊', tags: ['koffeinhaltig', 'süß'] },
    { name: 'Chai Latte', category: categories.BEVERAGES, icon: '🫖', tags: ['gewürzt', 'milchig'] },
    { name: 'Matcha Latte', category: categories.BEVERAGES, icon: '🫖', tags: ['grüntee', 'milchig'] },
    { name: 'Buttermilch', category: categories.BEVERAGES, icon: '🥛', tags: ['sauer', 'milchprodukt'] },
    { name: 'Kokoswasser', category: categories.BEVERAGES, icon: '🥥', tags: ['erfrischend', 'exotisch'] }
  ];
  
  // Helper functions für die Zutatenverwaltung
  export const getIngredientsByCategory = (category: string): Ingredient[] => {
    return commonIngredients.filter(ingredient => ingredient.category === category);
  };
  
  export const searchIngredients = (searchTerm: string): Ingredient[] => {
    const lowerSearchTerm = searchTerm.toLowerCase();
    return commonIngredients.filter(ingredient => 
      ingredient.name.toLowerCase().includes(lowerSearchTerm) ||
      ingredient.tags?.some(tag => tag.toLowerCase().includes(lowerSearchTerm)) ||
      ingredient.category.toLowerCase().includes(lowerSearchTerm)
    );
  };
  
  export const getIngredientsByTag = (tag: string): Ingredient[] => {
    return commonIngredients.filter(ingredient => 
      ingredient.tags?.includes(tag)
    );
  };
  
  export const getAllTags = (): string[] => {
    const tagSet = new Set<string>();
    commonIngredients.forEach(ingredient => {
      ingredient.tags?.forEach(tag => tagSet.add(tag));
    });
    return Array.from(tagSet);
  };
  
  export const getAllCategories = (): string[] => {
    return Object.values(categories);
  };
  
  export const getSuggestedIngredients = (currentIngredients: string[]): Ingredient[] => {
    // Vorschläge basierend auf häufigen Kombinationen
    const suggestions = new Set<Ingredient>();
    
    currentIngredients.forEach(current => {
      // Finde das aktuelle Zutat-Objekt
      const currentIngredient = commonIngredients.find(i => i.name === current);
      if (currentIngredient) {
        // Füge Zutaten aus der gleichen Kategorie hinzu
        commonIngredients
          .filter(i => i.category === currentIngredient.category && !currentIngredients.includes(i.name))
          .forEach(i => suggestions.add(i));
        
        // Füge Zutaten mit ähnlichen Tags hinzu
        currentIngredient.tags?.forEach(tag => {
          commonIngredients
            .filter(i => i.tags?.includes(tag) && !currentIngredients.includes(i.name))
            .forEach(i => suggestions.add(i));
        });
      }
    });
    
    return Array.from(suggestions);
  };