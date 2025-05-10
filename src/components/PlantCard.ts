export class PlantCard extends HTMLElement {
    constructor() {
      super();
      const shadow = this.attachShadow({ mode: 'open' });
  
      shadow.innerHTML = `
        <style>
          .card {
            border: 1px solid #ccc;
            border-radius: 8px;
            padding: 16px;
            margin: 8px;
            max-width: 250px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            font-family: sans-serif;
          }
          img {
            width: 100%;
            height: auto;
            border-radius: 4px;
          }
          h2 {
            margin: 0.5em 0 0.2em;
            font-size: 1.1em;
          }
          p {
            margin: 0;
            color: #666;
            font-style: italic;
          }
        </style>
        <div id="cards-container"></div>
      `;
    }
  
    async connectedCallback() {
      const shadow = this.shadowRoot!;
      const container = shadow.getElementById('cards-container')!;
  
      try {
        const response = await fetch('/public/plants.json');
        const plants = await response.json();
  
        plants.forEach((plant: any) => {
          const card = document.createElement('div');
          card.classList.add('card');
          card.innerHTML = `
            <img src="${plant.img}" alt="${plant.commonName}" />
            <h2>${plant.commonName}</h2>
            <p>${plant.scientificName}</p>
          `;
          container.appendChild(card);
        });
      } catch (err) {
        container.innerHTML = `<p>Error al cargar datos: ${err}</p>`;
      }
    }
  }
  
  customElements.define('plant-card', PlantCard);
  export default PlantCard;
  