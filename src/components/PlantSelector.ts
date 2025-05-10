export class PlantSelector extends HTMLElement {
    plants: any[] = [];
  
    set data(plants: any[]) {
      this.plants = plants;
      this.render();
    }
  
    render() {
      this.innerHTML = `
        <div>
          ${this.plants.map(plant => `
            <div>
              <span>${plant.name}</span>
              <button data-id="${plant.id}" class="add">Añadir</button>
              <button data-id="${plant.id}" class="remove">Eliminar</button>
            </div>
          `).join('')}
        </div>
      `;
  
      this.querySelectorAll('.add').forEach(btn =>
        btn.addEventListener('click', e => {
          const id = (e.target as HTMLElement).getAttribute('data-id');
          this.dispatchEvent(new CustomEvent('add-plant', { detail: id }));
        })
      );
  
      this.querySelectorAll('.remove').forEach(btn =>
        btn.addEventListener('click', e => {
          const id = (e.target as HTMLElement).getAttribute('data-id');
          this.dispatchEvent(new CustomEvent('remove-plant', { detail: id }));
        })
      );
    }
  }
  customElements.define('plant-selector', PlantSelector);