/**
 * Módulo "Alimentar el Cerebro": Subida de apuntes mediante Foto Local o Enlace/Link URL Público.
 * Crea automáticamente fichas interactivas en el mazo Anki y persiste en localStorage.
 */

class PhotoUploader {
  constructor(onCardAddedCallback) {
    this.onCardAddedCallback = onCardAddedCallback;
    this.uploadedCards = this.loadUploadedCards();
    this.selectedImageData = null;
    this.initDOM();
  }

  initDOM() {
    this.fileInput = document.getElementById('photo-file-input');
    this.urlInput = document.getElementById('photo-url-input');
    this.dropzone = document.getElementById('photo-dropzone');
    this.previewImg = document.getElementById('photo-preview-img');
    this.titleInput = document.getElementById('photo-title-input');
    this.topicSelect = document.getElementById('photo-topic-select');
    this.notesInput = document.getElementById('photo-notes-input');
    this.saveBtn = document.getElementById('save-photo-card-btn');
    this.cardsGrid = document.getElementById('user-cards-grid');

    if (!this.dropzone) return;

    // Trigger file picker on dropzone click
    this.dropzone.addEventListener('click', () => this.fileInput.click());

    // File change handler
    this.fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) this.processFile(file);
    });

    // URL input preview change
    if (this.urlInput) {
      this.urlInput.addEventListener('input', () => {
        const url = this.urlInput.value.trim();
        if (url.startsWith('http://') || url.startsWith('https://')) {
          this.selectedImageData = url;
          this.previewImg.src = url;
          this.previewImg.style.display = 'block';
        }
      });
    }

    // Save button handler
    this.saveBtn.addEventListener('click', () => this.saveCustomCard());

    this.renderUserCards();
  }

  processFile(file) {
    if (!file.type.startsWith('image/')) {
      alert('Por favor selecciona un archivo de imagen válido (JPG, PNG).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      this.selectedImageData = event.target.result;
      this.previewImg.src = this.selectedImageData;
      this.previewImg.style.display = 'block';
      this.dropzone.querySelector('p').textContent = 'Imagen seleccionada correctamente. Toca si deseas cambiarla.';
    };
    reader.readAsDataURL(file);
  }

  saveCustomCard() {
    const title = this.titleInput.value.trim();
    const topic = this.topicSelect.value;
    const notes = this.notesInput.value.trim();
    const urlValue = this.urlInput ? this.urlInput.value.trim() : '';

    const imageSrc = urlValue || this.selectedImageData;

    if (!title) {
      alert('Por favor ingrese un título para el apunte o ficha.');
      return;
    }

    const newCard = {
      id: 'custom_' + Date.now(),
      title,
      topic,
      notes: notes || 'Sin notas adicionales.',
      image: imageSrc,
      createdAt: new Date().toLocaleDateString('es-MX')
    };

    this.uploadedCards.unshift(newCard);
    this.saveToStorage();
    this.resetForm();
    this.renderUserCards();

    // Notificar para crear ficha Anki
    if (this.onCardAddedCallback) {
      this.onCardAddedCallback(newCard);
    }

    alert('Apunte guardado correctamente. Se ha generado una nueva ficha Anki en tu mazo de estudio.');
  }

  resetForm() {
    this.selectedImageData = null;
    this.titleInput.value = '';
    this.notesInput.value = '';
    this.fileInput.value = '';
    if (this.urlInput) this.urlInput.value = '';
    this.previewImg.style.display = 'none';
    this.previewImg.src = '';
    this.dropzone.querySelector('p').textContent = 'Toca aquí para seleccionar una foto de tu dispositivo';
  }

  loadUploadedCards() {
    try {
      const saved = localStorage.getItem('ceneval_user_photo_cards');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Error al cargar fotos personales', e);
      return [];
    }
  }

  saveToStorage() {
    try {
      localStorage.setItem('ceneval_user_photo_cards', JSON.stringify(this.uploadedCards));
    } catch (e) {
      alert('Aviso: El almacenamiento local está lleno. Se recomienda usar enlaces/links de imágenes para ahorrar espacio.');
    }
  }

  deleteCard(cardId) {
    if (confirm('¿Desea eliminar este apunte guardado?')) {
      this.uploadedCards = this.uploadedCards.filter(c => c.id !== cardId);
      this.saveToStorage();
      this.renderUserCards();
      location.reload(); // Recargar para actualizar mazo
    }
  }

  renderUserCards() {
    if (!this.cardsGrid) return;
    this.cardsGrid.innerHTML = '';

    if (this.uploadedCards.length === 0) {
      this.cardsGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 24px;">No ha agregado apuntes o fotos aún. Utilice el formulario superior para subir un archivo o pegar un enlace URL.</p>';
      return;
    }

    this.uploadedCards.forEach(card => {
      const cardEl = document.createElement('div');
      cardEl.className = 'user-photo-card';
      cardEl.innerHTML = `
        ${card.image ? `<img src="${card.image}" alt="${card.title}" onerror="this.src='https://via.placeholder.com/300x160?text=Imagen+no+disponible';">` : ''}
        <div class="user-photo-card-body">
          <span class="card-badge">${card.topic}</span>
          <h4 style="margin: 8px 0; color: var(--text-main); font-size: 1rem; font-weight: 700;">${card.title}</h4>
          <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 12px; line-height: 1.5;">${card.notes}</p>
          <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-color); padding-top: 10px;">
            <small style="color: var(--text-muted);">${card.createdAt}</small>
            <button onclick="window.photoUploader.deleteCard('${card.id}')" style="background: none; border: none; color: var(--danger); cursor: pointer; font-size: 0.8rem; font-weight: 700;">Eliminar</button>
          </div>
        </div>
      `;
      this.cardsGrid.appendChild(cardEl);
    });
  }
}
