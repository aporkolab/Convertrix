
# Convertrix v.2.0.0 - documentation

## 1. The description of the task

The Convertrix v.1.0.0 application is able to compare the elements stored in its database by weight and size - the elements can be converted into each other by clicking on the desired parameters.

The original task was to:

> Skills: Front-end
>
> Focus: Data manipulation
>
> Difficulty: 2/5
>
> The idea here is not to convert dollars into euros but rather to
> convert data from one infrequent measurement system to another.
>
> For example: How big is the Eiffel Tower in several automobile? What
> is the weight of the planet Mars in several printers?
>
> Of course, if the converter is well done, it should allow you to
> convert actual units and have equally consistent results!

## 2. Preparations before running the software

There is no need for preparations before running. Just enjoy the weird data! :)

## **3. Version history**

Technologies used: Angular 22 (standalone components, signals), TypeScript 6, Bootstrap 5 and RxJS 7 (see _package.json_ for the exact list).

Tooling:
- **@angular/build (esbuild):** application builder and dev server.
- **Vitest:** unit tests through the Angular `unit-test` builder (jsdom).
- **ESLint and Prettier:** code quality and consistent formatting.
- **GitHub Actions:** dependency guard, `npm audit`, lint, tests and production build on every push and pull request to `main`.

### Unreleased (2026-10-31)

- Maintenance update: Angular 22.2.4, moved to the esbuild-based application builder, Karma/Jasmine replaced by Vitest.
- Standalone components with signals and the new control flow; the `AppModule` is gone.
- Fixed: the selected items were lost when switching language, the contact page typewriter kept running after leaving the page, the "Home" menu item was always highlighted, unknown URLs showed an empty page.
- Removed unused dependencies and global scripts (jQuery, Bootstrap JS, scribbler.js, highlight.js).

### v.2.0.0 (2025-08-26)

- Updated to Angular 20.
- Refactored the architecture to use a service-based approach.
- Improved code quality and test coverage.
- Added ESLint, Prettier, and Husky.

### v.1.0.0 (2022-11-01)

- First edition.
- A program with 20 unusual elements of mass and length:
	- average automobile,
	- average office printer,
	- planet Jupiter,
	- Eiffel Tower,
	- Great Pyramid of Giza,
	- Oscar Academy Award,
	- Turkish Angora cat,
	- French Bulldog,
	- M size man T-Shirt,
	- million dollar,			
	- an average US man,
	- Internet,
	- HTMS Chakri Naruebet Aircraft Carrier,
	- handgranade,
	- Passport,
	- Paperclip,
	- concert grand piano,
	- A Head Of Cauliflower,
	- Keg Of Beer,
	- The Heaviest Person In The World,
- Potential for further improvements in the design of the programme and its database.

## **4. Install the application**

Prerequisites: Node.js 24 (see `.nvmrc`) and npm 11 or newer.

1.  Clone the repository:
    ```bash
    git clone https://github.com/APorkolab/Convertrix.git
    ```
2.  Navigate to the project directory:
    ```bash
    cd Convertrix
    ```
3.  Install the dependencies:
    ```bash
    npm ci
    ```

## **5. Configure the application**

- There is no need to configure the application because there is no backend in it. No environment variables are used.

## **6. Start the application**

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server on http://localhost:4200 with live reload. |
| `npm test` | Unit tests (Vitest, watch mode; add `-- --watch=false` for a single run). |
| `npm run lint` | ESLint + Prettier check. |
| `npm run build` | Production build into `dist/convertrix`. |
| `npm start` | Serves the production build from `dist/convertrix` (run `npm run build` first). |

## **7. A special thanks to...**

- Thanks for the project idea for Josef Cruz (https://javascript.plainenglish.io/9-super-creative-project-ideas-for-junior-web-developers-e8181e6f4eef)
- Thanks for the data: https://whatthingsweigh.com/
- Thanks for the pretty, responsive HTML template for Amiechen (https://github.com/amiechen/codrops-scribbler) and the upgraded version for EgoistDeveloper (https://github.com/EgoistDeveloper/codrops-scribbler).

## **8. Legal information**

[![Creative Commons License](https://camo.githubusercontent.com/72af7c8e70a45c471163e803748d0338b3b2b52f6b040804e549e4163de72a58/68747470733a2f2f692e6372656174697665636f6d6d6f6e732e6f72672f6c2f62792f342e302f38387833312e706e67)](http://creativecommons.org/licenses/by/4.0/)  
This work by [Ádám Dr. Porkoláb](https://porkolab.digital/) is licensed under a [Creative Commons Attribution 4.0 International License](http://creativecommons.org/licenses/by/4.0/).  
Based on a work at [](https://github.com/APorkolab/)[https://github.com/APorkolab/](https://github.com/APorkolab/).

----------
# Convertrix v.2.0.0 - dokumentáció

## 1. A feladat leírása

A Convertrix v.1.0.0 alkalmazás képes összehasonlítani az adatbázisában tárolt elemeket súly és méret szerint - az elemek a kívánt paraméterekre kattintva alakíthatók át egymásba.

Az eredeti feladatkiírás volt:

> készségek: Front-end
>
> Fókusz: Adatmanipuláció
>
> Nehézség: 2/5
>
> A feladat lényege nem a dollár euróra történő átváltása, hanem a
> az adatok átváltása egyik ritkán használt mérési rendszerből egy másikba.
>
> Például: Mekkora az Eiffel-torony autóban? Mi
> a Mars bolygó súlya nyomtatóban?
>
> Természetesen, ha az átalakító jól van megcsinálva, akkor lehetővé kell tennie, hogy
> tényleges mértékegységek átváltását, és ugyanilyen konzisztens eredményeket kapjunk!

## 2. Előkészületek a szoftver futtatása előtt

A futtatás előtt nincs szükség előkészületekre. Csak élvezze a furcsa adatokat! :)

## **3. Verziótörténet**

Használt technológiák: Angular 22 (standalone komponensek, signalok), TypeScript 6, Bootstrap 5 és RxJS 7 (a pontos listát lásd a _package.json_-ban). Build: @angular/build (esbuild), tesztek: Vitest, kódminőség: ESLint és Prettier.

### Kiadatlan (2026-10-31)

- Karbantartási frissítés: Angular 22.2.4, esbuild alapú application builder, a Karma/Jasmine helyett Vitest.
- Standalone komponensek signalokkal és az új vezérlési szintaxissal.
- Javítva: nyelvváltáskor elveszett a kiválasztás, a kapcsolat oldal „írógépe” az oldal elhagyása után is futott, a „Home” menüpont mindig aktív volt, ismeretlen URL-en üres oldal jelent meg.

### v.1.0.0 (2022-11-01)

- Első kiadás.
- Egy program 20 szokatlan tömegű és hosszúságú elemmel:
	- Átlagos autó,
	- átlagos irodai nyomtató,
	- Jupiter bolygó,
	- Eiffel-torony,
	- A gízai nagy piramis,
	- Oscar Oscar-díj,
	- török angóra macska,
	- francia bulldog,
	- M-es férfi póló,
	- millió dollár,			
	- egy átlagos amerikai férfi,
	- Internet,
	- HTMS Chakri Naruebet repülőgép-hordozó,
	- handgranade,
	- útlevél,
	- gemkapocs,
	- koncertzongora,
	- Egy fej karfiol,
	- Hordó sör,
	- A világ legnehezebb embere,
- További fejlesztési lehetőségek a program és az adatbázis kialakításában.

## **4. Az alkalmazás telepítése**

1.  Ha nincs telepítve a Git verziókezelő szoftver, töltse le és telepítse az operációs rendszerének megfelelő verziót a [https://git-scm.com](https://git-scm.com/) oldalról.
2.  Telepítse a Node.js 24-es verzióját (lásd `.nvmrc`) a [https://nodejs.org/en/](https://nodejs.org/en/) oldalról. Az Angular CLI-t nem kell globálisan telepíteni, a projekt függőségei tartalmazzák.
3.  Klónozza a GitHub-tárat:

    `git clone https://github.com/APorkolab/Convertrix.git`

4.  A projekt mappájában telepítse a függőségeket: `npm ci`

## **5. Az alkalmazás konfigurálása**

- Nincs szükség az alkalmazás konfigurálására, mivel nincs benne backend, környezeti változókat sem használ.

## **6. Indítsa el az alkalmazást**

- Fejlesztői szerver: `npm run dev` (http://localhost:4200)
- Tesztek: `npm test` (egyszeri futtatás: `npm test -- --watch=false`)
- Lint: `npm run lint`
- Éles build: `npm run build` (kimenet: `dist/convertrix`, ennek tartalmát kell a webszerverre másolni)
- Az éles build kiszolgálása: `npm start` (előtte `npm run build`)

## **7. Külön köszönet...**

- Köszönet a projekt ötletéért Josef Cruznak (https://javascript.plainenglish.io/9-super-creative-project-ideas-for-junior-web-developers-e8181e6f4eef).
- Köszönet az adatokért: https://whatthingsweigh.com/
- Köszönet a szép, reszponzív HTML sablonért Amiechen-nek (https://github.com/amiechen/codrops-scribbler) és a frissített változatért EgoistDeveloper-nek (https://github.com/EgoistDeveloper/codrops-scribbler).

## **8. Jogi információk**


[![Creative Commons License](https://camo.githubusercontent.com/72af7c8e70a45c471163e803748d0338b3b2b52f6b040804e549e4163de72a58/68747470733a2f2f692e6372656174697665636f6d6d6f6e732e6f72672f6c2f62792f342e302f38387833312e706e67)](http://creativecommons.org/licenses/by/4.0/)  
[Dr. Porkoláb Ádám](https://porkolab.digital/) ezen műve [Creative Commons Attribution 4.0 International License](http://creativecommons.org/licenses/by/4.0/) licenc alatt áll.  
A [](https://github.com/APorkolab/)[https://github.com/APorkolab/](https://github.com/APorkolab/) című mű alapján készült.
