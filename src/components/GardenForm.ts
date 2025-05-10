export class GardenForm extends HTMLElement {
    connectedCallback() {
      const gardenName = this.getAttribute('garden-name') || '';
  
      this.innerHTML = `
        <form id="gardenForm">
          <label>Nombre del Jardín:</label>
          <input type="text" id="gardenName" value="${gardenName}" />
          <button type="submit">Guardar</button>
        </form>
      `;
  
      this.querySelector('form')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = (this.querySelector('#gardenName') as HTMLInputElement).value;
        this.dispatchEvent(new CustomEvent('garden-name-change', { detail: name }));
      });
    }
  }
  customElements.define('garden-form', GardenForm);