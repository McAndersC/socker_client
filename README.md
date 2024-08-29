```
Author      : Media College
Department  : WEB 
Year        : 2024 
Description : Mediacollege + vite + react.        
```

## Kom igang.

Dette er en standard boilerplate med det mest essentielle for at udvikle en opgave.

1. Installer pakker.

    ```
    npm install
    ```

2. Start Dev server.

    ```
    npm run dev
    ```

## Boiler Plate.

Dette projekt er sat op så man kan starte med at udvikle.


### Global CSS

Mappen `styles` indeholder `main.css` som inkludere de `.css`filer vi benytter til applikationen globalt.

Der er også benyttet en `_colors.css` som indeholder MediaCollege color variabler. Mest som demonstration af, hvordan man kunne vælge at splitte sine dokumenter. 

### Fonts

Mappen `services/fonts.jsx` inkludere fonts vedhjælp af `fontsource`.
Læs mere om [https://fontsource.org/](https://fontsource.org/) - Pakken gør det let at benytte alle "open source" fonten fra en central ressource.

I `_base.css` er inkluderet:

```css
--primary-font: "Quicksand";
font-family: "Quicksand", sans-serif;
font-weight: 400;
```

Her benytter vi "Quicksand" som vi har hentet via `fontsource`.

### Pages.

En demo `<HomePage>` er inkluderet.

### Components.

En demo Media College Info Card `<McInfoCard>`

### Routes.

Primitiv Routes sat op i `App.jsx` via `react-router-dom`

### Eslint

Eslint er sat op til at fjerne kravet om `Prop-Types`.



