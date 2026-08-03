// Vocabulary for all 23 decks, generated per plan 4b (themes and frequency
// bands in the plan's T2 table). Nikud is authoritative — preserve exactly.
// Verb citation form: present tense (m.sg.) in Foundation, infinitive from
// Flow upward (decision log #14).

export interface Pair {
  hebrew: string;
  english: string;
}

export interface DeckContent {
  level: string;
  type: number | null;
  pairs: Pair[];
}

export const content: DeckContent[] = [
  // ── Foundation ────────────────────────────────────────────────
  {
    level: "Red", // Greetings, courtesy & basic responses
    type: null,
    pairs: [
      { hebrew: "שָׁלוֹם", english: "Hello / Peace" },
      { hebrew: "תּוֹדָה", english: "Thank you" },
      { hebrew: "בְּבַקָּשָׁה", english: "Please / You're welcome" },
      { hebrew: "סְלִיחָה", english: "Sorry / Excuse me" },
      { hebrew: "כֵּן", english: "Yes" },
      { hebrew: "לֹא", english: "No" },
      { hebrew: "בְּסֵדֶר", english: "Okay / Fine" },
      { hebrew: "בֹּקֶר טוֹב", english: "Good morning" },
      { hebrew: "לְהִתְרָאוֹת", english: "Goodbye / See you" },
      { hebrew: "מַה נִּשְׁמָע", english: "How are you? / What's up?" },
    ],
  },
  {
    level: "Orange", // Numbers, days & time words
    type: null,
    pairs: [
      { hebrew: "אֶחָד", english: "One" },
      { hebrew: "שְׁנַיִם", english: "Two" },
      { hebrew: "שְׁלוֹשָׁה", english: "Three" },
      { hebrew: "יוֹם", english: "Day" },
      { hebrew: "שָׁבוּעַ", english: "Week" },
      { hebrew: "שָׁנָה", english: "Year" },
      { hebrew: "הַיּוֹם", english: "Today" },
      { hebrew: "מָחָר", english: "Tomorrow" },
      { hebrew: "אֶתְמוֹל", english: "Yesterday" },
      { hebrew: "עַכְשָׁו", english: "Now" },
    ],
  },
  {
    level: "Pink", // Family & people
    type: null,
    pairs: [
      { hebrew: "אִמָּא", english: "Mom" },
      { hebrew: "אַבָּא", english: "Dad" },
      { hebrew: "בֵּן", english: "Son / Boy" },
      { hebrew: "בַּת", english: "Daughter / Girl" },
      { hebrew: "אָח", english: "Brother" },
      { hebrew: "אָחוֹת", english: "Sister" },
      { hebrew: "מִשְׁפָּחָה", english: "Family" },
      { hebrew: "חָבֵר", english: "Friend" },
      { hebrew: "אִישׁ", english: "Man / Person" },
      { hebrew: "אִשָּׁה", english: "Woman / Wife" },
    ],
  },
  {
    level: "Yellow", // Food & drink
    type: null,
    pairs: [
      { hebrew: "מַיִם", english: "Water" },
      { hebrew: "לֶחֶם", english: "Bread" },
      { hebrew: "חָלָב", english: "Milk" },
      { hebrew: "קָפֶה", english: "Coffee" },
      { hebrew: "תֵּה", english: "Tea" },
      { hebrew: "פְּרִי", english: "Fruit" },
      { hebrew: "יָרָק", english: "Vegetable" },
      { hebrew: "בֵּיצָה", english: "Egg" },
      { hebrew: "אוֹכֵל", english: "Eats / Eating" },
      { hebrew: "שׁוֹתֶה", english: "Drinks / Drinking" },
    ],
  },
  // ── Flow ──────────────────────────────────────────────────────
  {
    level: "Light Blue", // Around town & directions
    type: null,
    pairs: [
      { hebrew: "רְחוֹב", english: "Street" },
      { hebrew: "עִיר", english: "City" },
      { hebrew: "יָמִינָה", english: "To the right" },
      { hebrew: "שְׂמֹאלָה", english: "To the left" },
      { hebrew: "יָשָׁר", english: "Straight ahead" },
      { hebrew: "קָרוֹב", english: "Near / Close" },
      { hebrew: "רָחוֹק", english: "Far" },
      { hebrew: "תַּחֲנָה", english: "Station / Stop" },
      { hebrew: "לִנְסֹעַ", english: "To travel / To ride" },
      { hebrew: "לְהַגִּיעַ", english: "To arrive" },
    ],
  },
  {
    level: "Blue", // Shopping & errands
    type: null,
    pairs: [
      { hebrew: "חֲנוּת", english: "Store / Shop" },
      { hebrew: "שׁוּק", english: "Market" },
      { hebrew: "כֶּסֶף", english: "Money" },
      { hebrew: "מְחִיר", english: "Price" },
      { hebrew: "זוֹל", english: "Cheap" },
      { hebrew: "יָקָר", english: "Expensive" },
      { hebrew: "לִקְנוֹת", english: "To buy" },
      { hebrew: "לִמְכֹּר", english: "To sell" },
      { hebrew: "לְשַׁלֵּם", english: "To pay" },
      { hebrew: "חֶשְׁבּוֹן", english: "Bill / Account" },
    ],
  },
  {
    level: "Lime", // Work & daily routine
    type: null,
    pairs: [
      { hebrew: "עֲבוֹדָה", english: "Work / Job" },
      { hebrew: "מִשְׂרָד", english: "Office" },
      { hebrew: "פְּגִישָׁה", english: "Meeting" },
      { hebrew: "לָקוּם", english: "To get up" },
      { hebrew: "לְהִתְקַלֵּחַ", english: "To shower" },
      { hebrew: "לְהִתְלַבֵּשׁ", english: "To get dressed" },
      { hebrew: "לְסַיֵּם", english: "To finish" },
      { hebrew: "לָנוּחַ", english: "To rest" },
      { hebrew: "עָסוּק", english: "Busy" },
      { hebrew: "הַפְסָקָה", english: "Break / Pause" },
    ],
  },
  {
    level: "Green", // Feelings & basic opinions
    type: null,
    pairs: [
      { hebrew: "שָׂמֵחַ", english: "Happy / Glad" },
      { hebrew: "עָצוּב", english: "Sad" },
      { hebrew: "עָיֵף", english: "Tired" },
      { hebrew: "עַצְבָּנִי", english: "Annoyed / Irritable" },
      { hebrew: "מְרֻצֶּה", english: "Satisfied / Pleased" },
      { hebrew: "לְהַרְגִּישׁ", english: "To feel" },
      { hebrew: "לַחְשֹׁב", english: "To think" },
      { hebrew: "דֵּעָה", english: "Opinion" },
      { hebrew: "נָכוֹן", english: "Correct / True" },
      { hebrew: "לְהַסְכִּים", english: "To agree" },
    ],
  },
  // ── Freedom ───────────────────────────────────────────────────
  {
    level: "Dark Green", // News & current events
    type: 1,
    pairs: [
      { hebrew: "חֲדָשׁוֹת", english: "News" },
      { hebrew: "כּוֹתֶרֶת", english: "Headline" },
      { hebrew: "כַּתָּב", english: "Reporter / Correspondent" },
      { hebrew: "מַהֲדוּרָה", english: "News broadcast / Edition" },
      { hebrew: "אֵרוּעַ", english: "Event / Incident" },
      { hebrew: "לְדַוֵּחַ", english: "To report" },
      { hebrew: "מְהֵימָן", english: "Reliable / Credible" },
      { hebrew: "סִקּוּר", english: "Coverage" },
      { hebrew: "תַּחְקִיר", english: "Investigation / Exposé" },
      { hebrew: "רֵאָיוֹן", english: "Interview" },
    ],
  },
  {
    level: "Dark Green", // Culture & arts
    type: 2,
    pairs: [
      { hebrew: "תַּעֲרוּכָה", english: "Exhibition" },
      { hebrew: "יְצִירָה", english: "Work of art / Creation" },
      { hebrew: "פֶּסֶל", english: "Sculpture / Statue" },
      { hebrew: "מַחֲזֶה", english: "Play (theatre)" },
      { hebrew: "בָּמָה", english: "Stage" },
      { hebrew: "קָהָל", english: "Audience / Crowd" },
      { hebrew: "אָמָּן", english: "Artist" },
      { hebrew: "הַשְׁרָאָה", english: "Inspiration" },
      { hebrew: "בִּקֹּרֶת", english: "Review / Criticism" },
      { hebrew: "מוֹרֶשֶׁת", english: "Heritage" },
    ],
  },
  {
    level: "Dark Green", // Nature & environment
    type: 3,
    pairs: [
      { hebrew: "סְבִיבָה", english: "Environment / Surroundings" },
      { hebrew: "זִהוּם", english: "Pollution" },
      { hebrew: "אַקְלִים", english: "Climate" },
      { hebrew: "הִתְחַמְּמוּת", english: "Warming" },
      { hebrew: "מִחְזוּר", english: "Recycling" },
      { hebrew: "קַיָּמוּת", english: "Sustainability" },
      { hebrew: "שִׁמּוּר", english: "Conservation / Preservation" },
      { hebrew: "מַשְׁאָב", english: "Resource" },
      { hebrew: "הַכְחָדָה", english: "Extinction" },
      { hebrew: "שְׁמוּרָה", english: "Nature reserve" },
    ],
  },
  {
    level: "Dark Green", // Health & body
    type: 4,
    pairs: [
      { hebrew: "תְּזוּנָה", english: "Nutrition" },
      { hebrew: "חִסּוּן", english: "Vaccine / Vaccination" },
      { hebrew: "זְרִיקָה", english: "Injection / Shot" },
      { hebrew: "דַּלֶּקֶת", english: "Inflammation / Infection" },
      { hebrew: "צַלֶּקֶת", english: "Scar" },
      { hebrew: "נִתּוּחַ", english: "Surgery / Operation" },
      { hebrew: "הַחְלָמָה", english: "Recovery" },
      { hebrew: "מִרְשָׁם", english: "Prescription" },
      { hebrew: "תַּסְמִין", english: "Symptom" },
      { hebrew: "חֹסֶן", english: "Resilience / Strength" },
    ],
  },
  {
    level: "Turquoise", // Common idioms
    type: 1,
    pairs: [
      { hebrew: "חֲבָל עַל הַזְּמַן", english: "Amazing (lit. shame about the time)" },
      { hebrew: "עַל הַפָּנִים", english: "Terrible (lit. on the face)" },
      { hebrew: "סוֹף הַדֶּרֶךְ", english: "Awesome (lit. end of the road)" },
      { hebrew: "אֵין מַצָּב", english: "No way / Not a chance" },
      { hebrew: "מַה פִּתְאוֹם", english: "No way! / What do you mean?!" },
      { hebrew: "יוֹצֵא מִן הַכְּלָל", english: "Outstanding / Exceptional" },
      { hebrew: "שָׁבַר אֶת הַכֵּלִים", english: "Quit in anger (lit. broke the dishes)" },
      { hebrew: "עָשָׂה חַיִּים", english: "Had a great time (lit. made life)" },
      { hebrew: "הַכֹּל דְּבַשׁ", english: "All good (lit. everything is honey)" },
      { hebrew: "קָטָן עָלַי", english: "Easy for me (lit. small on me)" },
    ],
  },
  {
    level: "Turquoise", // Slang & street Hebrew
    type: 2,
    pairs: [
      { hebrew: "סַבָּבָה", english: "Cool / Alright" },
      { hebrew: "אַחְלָה", english: "Great / Awesome" },
      { hebrew: "וַאלְלָה", english: "Wow / Really?!" },
      { hebrew: "יַאלְלָה", english: "Come on / Let's go" },
      { hebrew: "בָּלָגָן", english: "Mess / Chaos" },
      { hebrew: "פַשְׁלָה", english: "Screw-up / Blunder" },
      { hebrew: "בַּאסָה", english: "Bummer / Downer" },
      { hebrew: "מַגְנִיב", english: "Cool / Neat" },
      { hebrew: "לְהִתְחַרְפֵן", english: "To go crazy / Freak out" },
      { hebrew: "לַחְפֹּר", english: "To blab on and on (slang)" },
    ],
  },
  {
    level: "Turquoise", // Nuanced emotions & relationships
    type: 3,
    pairs: [
      { hebrew: "גַּעְגּוּעַ", english: "Longing / Missing someone" },
      { hebrew: "קִנְאָה", english: "Jealousy / Envy" },
      { hebrew: "אַכְזָבָה", english: "Disappointment" },
      { hebrew: "הַעֲרָצָה", english: "Admiration" },
      { hebrew: "חֶמְלָה", english: "Compassion" },
      { hebrew: "טִינָה", english: "Grudge / Resentment" },
      { hebrew: "מְחֻיָּבוּת", english: "Commitment" },
      { hebrew: "אֵמוּן", english: "Trust" },
      { hebrew: "לְהִשְׁתּוֹקֵק", english: "To yearn / Crave" },
      { hebrew: "לְהִתְפַּיֵּס", english: "To reconcile / Make up" },
    ],
  },
  {
    level: "Turquoise", // Proverbs & sayings
    type: 4,
    pairs: [
      { hebrew: "אֵין עָשָׁן בְּלִי אֵשׁ", english: "No smoke without fire" },
      { hebrew: "סוֹף טוֹב הַכֹּל טוֹב", english: "All's well that ends well" },
      { hebrew: "תָּפַסְתָּ מְרֻבֶּה לֹא תָּפַסְתָּ", english: "Grasp too much, hold nothing" },
      { hebrew: "אַל תִּסְתַּכֵּל בַּקַּנְקַן", english: "Don't judge by appearances" },
      { hebrew: "מַיִם שְׁקֵטִים חוֹדְרִים עָמֹק", english: "Still waters run deep" },
      { hebrew: "כָּל הַהַתְחָלוֹת קָשׁוֹת", english: "All beginnings are hard" },
      { hebrew: "הַמַּטָּרָה מְקַדֶּשֶׁת אֶת הָאֶמְצָעִים", english: "The end justifies the means" },
      { hebrew: "טוֹב שֵׁם מִשֶּׁמֶן טוֹב", english: "A good name is better than fine oil" },
      { hebrew: "אֵין חָכָם כְּבַעַל נִסָּיוֹן", english: "Experience is the best teacher" },
      { hebrew: "מִצְוָה גּוֹרֶרֶת מִצְוָה", english: "One good deed leads to another" },
    ],
  },
  {
    level: "Indigo", // Business & economy
    type: 1,
    pairs: [
      { hebrew: "מַשְׂכֹּרֶת", english: "Salary" },
      { hebrew: "רֶוַח", english: "Profit" },
      { hebrew: "הֶפְסֵד", english: "Loss" },
      { hebrew: "הַשְׁקָעָה", english: "Investment" },
      { hebrew: "מַשְׁקִיעַ", english: "Investor" },
      { hebrew: "תַּקְצִיב", english: "Budget" },
      { hebrew: "מַס", english: "Tax" },
      { hebrew: "אִינְפְלַצְיָה", english: "Inflation" },
      { hebrew: "מַשָּׂא וּמַתָּן", english: "Negotiation" },
      { hebrew: "יַזָּם", english: "Entrepreneur" },
    ],
  },
  {
    level: "Indigo", // Politics & society
    type: 2,
    pairs: [
      { hebrew: "מֶמְשָׁלָה", english: "Government" },
      { hebrew: "בְּחִירוֹת", english: "Elections" },
      { hebrew: "מִפְלָגָה", english: "Political party" },
      { hebrew: "הַפְגָּנָה", english: "Demonstration / Protest" },
      { hebrew: "אֶזְרָח", english: "Citizen" },
      { hebrew: "שִׁוְיוֹן", english: "Equality" },
      { hebrew: "צֶדֶק", english: "Justice" },
      { hebrew: "דֶּמוֹקְרַטְיָה", english: "Democracy" },
      { hebrew: "דַּעַת קָהָל", english: "Public opinion" },
      { hebrew: "נָצִיג", english: "Representative" },
    ],
  },
  {
    level: "Indigo", // Science & technology
    type: 3,
    pairs: [
      { hebrew: "מַדָּע", english: "Science" },
      { hebrew: "מֶחְקָר", english: "Research" },
      { hebrew: "נִסּוּי", english: "Experiment" },
      { hebrew: "תַּגְלִית", english: "Discovery" },
      { hebrew: "הַמְצָאָה", english: "Invention" },
      { hebrew: "בִּינָה מְלָאכוּתִית", english: "Artificial intelligence" },
      { hebrew: "נְתוּנִים", english: "Data" },
      { hebrew: "מַעְבָּדָה", english: "Laboratory" },
      { hebrew: "חָלָל", english: "Space / Outer space" },
      { hebrew: "פִּתּוּחַ", english: "Development" },
    ],
  },
  {
    level: "Indigo", // Formal & literary register
    type: 4,
    pairs: [
      { hebrew: "בְּרַם", english: "However (literary)" },
      { hebrew: "לְפִיכָךְ", english: "Therefore / Hence" },
      { hebrew: "אַף עַל פִּי כֵן", english: "Nevertheless" },
      { hebrew: "לְהַלָּן", english: "Below / As follows (formal)" },
      { hebrew: "גְּרֵידָא", english: "Merely / Purely (literary)" },
      { hebrew: "כְּלוֹמַר", english: "That is to say / Namely" },
      { hebrew: "אֵפוֹא", english: "Then / Accordingly (literary)" },
      { hebrew: "בְּטֶרֶם", english: "Before / Prior to (formal)" },
      { hebrew: "לִכְאוֹרָה", english: "Ostensibly / Seemingly" },
      { hebrew: "בִּבְחִינַת", english: "In the sense of / As" },
    ],
  },
  {
    level: "Indigo", // Law & bureaucracy
    type: 5,
    pairs: [
      { hebrew: "חֹק", english: "Law" },
      { hebrew: "תַּקָּנָה", english: "Regulation" },
      { hebrew: "חוֹזֶה", english: "Contract" },
      { hebrew: "תְּבִיעָה", english: "Lawsuit / Claim" },
      { hebrew: "פְּסַק דִּין", english: "Verdict / Ruling" },
      { hebrew: "עִרְעוּר", english: "Appeal" },
      { hebrew: "אִשּׁוּר", english: "Approval / Permit" },
      { hebrew: "טֹפֶס", english: "Form (document)" },
      { hebrew: "נֹהַל", english: "Procedure / Protocol" },
      { hebrew: "יִפּוּי כֹּחַ", english: "Power of attorney" },
    ],
  },
  {
    level: "Indigo", // Philosophy & abstract thought
    type: 6,
    pairs: [
      { hebrew: "הַכָּרָה", english: "Recognition / Cognition" },
      { hebrew: "מַהוּת", english: "Essence" },
      { hebrew: "תּוֹדָעָה", english: "Consciousness" },
      { hebrew: "מוּסָר", english: "Morality / Ethics" },
      { hebrew: "הִגָּיוֹן", english: "Logic" },
      { hebrew: "תַּכְלִית", english: "Purpose / Ultimate aim" },
      { hebrew: "סְבָרָה", english: "Hypothesis / Supposition" },
      { hebrew: "הַנָּחָה", english: "Assumption / Premise" },
      { hebrew: "בְּחִירָה חָפְשִׁית", english: "Free will" },
      { hebrew: "סַפְקָנוּת", english: "Skepticism" },
    ],
  },
  {
    level: "Purple", // Mastery capstone: rare, high-register & literary words
    type: null,
    pairs: [
      { hebrew: "עַגְמוּמִי", english: "Gloomy / Melancholy" },
      { hebrew: "נַהֲפוֹךְ הוּא", english: "On the contrary" },
      { hebrew: "כְּמִיהָה", english: "Yearning (high register)" },
      { hebrew: "תַּעְתּוּעַ", english: "Illusion / Deception" },
      { hebrew: "הָגִיג", english: "Musing / Fleeting thought" },
      { hebrew: "סַגְרִיר", english: "Dreary, rainy weather" },
      { hebrew: "עֶלֶם", english: "Young man (literary)" },
      { hebrew: "נְהָרָה", english: "Radiance / Glow" },
      { hebrew: "לִסְגֹּד", english: "To worship / Adore" },
      { hebrew: "תְּכֵלֶת", english: "Azure / Sky-blue (poetic)" },
    ],
  },
];
