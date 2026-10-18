const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/data/pilgrims.ts');
let content = fs.readFileSync(filePath, 'utf8');

// Fix unescaped single quotes within single-quoted string literals
content = content.replace(/'Chicago O'Hare \(ORD\)'/g, `"Chicago O'Hare (ORD)"`);
content = content.replace(/'Nice Côte d'Azur \(NCE\)'/g, `"Nice Côte d'Azur (NCE)"`);
content = content.replace(/'Nice-Côte d'Azur \(NCE\)'/g, `"Nice-Côte d'Azur (NCE)"`);
content = content.replace(/'Voyagez en toute sérénité pour votre Omra au départ de Paris \(CDG\), Lyon et Marseille\. Accueil personnalisé à l'aéroport de Djeddah et transfert direct vers votre hôtel à La Mecque ou Médine à tarif fixe garanti\.'/g,
  `"Voyagez en toute sérénité pour votre Omra au départ de Paris (CDG), Lyon et Marseille. Accueil personnalisé à l'aéroport de Djeddah et transfert direct vers votre hôtel à La Mecque ou Médine à tarif fixe garanti."`);
content = content.replace(/'Paiement : Réglez directement à l'arrivée à votre hôtel en espèces \(EUR ou SAR\) ou par carte bancaire\.'/g,
  `"Paiement : Réglez directement à l'arrivée à votre hôtel en espèces (EUR ou SAR) ou par carte bancaire."`);
content = content.replace(/'Tarifs fixes transparents en Euros \(€\) et Riyals \(SAR\)\. Aucun paiement à l'avance\.'/g,
  `"Tarifs fixes transparents en Euros (€) et Riyals (SAR). Aucun paiement à l'avance."`);
content = content.replace(/'Conductor privado esperándole a la llegada con cartel con su nombre, tarifas fijas y sin pago por adelantado\.'/g,
  `"Conductor privado esperándole a la llegada con cartel con su nombre, tarifas fijas y sin pago por adelantado."`);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Fixed quotes in pilgrims.ts successfully');
