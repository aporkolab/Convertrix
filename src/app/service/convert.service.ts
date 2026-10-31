import { Injectable, inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Item } from '../model/item';
import { Language } from '../model/language';
import { TranslateService } from './translate.service';

export type PropKind = 'length' | 'weight';

interface ItemSource {
  id: number;
  nameEnglish: string;
  nameHungarian: string;
  length: number;
  weight: number;
  description: string;
  descriptionHungarian: string;
}

@Injectable({
  providedIn: 'root',
})
export class ConvertService {
  // --- Master data (immutable) ---
  private readonly items: readonly ItemSource[] = [
    {
      id: 1,
      nameEnglish: 'average automobile',
      nameHungarian: 'átlagos személyautó',
      length: 4.48056,
      weight: 1270.058636,
      description:
        'Different manufacturers and models will have varying car sizes, and standard automobiles and trucks are typically between 10-18 feet long. A midsize sedan is around 14 feet long, while a smaller car like a Mini Cooper will be about 10 feet long.',
      descriptionHungarian:
        'A különböző gyártók és modellek különböző méretű autókkal rendelkeznek, a szabványos személygépkocsik és teherautók jellemzően 10-18 láb hosszúak. Egy középkategóriás szedán körülbelül 14 láb hosszú, míg egy kisebb autó, például egy Mini Cooper körülbelül 10 láb hosszú.',
    },
    {
      id: 2,
      nameEnglish: 'average office printer',
      nameHungarian: 'átlagos irodai nyomtató',
      length: 1.6,
      weight: 50,
      description:
        'The first computer printer designed was a mechanically driven apparatus by Charles Babbage for his difference engine in the 19th century; however, his mechanical printer design was not built until 2000.',
      descriptionHungarian:
        'Babbage a 19. században a differenciamotorjához tervezett mechanikus meghajtású készülék volt, azonban a mechanikus nyomtató tervét csak 2000-ben építették meg.',
    },
    {
      id: 3,
      nameEnglish: 'planet Jupiter',
      nameHungarian: 'Jupiter bolygó',
      length: 143070682,
      weight: 1898000000000000,
      description:
        'Bands appear across Jupiter, where winds up to 400 mph blow and Jupiter also has what’s called its ‘Great Red Spot’. This is a massive hurricane over three times the size of earth, that has been in existence for over 300 years!',
      descriptionHungarian:
        'A Jupiteren sávok jelennek meg, ahol akár 400 mérföld/óra sebességű szél is fújhat, és a Jupiternek van egy úgynevezett Nagy Vörös Foltja is. Ez egy hatalmas hurrikán, amely több mint háromszor akkora, mint a Föld, és már több mint 300 éve létezik!',
    },
    {
      id: 4,
      nameEnglish: 'Eiffel Tower',
      nameHungarian: 'Eiffel-torony',
      length: 324,
      weight: 10100000,
      description:
        'It is named after the engineer Gustave Eiffel, whose company designed and built the tower.',
      descriptionHungarian:
        'Nevét Gustave Eiffel mérnökről kapta, akinek cége tervezte és építette a tornyot.',
    },
    {
      id: 5,
      nameEnglish: 'Great Pyramid of Giza',
      nameHungarian: 'Gízai nagy piramis',
      length: 232.4,
      weight: 6000000000,
      description:
        'The Great Pyramid of Giza is the largest Egyptian pyramid and the tomb of Fourth Dynasty pharaoh Khufu. Built in the early 26th century BC during a period of around 27 years.',
      descriptionHungarian:
        'A gízai Nagy Piramis a legnagyobb egyiptomi piramis és a negyedik dinasztia egyik fáraójának, Khufunak a sírja. A Kr. e. 26. század elején épült, mintegy 27 év alatt.',
    },
    {
      id: 6,
      nameEnglish: 'Oscar Academy Award',
      nameHungarian: 'Oscar-díj',
      length: 0.3429,
      weight: 3.85,
      description:
        'Each statue is made of bronze and plated with 24 karat gold and costs around $400 to produce.',
      descriptionHungarian:
        'Minden szobor bronzból készül, 24 karátos arannyal van bevonva, és előállítása körülbelül 400 dollárba kerül.',
    },
    {
      id: 7,
      nameEnglish: 'Turkish Angora cat',
      nameHungarian: 'török angóramacska',
      length: 0.28,
      weight: 4,
      description:
        'The world’s heaviest house cat is called Himmy and weighs in at a colossal 46.8 pounds (21.3 kg).',
      descriptionHungarian:
        'A világ legnehezebb házimacskáját Himmy-nek hívják, és a súlya kolosszális 46,8 font (21,3 kg).',
    },
    {
      id: 8,
      nameEnglish: 'French Bulldog',
      nameHungarian: 'francia buldog',
      length: 0.35,
      weight: 12,
      description:
        'From the beginning of the nineteenth century bulldogs were bred in the United Kingdom for purposes other than traditional blood sports such as bull-baiting, which were banned in 1835.',
      descriptionHungarian:
        'A tizenkilencedik század elejétől kezdve az Egyesült Királyságban a buldogokat a hagyományos véres sportoktól eltérő célokra tenyésztették, mint például a bikavadászat, amelyet 1835-ben betiltottak.',
    },
    {
      id: 9,
      nameEnglish: 'M size man T-Shirt',
      nameHungarian: 'M-es méretű férfi póló',
      length: 0.91,
      weight: 0.156,
      description:
        'The first t-shirt used for promotional purposes was for the movie, The Wizard Of Oz, back in 1939.',
      descriptionHungarian:
        'Az első promóciós célokra használt póló az Óz, a csodák csodája című filmhez készült 1939-ben.',
    },
    {
      id: 10,
      nameEnglish: 'Million Dollars',
      nameHungarian: 'millió dollár',
      length: 1.0922,
      weight: 997,
      description:
        'A $1 million stack of $100 bills is 43 inches tall (10,000 x 0.0043 inches = 43 inches)',
      descriptionHungarian:
        'Egy egymillió dollárnyi 100 dolláros bankjegy 43 hüvelyk magas (10 000 x 0,0043 hüvelyk = 43 hüvelyk)',
    },
    {
      id: 11,
      nameEnglish: 'average US man',
      nameHungarian: 'átlagos USA-beli férfi',
      length: 1.76,
      weight: 89,
      description:
        "The average American man stands just under 5 feet, 10 inches -- or about 5 feet, 9.3 inches to be precise. That's roughly 176 centimeters. This measure gives the U.S. it's standing in 37th place for male height worldwide.",
      descriptionHungarian:
        'Az átlagos amerikai férfi alig kevesebb mint 5 láb, 10 hüvelyk - pontosabban körülbelül 5 láb, 9,3 hüvelyk. Ez nagyjából 176 centiméter. Ezzel a mérőszámmal az USA a 37. helyen áll a férfiak testmagasságát tekintve világszerte.',
    },
    {
      id: 12,
      nameEnglish: 'Internet',
      nameHungarian: 'internet',
      length: 0,
      weight: 0.06,
      description:
        "Depending on whether you reference Russell Seitz or the Discovery Magazine, the internet weighs either 60 grams or 6 micrograms. If we trusted Seitz's calculations, the entirety of the internet is no heavier than a tennis ball.",
      descriptionHungarian:
        'Attól függően, hogy Russell Seitzre vagy a Discovery Magazine-ra hivatkozunk, az internet súlya vagy 60 gramm, vagy 6 mikrogramm. Ha bíznánk Seitz számításaiban, akkor az internet egésze nem nehezebb, mint egy teniszlabda.',
    },
    {
      id: 13,
      nameEnglish: 'HTMS Chakri Naruebet Aircraft Carrier',
      nameHungarian: 'HTMS Chakri Naruebet repülőgép-hordozó anyahajó',
      length: 183,
      weight: 11486000,
      description:
        'Did you know that the Brazil Navy once tried to sell one of their aircraft carriers on eBay? Unfortunately, it didn’t attract any bids. It would be hard to store one of these ships on the area lake!',
      descriptionHungarian:
        'Tudtad, hogy a brazil haditengerészet egyszer megpróbálta eladni az egyik repülőgép-hordozóját az eBay-en? Sajnos nem érkezett rá ajánlat. Nehéz lenne egy ilyen hajót a környékbeli tavon tárolni!',
    },
    {
      id: 14,
      nameEnglish: 'handgranade',
      nameHungarian: 'kézigránát',
      length: 0.4,
      weight: 0.4,
      description:
        'Pulling the pin of a grenade with your teeth is often seen in Hollywood war movies, but the truth is that if you were to try this yourself you would likely also pull out at least 3 teeth along with the pin.',
      descriptionHungarian:
        'Egy gránát biztosítószegének foggal való kihúzása gyakran látható a hollywoodi háborús filmekben, de az igazság az, hogy ha te magad próbálnád ki, valószínűleg legalább 3 fogat is kihúznál a biztosítószeggel együtt.',
    },
    {
      id: 15,
      nameEnglish: 'Passport',
      nameHungarian: 'útlevél',
      length: 0.023,
      weight: 0.03,
      description:
        'Since 2002 more than 40 million passports or travel documents have been reported lost or stolen.',
      descriptionHungarian:
        '2002 óta több mint 40 millió útlevél vagy úti okmány elvesztését vagy ellopását jelentették be.',
    },
    {
      id: 16,
      nameEnglish: 'Paperclip',
      nameHungarian: 'Gémkapocs',
      length: 0.0025,
      weight: 0.001,
      description:
        'During World War 2, paper clips were banned by the Nazis as they became a symbol of unity.',
      descriptionHungarian:
        'A 2. világháború alatt a nácik betiltották a gemkapcsokat, mivel azok az egység jelképévé váltak.',
    },
    {
      id: 17,
      nameEnglish: 'Concert grand piano',
      nameHungarian: 'hangversenyzongora',
      length: 2.9,
      weight: 635,
      description:
        'The most expensive piano in the world was a crystal piano which sold for $3.2 million in 2008.',
      descriptionHungarian:
        'A világ legdrágább zongorája egy kristályzongora volt, amely 2008-ban 3,2 millió dollárért kelt el.',
    },
    {
      id: 18,
      nameEnglish: 'Head Of Cauliflower',
      nameHungarian: 'Egy karfiolfej',
      length: 0.5,
      weight: 0.84,
      description:
        'Peter Glazebrook holds the record for growing the world’s largest cauliflower. It measured 6 feet in diameter and weighed in at a whopping 60 pounds (27.485 kg)!',
      descriptionHungarian:
        'Peter Glazebrook tartja a világ legnagyobb karfioljának termesztési rekordját. Átmérője 6 láb volt, súlya pedig elképesztő 60 font (27,485 kg)!',
    },
    {
      id: 19,
      nameEnglish: 'Keg Of Beer',
      nameHungarian: 'Hordó sör',
      length: 0.59182,
      weight: 72,
      description:
        'Which state consumes the most beer per resident? It may surprise you that the honor goes to North Dakota. Each resident of the state drank 43.6 gallons on average in 2013. That’s a lot of beer.',
      descriptionHungarian:
        'Melyik államban fogy a legtöbb sör lakosonként? Talán meglepő, hogy a megtiszteltetés Észak-Dakotát éri. Az állam minden lakosa átlagosan 43,6 gallon sört ivott 2013-ban. Ez rengeteg sör.',
    },
    {
      id: 20,
      nameEnglish: 'The Heaviest Person In The World',
      nameHungarian: 'A világ legsúlyosabb embere',
      length: 1.85,
      weight: 635,
      description:
        'Jon Brower Minnoch is widely accepted of being the heaviest person. He weighed an incredible 1,400 pounds (635 kg)!',
      descriptionHungarian:
        'Jon Brower Minnochról széles körben elfogadott, hogy a legnehezebb ember. Hihetetlen 1400 fontot (635 kg) nyomott!',
    },
  ];

  // --- Index for fast search ---
  private readonly byId = new Map<number, ItemSource>(
    this.items.map((it) => [it.id, it])
  );
  private readonly localized: Record<Language, readonly Item[]> = {
    [Language.ENGLISH]: this.items.map(
      (it) =>
        new Item(it.id, it.nameEnglish, it.length, it.weight, it.description)
    ),
    [Language.HUNGARIAN]: this.items.map(
      (it) =>
        new Item(
          it.id,
          it.nameHungarian,
          it.length,
          it.weight,
          it.descriptionHungarian
        )
    ),
  };

  private readonly translate = inject(TranslateService);

  // --- Public API ---
  /** All items, localized to the currently selected language. */
  getItems(): Observable<readonly Item[]> {
    return this.translate.language$.pipe(map((lang) => this.localized[lang]));
  }

  /**
   * How many `item2Id` items equal `quantity` pieces of `item1Id` by the given
   * property. Returns 0 for unknown items, a non-positive quantity or when the
   * target item has no size in that dimension.
   */
  compareItems(
    item1Id: number | null | undefined,
    item2Id: number | null | undefined,
    which: PropKind | null | undefined,
    quantity: number | null | undefined
  ): number {
    const first = item1Id != null ? this.byId.get(item1Id) : undefined;
    const second = item2Id != null ? this.byId.get(item2Id) : undefined;
    const q = Number(quantity ?? 1);

    if (!first || !second || !which || !isFinite(q) || q <= 0) return 0;

    if (which === 'length') {
      return second.length === 0 ? 0 : q * (first.length / second.length);
    }
    // which === 'weight'
    return second.weight === 0 ? 0 : q * (first.weight / second.weight);
  }
}
