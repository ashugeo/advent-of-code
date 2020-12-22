const fs = require('fs');

fs.readFile('./data.md', 'utf8', (err, data) => {
    console.clear();
    data = data.split('\n');
    // console.log(data);

    const foods = [];
    let allIngredients = new Set();

    for (const [i, line] of data.entries()) {
        let [ingredients, allergens] = line.split('(contains');
        ingredients = ingredients.split(/ /).filter(d => d);
        allergens = allergens.split(/[ ,\)]/).filter(d => d);

        foods.push({ id: i, ingredients, allergens });

        for (const ingredient of ingredients) allIngredients.add(ingredient);
    }

    allIngredients = [...allIngredients];

    // console.log({foods});

    const allergens = {};
    
    for (const food of foods) {
        console.log('---');
        console.log('');
        console.log(`Food ${food.id}…`);

        const unknownAllergens = food.allergens.filter(d => !Object.values(allergens).some(a => d === a))

        if (!unknownAllergens.length) {
            console.log('Nothing new. Skip it.');
            console.log('');
            continue;
        }

        for (const allergen of unknownAllergens) {
            console.log('');
            console.log(`Look for ${allergen}…`);

            const foodsWithSameAllergen = foods.filter(d => d.allergens.includes(allergen) && d.id !== food.id);

            if (foodsWithSameAllergen.length) {
                console.log(`${foodsWithSameAllergen.length} food(s) have the same allergen`);

                let ingredientsInCommon = [...new Set([...food.ingredients, ...foodsWithSameAllergen.map(d => d.ingredients).flat()])].filter(ing => [food, ...foodsWithSameAllergen].every(food => food.ingredients.includes(ing)));

                console.log(`They all share ${ingredientsInCommon.length} ingredient(s) in common: [${ingredientsInCommon.join(', ')}]`);

                if (ingredientsInCommon.filter(d => allergens[d]).length) {
                    console.log(`But [${ingredientsInCommon.filter(d => allergens[d]).join(', ')}] have known allergens, that can't be ${allergen}`);

                    ingredientsInCommon = ingredientsInCommon.filter(d => !allergens[d]);

                    console.log(`We're left with ${ingredientsInCommon.length} ingredient(s) in common: [${ingredientsInCommon.join(', ')}]`);
                }

                if (ingredientsInCommon.length === 1) {
                    console.log(` [!] ${ingredientsInCommon[0]} must be ${allergen}`);

                    allergens[ingredientsInCommon[0]] = allergen;

                } else if (ingredientsInCommon.length > 1) {
                    console.log(' [?] That doesn‘t help much…');
                }
            } else {
                console.log(`No other food with ${allergen}`);

                console.log(`Food ${food.id} has ${food.ingredients.length} ingredient(s): [${food.ingredients.join(', ')}]`);
                
                const unknownIngredients = food.ingredients.filter(d => !allergens[d]);

                if (unknownIngredients.length === 1) {
                    console.log(`But only 1 is unknown: [${unknownIngredients[0]}]`);
                    console.log(` [!] ${unknownIngredients[0]} must be ${allergen}`);

                    allergens[unknownIngredients[0]] = allergen;
                }
            }
        }

        console.log('');
    }

    console.log('');
    console.log('-'.repeat(64));
    console.log('');

    // console.log({allIngredients});
    console.log(
        Object.keys(allergens)
        .sort((a, b) => allergens[a] < allergens[b] ? -1 : 1)
        .join(',')
    );
});