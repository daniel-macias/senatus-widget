import { defineCustomElement } from 'vue';
import Senatus from './components/Senatus.vue';

// Convert the Vue component to a custom element
const SenatusElement = defineCustomElement(Senatus);

// Register the custom element with a valid name
customElements.define('senatus-widget', SenatusElement);
