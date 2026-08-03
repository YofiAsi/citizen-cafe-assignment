// Vocabulary for all 23 decks, generated per plan 4b (themes and frequency
// bands in the plan's T2 table). Nikud is authoritative — preserve exactly.
// Verb citation form: present tense (m.sg.) in Foundation, infinitive from
// Flow upward (decision log #14).

export interface Pair {
  id: string; // stable per-deck id (decision #18) — never reused or renumbered
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
      { id: "red-01", hebrew: "שָׁלוֹם", english: "Hello / Peace" },
      { id: "red-02", hebrew: "תּוֹדָה", english: "Thank you" },
      { id: "red-03", hebrew: "בְּבַקָּשָׁה", english: "Please / You're welcome" },
      { id: "red-04", hebrew: "סְלִיחָה", english: "Sorry / Excuse me" },
      { id: "red-05", hebrew: "כֵּן", english: "Yes" },
      { id: "red-06", hebrew: "לֹא", english: "No" },
      { id: "red-07", hebrew: "בְּסֵדֶר", english: "Okay / Fine" },
      { id: "red-08", hebrew: "בֹּקֶר טוֹב", english: "Good morning" },
      { id: "red-09", hebrew: "לְהִתְרָאוֹת", english: "Goodbye / See you" },
      { id: "red-10", hebrew: "מַה נִּשְׁמָע", english: "How are you? / What's up?" },
    ],
  },
  {
    level: "Orange", // Numbers, days & time words
    type: null,
    pairs: [
      { id: "orange-01", hebrew: "אֶחָד", english: "One" },
      { id: "orange-02", hebrew: "שְׁנַיִם", english: "Two" },
      { id: "orange-03", hebrew: "שְׁלוֹשָׁה", english: "Three" },
      { id: "orange-04", hebrew: "יוֹם", english: "Day" },
      { id: "orange-05", hebrew: "שָׁבוּעַ", english: "Week" },
      { id: "orange-06", hebrew: "שָׁנָה", english: "Year" },
      { id: "orange-07", hebrew: "הַיּוֹם", english: "Today" },
      { id: "orange-08", hebrew: "מָחָר", english: "Tomorrow" },
      { id: "orange-09", hebrew: "אֶתְמוֹל", english: "Yesterday" },
      { id: "orange-10", hebrew: "עַכְשָׁו", english: "Now" },
    ],
  },
  {
    level: "Pink", // Family & people
    type: null,
    pairs: [
      { id: "pink-01", hebrew: "אִמָּא", english: "Mom" },
      { id: "pink-02", hebrew: "אַבָּא", english: "Dad" },
      { id: "pink-03", hebrew: "בֵּן", english: "Son / Boy" },
      { id: "pink-04", hebrew: "בַּת", english: "Daughter / Girl" },
      { id: "pink-05", hebrew: "אָח", english: "Brother" },
      { id: "pink-06", hebrew: "אָחוֹת", english: "Sister" },
      { id: "pink-07", hebrew: "מִשְׁפָּחָה", english: "Family" },
      { id: "pink-08", hebrew: "חָבֵר", english: "Friend" },
      { id: "pink-09", hebrew: "אִישׁ", english: "Man / Person" },
      { id: "pink-10", hebrew: "אִשָּׁה", english: "Woman / Wife" },
    ],
  },
  {
    level: "Yellow", // Food & drink
    type: null,
    pairs: [
      { id: "yellow-01", hebrew: "מַיִם", english: "Water" },
      { id: "yellow-02", hebrew: "לֶחֶם", english: "Bread" },
      { id: "yellow-03", hebrew: "חָלָב", english: "Milk" },
      { id: "yellow-04", hebrew: "קָפֶה", english: "Coffee" },
      { id: "yellow-05", hebrew: "תֵּה", english: "Tea" },
      { id: "yellow-06", hebrew: "פְּרִי", english: "Fruit" },
      { id: "yellow-07", hebrew: "יָרָק", english: "Vegetable" },
      { id: "yellow-08", hebrew: "בֵּיצָה", english: "Egg" },
      { id: "yellow-09", hebrew: "אוֹכֵל", english: "Eats / Eating" },
      { id: "yellow-10", hebrew: "שׁוֹתֶה", english: "Drinks / Drinking" },
    ],
  },
  // ── Flow ──────────────────────────────────────────────────────
  {
    level: "Light Blue", // Around town & directions
    type: null,
    pairs: [
      { id: "light-blue-01", hebrew: "רְחוֹב", english: "Street" },
      { id: "light-blue-02", hebrew: "עִיר", english: "City" },
      { id: "light-blue-03", hebrew: "יָמִינָה", english: "To the right" },
      { id: "light-blue-04", hebrew: "שְׂמֹאלָה", english: "To the left" },
      { id: "light-blue-05", hebrew: "יָשָׁר", english: "Straight ahead" },
      { id: "light-blue-06", hebrew: "קָרוֹב", english: "Near / Close" },
      { id: "light-blue-07", hebrew: "רָחוֹק", english: "Far" },
      { id: "light-blue-08", hebrew: "תַּחֲנָה", english: "Station / Stop" },
      { id: "light-blue-09", hebrew: "לִנְסֹעַ", english: "To travel / To ride" },
      { id: "light-blue-10", hebrew: "לְהַגִּיעַ", english: "To arrive" },
    ],
  },
  {
    level: "Blue", // Shopping & errands
    type: null,
    pairs: [
      { id: "blue-01", hebrew: "חֲנוּת", english: "Store / Shop" },
      { id: "blue-02", hebrew: "שׁוּק", english: "Market" },
      { id: "blue-03", hebrew: "כֶּסֶף", english: "Money" },
      { id: "blue-04", hebrew: "מְחִיר", english: "Price" },
      { id: "blue-05", hebrew: "זוֹל", english: "Cheap" },
      { id: "blue-06", hebrew: "יָקָר", english: "Expensive" },
      { id: "blue-07", hebrew: "לִקְנוֹת", english: "To buy" },
      { id: "blue-08", hebrew: "לִמְכֹּר", english: "To sell" },
      { id: "blue-09", hebrew: "לְשַׁלֵּם", english: "To pay" },
      { id: "blue-10", hebrew: "חֶשְׁבּוֹן", english: "Bill / Account" },
    ],
  },
  {
    level: "Lime", // Work & daily routine
    type: null,
    pairs: [
      { id: "lime-01", hebrew: "עֲבוֹדָה", english: "Work / Job" },
      { id: "lime-02", hebrew: "מִשְׂרָד", english: "Office" },
      { id: "lime-03", hebrew: "פְּגִישָׁה", english: "Meeting" },
      { id: "lime-04", hebrew: "לָקוּם", english: "To get up" },
      { id: "lime-05", hebrew: "לְהִתְקַלֵּחַ", english: "To shower" },
      { id: "lime-06", hebrew: "לְהִתְלַבֵּשׁ", english: "To get dressed" },
      { id: "lime-07", hebrew: "לְסַיֵּם", english: "To finish" },
      { id: "lime-08", hebrew: "לָנוּחַ", english: "To rest" },
      { id: "lime-09", hebrew: "עָסוּק", english: "Busy" },
      { id: "lime-10", hebrew: "הַפְסָקָה", english: "Break / Pause" },
    ],
  },
  {
    level: "Green", // Feelings & basic opinions
    type: null,
    pairs: [
      { id: "green-01", hebrew: "שָׂמֵחַ", english: "Happy / Glad" },
      { id: "green-02", hebrew: "עָצוּב", english: "Sad" },
      { id: "green-03", hebrew: "עָיֵף", english: "Tired" },
      { id: "green-04", hebrew: "עַצְבָּנִי", english: "Annoyed / Irritable" },
      { id: "green-05", hebrew: "מְרֻצֶּה", english: "Satisfied / Pleased" },
      { id: "green-06", hebrew: "לְהַרְגִּישׁ", english: "To feel" },
      { id: "green-07", hebrew: "לַחְשֹׁב", english: "To think" },
      { id: "green-08", hebrew: "דֵּעָה", english: "Opinion" },
      { id: "green-09", hebrew: "נָכוֹן", english: "Correct / True" },
      { id: "green-10", hebrew: "לְהַסְכִּים", english: "To agree" },
    ],
  },
  // ── Freedom ───────────────────────────────────────────────────
  {
    level: "Dark Green", // News & current events
    type: 1,
    pairs: [
      { id: "dark-green-1-01", hebrew: "חֲדָשׁוֹת", english: "News" },
      { id: "dark-green-1-02", hebrew: "כּוֹתֶרֶת", english: "Headline" },
      { id: "dark-green-1-03", hebrew: "כַּתָּב", english: "Reporter / Correspondent" },
      { id: "dark-green-1-04", hebrew: "מַהֲדוּרָה", english: "News broadcast / Edition" },
      { id: "dark-green-1-05", hebrew: "אֵרוּעַ", english: "Event / Incident" },
      { id: "dark-green-1-06", hebrew: "לְדַוֵּחַ", english: "To report" },
      { id: "dark-green-1-07", hebrew: "מְהֵימָן", english: "Reliable / Credible" },
      { id: "dark-green-1-08", hebrew: "סִקּוּר", english: "Coverage" },
      { id: "dark-green-1-09", hebrew: "תַּחְקִיר", english: "Investigation / Exposé" },
      { id: "dark-green-1-10", hebrew: "רֵאָיוֹן", english: "Interview" },
    ],
  },
  {
    level: "Dark Green", // Culture & arts
    type: 2,
    pairs: [
      { id: "dark-green-2-01", hebrew: "תַּעֲרוּכָה", english: "Exhibition" },
      { id: "dark-green-2-02", hebrew: "יְצִירָה", english: "Work of art / Creation" },
      { id: "dark-green-2-03", hebrew: "פֶּסֶל", english: "Sculpture / Statue" },
      { id: "dark-green-2-04", hebrew: "מַחֲזֶה", english: "Play (theatre)" },
      { id: "dark-green-2-05", hebrew: "בָּמָה", english: "Stage" },
      { id: "dark-green-2-06", hebrew: "קָהָל", english: "Audience / Crowd" },
      { id: "dark-green-2-07", hebrew: "אָמָּן", english: "Artist" },
      { id: "dark-green-2-08", hebrew: "הַשְׁרָאָה", english: "Inspiration" },
      { id: "dark-green-2-09", hebrew: "בִּקֹּרֶת", english: "Review / Criticism" },
      { id: "dark-green-2-10", hebrew: "מוֹרֶשֶׁת", english: "Heritage" },
    ],
  },
  {
    level: "Dark Green", // Nature & environment
    type: 3,
    pairs: [
      { id: "dark-green-3-01", hebrew: "סְבִיבָה", english: "Environment / Surroundings" },
      { id: "dark-green-3-02", hebrew: "זִהוּם", english: "Pollution" },
      { id: "dark-green-3-03", hebrew: "אַקְלִים", english: "Climate" },
      { id: "dark-green-3-04", hebrew: "הִתְחַמְּמוּת", english: "Warming" },
      { id: "dark-green-3-05", hebrew: "מִחְזוּר", english: "Recycling" },
      { id: "dark-green-3-06", hebrew: "קַיָּמוּת", english: "Sustainability" },
      { id: "dark-green-3-07", hebrew: "שִׁמּוּר", english: "Conservation / Preservation" },
      { id: "dark-green-3-08", hebrew: "מַשְׁאָב", english: "Resource" },
      { id: "dark-green-3-09", hebrew: "הַכְחָדָה", english: "Extinction" },
      { id: "dark-green-3-10", hebrew: "שְׁמוּרָה", english: "Nature reserve" },
    ],
  },
  {
    level: "Dark Green", // Health & body
    type: 4,
    pairs: [
      { id: "dark-green-4-01", hebrew: "תְּזוּנָה", english: "Nutrition" },
      { id: "dark-green-4-02", hebrew: "חִסּוּן", english: "Vaccine / Vaccination" },
      { id: "dark-green-4-03", hebrew: "זְרִיקָה", english: "Injection / Shot" },
      { id: "dark-green-4-04", hebrew: "דַּלֶּקֶת", english: "Inflammation / Infection" },
      { id: "dark-green-4-05", hebrew: "צַלֶּקֶת", english: "Scar" },
      { id: "dark-green-4-06", hebrew: "נִתּוּחַ", english: "Surgery / Operation" },
      { id: "dark-green-4-07", hebrew: "הַחְלָמָה", english: "Recovery" },
      { id: "dark-green-4-08", hebrew: "מִרְשָׁם", english: "Prescription" },
      { id: "dark-green-4-09", hebrew: "תַּסְמִין", english: "Symptom" },
      { id: "dark-green-4-10", hebrew: "חֹסֶן", english: "Resilience / Strength" },
    ],
  },
  {
    level: "Turquoise", // Common idioms
    type: 1,
    pairs: [
      { id: "turquoise-1-01", hebrew: "חֲבָל עַל הַזְּמַן", english: "Amazing (lit. shame about the time)" },
      { id: "turquoise-1-02", hebrew: "עַל הַפָּנִים", english: "Terrible (lit. on the face)" },
      { id: "turquoise-1-03", hebrew: "סוֹף הַדֶּרֶךְ", english: "Awesome (lit. end of the road)" },
      { id: "turquoise-1-04", hebrew: "אֵין מַצָּב", english: "No way / Not a chance" },
      { id: "turquoise-1-05", hebrew: "מַה פִּתְאוֹם", english: "No way! / What do you mean?!" },
      { id: "turquoise-1-06", hebrew: "יוֹצֵא מִן הַכְּלָל", english: "Outstanding / Exceptional" },
      { id: "turquoise-1-07", hebrew: "שָׁבַר אֶת הַכֵּלִים", english: "Quit in anger (lit. broke the dishes)" },
      { id: "turquoise-1-08", hebrew: "עָשָׂה חַיִּים", english: "Had a great time (lit. made life)" },
      { id: "turquoise-1-09", hebrew: "הַכֹּל דְּבַשׁ", english: "All good (lit. everything is honey)" },
      { id: "turquoise-1-10", hebrew: "קָטָן עָלַי", english: "Easy for me (lit. small on me)" },
    ],
  },
  {
    level: "Turquoise", // Slang & street Hebrew
    type: 2,
    pairs: [
      { id: "turquoise-2-01", hebrew: "סַבָּבָה", english: "Cool / Alright" },
      { id: "turquoise-2-02", hebrew: "אַחְלָה", english: "Great / Awesome" },
      { id: "turquoise-2-03", hebrew: "וַאלְלָה", english: "Wow / Really?!" },
      { id: "turquoise-2-04", hebrew: "יַאלְלָה", english: "Come on / Let's go" },
      { id: "turquoise-2-05", hebrew: "בָּלָגָן", english: "Mess / Chaos" },
      { id: "turquoise-2-06", hebrew: "פַשְׁלָה", english: "Screw-up / Blunder" },
      { id: "turquoise-2-07", hebrew: "בַּאסָה", english: "Bummer / Downer" },
      { id: "turquoise-2-08", hebrew: "מַגְנִיב", english: "Cool / Neat" },
      { id: "turquoise-2-09", hebrew: "לְהִתְחַרְפֵן", english: "To go crazy / Freak out" },
      { id: "turquoise-2-10", hebrew: "לַחְפֹּר", english: "To blab on and on (slang)" },
    ],
  },
  {
    level: "Turquoise", // Nuanced emotions & relationships
    type: 3,
    pairs: [
      { id: "turquoise-3-01", hebrew: "גַּעְגּוּעַ", english: "Longing / Missing someone" },
      { id: "turquoise-3-02", hebrew: "קִנְאָה", english: "Jealousy / Envy" },
      { id: "turquoise-3-03", hebrew: "אַכְזָבָה", english: "Disappointment" },
      { id: "turquoise-3-04", hebrew: "הַעֲרָצָה", english: "Admiration" },
      { id: "turquoise-3-05", hebrew: "חֶמְלָה", english: "Compassion" },
      { id: "turquoise-3-06", hebrew: "טִינָה", english: "Grudge / Resentment" },
      { id: "turquoise-3-07", hebrew: "מְחֻיָּבוּת", english: "Commitment" },
      { id: "turquoise-3-08", hebrew: "אֵמוּן", english: "Trust" },
      { id: "turquoise-3-09", hebrew: "לְהִשְׁתּוֹקֵק", english: "To yearn / Crave" },
      { id: "turquoise-3-10", hebrew: "לְהִתְפַּיֵּס", english: "To reconcile / Make up" },
    ],
  },
  {
    level: "Turquoise", // Proverbs & sayings
    type: 4,
    pairs: [
      { id: "turquoise-4-01", hebrew: "אֵין עָשָׁן בְּלִי אֵשׁ", english: "No smoke without fire" },
      { id: "turquoise-4-02", hebrew: "סוֹף טוֹב הַכֹּל טוֹב", english: "All's well that ends well" },
      { id: "turquoise-4-03", hebrew: "תָּפַסְתָּ מְרֻבֶּה לֹא תָּפַסְתָּ", english: "Grasp too much, hold nothing" },
      { id: "turquoise-4-04", hebrew: "אַל תִּסְתַּכֵּל בַּקַּנְקַן", english: "Don't judge by appearances" },
      { id: "turquoise-4-05", hebrew: "מַיִם שְׁקֵטִים חוֹדְרִים עָמֹק", english: "Still waters run deep" },
      { id: "turquoise-4-06", hebrew: "כָּל הַהַתְחָלוֹת קָשׁוֹת", english: "All beginnings are hard" },
      { id: "turquoise-4-07", hebrew: "הַמַּטָּרָה מְקַדֶּשֶׁת אֶת הָאֶמְצָעִים", english: "The end justifies the means" },
      { id: "turquoise-4-08", hebrew: "טוֹב שֵׁם מִשֶּׁמֶן טוֹב", english: "A good name is better than fine oil" },
      { id: "turquoise-4-09", hebrew: "אֵין חָכָם כְּבַעַל נִסָּיוֹן", english: "Experience is the best teacher" },
      { id: "turquoise-4-10", hebrew: "מִצְוָה גּוֹרֶרֶת מִצְוָה", english: "One good deed leads to another" },
    ],
  },
  {
    level: "Indigo", // Business & economy
    type: 1,
    pairs: [
      { id: "indigo-1-01", hebrew: "מַשְׂכֹּרֶת", english: "Salary" },
      { id: "indigo-1-02", hebrew: "רֶוַח", english: "Profit" },
      { id: "indigo-1-03", hebrew: "הֶפְסֵד", english: "Loss" },
      { id: "indigo-1-04", hebrew: "הַשְׁקָעָה", english: "Investment" },
      { id: "indigo-1-05", hebrew: "מַשְׁקִיעַ", english: "Investor" },
      { id: "indigo-1-06", hebrew: "תַּקְצִיב", english: "Budget" },
      { id: "indigo-1-07", hebrew: "מַס", english: "Tax" },
      { id: "indigo-1-08", hebrew: "אִינְפְלַצְיָה", english: "Inflation" },
      { id: "indigo-1-09", hebrew: "מַשָּׂא וּמַתָּן", english: "Negotiation" },
      { id: "indigo-1-10", hebrew: "יַזָּם", english: "Entrepreneur" },
    ],
  },
  {
    level: "Indigo", // Politics & society
    type: 2,
    pairs: [
      { id: "indigo-2-01", hebrew: "מֶמְשָׁלָה", english: "Government" },
      { id: "indigo-2-02", hebrew: "בְּחִירוֹת", english: "Elections" },
      { id: "indigo-2-03", hebrew: "מִפְלָגָה", english: "Political party" },
      { id: "indigo-2-04", hebrew: "הַפְגָּנָה", english: "Demonstration / Protest" },
      { id: "indigo-2-05", hebrew: "אֶזְרָח", english: "Citizen" },
      { id: "indigo-2-06", hebrew: "שִׁוְיוֹן", english: "Equality" },
      { id: "indigo-2-07", hebrew: "צֶדֶק", english: "Justice" },
      { id: "indigo-2-08", hebrew: "דֶּמוֹקְרַטְיָה", english: "Democracy" },
      { id: "indigo-2-09", hebrew: "דַּעַת קָהָל", english: "Public opinion" },
      { id: "indigo-2-10", hebrew: "נָצִיג", english: "Representative" },
    ],
  },
  {
    level: "Indigo", // Science & technology
    type: 3,
    pairs: [
      { id: "indigo-3-01", hebrew: "מַדָּע", english: "Science" },
      { id: "indigo-3-02", hebrew: "מֶחְקָר", english: "Research" },
      { id: "indigo-3-03", hebrew: "נִסּוּי", english: "Experiment" },
      { id: "indigo-3-04", hebrew: "תַּגְלִית", english: "Discovery" },
      { id: "indigo-3-05", hebrew: "הַמְצָאָה", english: "Invention" },
      { id: "indigo-3-06", hebrew: "בִּינָה מְלָאכוּתִית", english: "Artificial intelligence" },
      { id: "indigo-3-07", hebrew: "נְתוּנִים", english: "Data" },
      { id: "indigo-3-08", hebrew: "מַעְבָּדָה", english: "Laboratory" },
      { id: "indigo-3-09", hebrew: "חָלָל", english: "Space / Outer space" },
      { id: "indigo-3-10", hebrew: "פִּתּוּחַ", english: "Development" },
    ],
  },
  {
    level: "Indigo", // Formal & literary register
    type: 4,
    pairs: [
      { id: "indigo-4-01", hebrew: "בְּרַם", english: "However (literary)" },
      { id: "indigo-4-02", hebrew: "לְפִיכָךְ", english: "Therefore / Hence" },
      { id: "indigo-4-03", hebrew: "אַף עַל פִּי כֵן", english: "Nevertheless" },
      { id: "indigo-4-04", hebrew: "לְהַלָּן", english: "Below / As follows (formal)" },
      { id: "indigo-4-05", hebrew: "גְּרֵידָא", english: "Merely / Purely (literary)" },
      { id: "indigo-4-06", hebrew: "כְּלוֹמַר", english: "That is to say / Namely" },
      { id: "indigo-4-07", hebrew: "אֵפוֹא", english: "Then / Accordingly (literary)" },
      { id: "indigo-4-08", hebrew: "בְּטֶרֶם", english: "Before / Prior to (formal)" },
      { id: "indigo-4-09", hebrew: "לִכְאוֹרָה", english: "Ostensibly / Seemingly" },
      { id: "indigo-4-10", hebrew: "בִּבְחִינַת", english: "In the sense of / As" },
    ],
  },
  {
    level: "Indigo", // Law & bureaucracy
    type: 5,
    pairs: [
      { id: "indigo-5-01", hebrew: "חֹק", english: "Law" },
      { id: "indigo-5-02", hebrew: "תַּקָּנָה", english: "Regulation" },
      { id: "indigo-5-03", hebrew: "חוֹזֶה", english: "Contract" },
      { id: "indigo-5-04", hebrew: "תְּבִיעָה", english: "Lawsuit / Claim" },
      { id: "indigo-5-05", hebrew: "פְּסַק דִּין", english: "Verdict / Ruling" },
      { id: "indigo-5-06", hebrew: "עִרְעוּר", english: "Appeal" },
      { id: "indigo-5-07", hebrew: "אִשּׁוּר", english: "Approval / Permit" },
      { id: "indigo-5-08", hebrew: "טֹפֶס", english: "Form (document)" },
      { id: "indigo-5-09", hebrew: "נֹהַל", english: "Procedure / Protocol" },
      { id: "indigo-5-10", hebrew: "יִפּוּי כֹּחַ", english: "Power of attorney" },
    ],
  },
  {
    level: "Indigo", // Philosophy & abstract thought
    type: 6,
    pairs: [
      { id: "indigo-6-01", hebrew: "הַכָּרָה", english: "Recognition / Cognition" },
      { id: "indigo-6-02", hebrew: "מַהוּת", english: "Essence" },
      { id: "indigo-6-03", hebrew: "תּוֹדָעָה", english: "Consciousness" },
      { id: "indigo-6-04", hebrew: "מוּסָר", english: "Morality / Ethics" },
      { id: "indigo-6-05", hebrew: "הִגָּיוֹן", english: "Logic" },
      { id: "indigo-6-06", hebrew: "תַּכְלִית", english: "Purpose / Ultimate aim" },
      { id: "indigo-6-07", hebrew: "סְבָרָה", english: "Hypothesis / Supposition" },
      { id: "indigo-6-08", hebrew: "הַנָּחָה", english: "Assumption / Premise" },
      { id: "indigo-6-09", hebrew: "בְּחִירָה חָפְשִׁית", english: "Free will" },
      { id: "indigo-6-10", hebrew: "סַפְקָנוּת", english: "Skepticism" },
    ],
  },
  {
    level: "Purple", // Mastery capstone: rare, high-register & literary words
    type: null,
    pairs: [
      { id: "purple-01", hebrew: "עַגְמוּמִי", english: "Gloomy / Melancholy" },
      { id: "purple-02", hebrew: "נַהֲפוֹךְ הוּא", english: "On the contrary" },
      { id: "purple-03", hebrew: "כְּמִיהָה", english: "Yearning (high register)" },
      { id: "purple-04", hebrew: "תַּעְתּוּעַ", english: "Illusion / Deception" },
      { id: "purple-05", hebrew: "הָגִיג", english: "Musing / Fleeting thought" },
      { id: "purple-06", hebrew: "סַגְרִיר", english: "Dreary, rainy weather" },
      { id: "purple-07", hebrew: "עֶלֶם", english: "Young man (literary)" },
      { id: "purple-08", hebrew: "נְהָרָה", english: "Radiance / Glow" },
      { id: "purple-09", hebrew: "לִסְגֹּד", english: "To worship / Adore" },
      { id: "purple-10", hebrew: "תְּכֵלֶת", english: "Azure / Sky-blue (poetic)" },
    ],
  },
];
