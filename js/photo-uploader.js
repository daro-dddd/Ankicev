/**
 * Módulo "Alimentar el Cerebro": Subida de apuntes mediante Foto Local o Enlace/Link URL Público.
 * Integrado con Inteligencia Artificial & Visión por Computadora (AIVisionEngine).
 * Crea automáticamente fichas interactivas en el mazo Anki y persiste en localStorage.
 */

class PhotoUploader {
  constructor(onCardAddedCallback) {
    this.onCardAddedCallback = onCardAddedCallback;
    this.uploadedCards = this.loadUploadedCards();
    this.selectedImageData = null;
    this.currentAIConnectors = [];
    this.aiVision = window.AIVisionEngine ? new window.AIVisionEngine() : null;
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

    // Elementos del Escáner de Inteligencia Artificial
    this.aiScannerBox = document.getElementById('ai-scanner-box');
    this.aiScanBtn = document.getElementById('ai-scan-btn');
    this.aiScanProgress = document.getElementById('ai-scan-progress');
    this.aiScanStatusText = document.getElementById('ai-scan-status-text');
    this.aiScanFill = document.getElementById('ai-scan-fill');
    this.aiApiKeyInput = document.getElementById('ai-api-key-input');
    this.aiApiKeySaveBtn = document.getElementById('ai-api-key-save-btn');

    if (!this.dropzone) return;

    // Trigger file picker en dropzone
    this.dropzone.addEventListener('click', () => this.fileInput.click());

    // Manejo de archivo seleccionado
    this.fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) this.processFile(file);
    });

    // Manejo de cambio en URL de imagen
    if (this.urlInput) {
      this.urlInput.addEventListener('input', () => {
        const url = this.urlInput.value.trim();
        if (url.startsWith('http://') || url.startsWith('https://')) {
          this.selectedImageData = url;
          this.previewImg.src = url;
          this.previewImg.style.display = 'block';
          this.showAIScanBox();
        }
      });
    }

    // Botón para Escanear con Inteligencia Artificial
    if (this.aiScanBtn) {
      this.aiScanBtn.addEventListener('click', () => this.runAIScan());
    }

    // Guardar API Key opcional de Gemini
    if (this.aiApiKeySaveBtn && this.aiApiKeyInput) {
      if (this.aiVision && this.aiVision.geminiApiKey) {
        this.aiApiKeyInput.value = this.aiVision.geminiApiKey;
      }
      this.aiApiKeySaveBtn.addEventListener('click', () => {
        const key = this.aiApiKeyInput.value.trim();
        if (this.aiVision) {
          this.aiVision.setApiKey(key);
          alert(key ? '¡API Key de Gemini guardada correctamente!' : 'Se ha eliminado la API Key. Se usará el Sintetizador IA local.');
        }
      });
    }

    // Botón Guardar Ficha
    if (this.saveBtn) {
      this.saveBtn.addEventListener('click', () => this.saveCustomCard());
    }

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
      if (this.dropzone.querySelector('p')) {
        this.dropzone.querySelector('p').textContent = 'Imagen cargada correctamente. Toca si deseas cambiarla.';
      }
      this.showAIScanBox();
    };
    reader.readAsDataURL(file);
  }

  showAIScanBox() {
    if (this.aiScannerBox) {
      this.aiScannerBox.style.display = 'block';
      this.aiScannerBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }

  async runAIScan() {
    if (!this.selectedImageData) {
      alert('Primero selecciona una foto o pega una URL de imagen para escanear con IA.');
      return;
    }

    if (!this.aiVision && window.AIVisionEngine) {
      this.aiVision = new window.AIVisionEngine();
    }

    if (this.aiScanProgress) this.aiScanProgress.style.display = 'block';
    if (this.aiScanBtn) this.aiScanBtn.disabled = true;

    try {
      const result = await this.aiVision.analyzeImage(this.selectedImageData, (percent, statusMsg) => {
        if (this.aiScanFill) this.aiScanFill.style.width = `${percent}%`;
        if (this.aiScanStatusText) this.aiScanStatusText.textContent = statusMsg;
      });

      if (result) {
        // Auto-llenar campos con Inteligencia Artificial
        if (result.title) this.titleInput.value = result.title;
        if (result.fullNotes) this.notesInput.value = result.fullNotes;
        if (result.connectors) this.currentAIConnectors = result.connectors;

        // Auto-seleccionar tema si coincide
        if (this.topicSelect && result.topicId) {
          const matchOption = Array.from(this.topicSelect.options).find(opt => opt.value === result.topicId);
          if (matchOption) {
            this.topicSelect.value = result.topicId;
          }
        }

        // Efecto visual de éxito
        this.notesInput.style.borderColor = 'var(--accent-cyan)';
        this.notesInput.style.boxShadow = '0 0 12px rgba(56, 189, 248, 0.4)';
        setTimeout(() => {
          this.notesInput.style.borderColor = '';
          this.notesInput.style.boxShadow = '';
        }, 2500);

        if (this.aiScanStatusText) {
          this.aiScanStatusText.textContent = '¡Apunte completado con IA! Se generó el resumen, métodos de estudio y conectores.';
        }
      }
    } catch (e) {
      console.error('Error al ejecutar escáner de IA:', e);
      alert('No se pudo completar el análisis de IA de la imagen. Puedes llenar las notas manualmente.');
    } finally {
      if (this.aiScanBtn) this.aiScanBtn.disabled = false;
    }
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
      connectors: this.currentAIConnectors && this.currentAIConnectors.length > 0 ? this.currentAIConnectors : [topic || 'Apunte Personal'],
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

    alert('¡Apunte e Inteligencia Artificial guardados correctamente! Se ha generado una nueva ficha Anki en tu mazo de estudio.');
  }

  resetForm() {
    this.selectedImageData = null;
    this.currentAIConnectors = [];
    this.titleInput.value = '';
    this.notesInput.value = '';
    this.fileInput.value = '';
    if (this.urlInput) this.urlInput.value = '';
    this.previewImg.style.display = 'none';
    this.previewImg.src = '';
    if (this.aiScannerBox) this.aiScannerBox.style.display = 'none';
    if (this.aiScanProgress) this.aiScanProgress.style.display = 'none';
    if (this.aiScanFill) this.aiScanFill.style.width = '0%';
    if (this.dropzone.querySelector('p')) {
      this.dropzone.querySelector('p').textContent = 'Toca aquí para seleccionar una foto de tu dispositivo';
    }
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

  formatNotesHTML(notesText) {
    if (!notesText) return 'Sin notas adicionales.';
    return notesText
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/• (.*?)\n/g, '<li style="margin-left: 14px;">$1</li>')
      .replace(/\n\n/g, '<br><br>')
      .replace(/\n/g, '<br>');
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
      
      const formattedNotes = this.formatNotesHTML(card.notes);
      const connectorsHTML = (card.connectors || []).map(conn => 
        `<span style="display:inline-block; background:rgba(192, 132, 252, 0.15); color:var(--pastel-lavender); border:1px solid rgba(192, 132, 252, 0.3); padding:2px 8px; border-radius:10px; font-size:0.7rem; margin-right:4px; margin-top:4px;">${conn}</span>`
      ).join('');

      cardEl.innerHTML = `
        ${card.image ? `<img src="${card.image}" alt="${card.title}" onerror="this.src='https://via.placeholder.com/300x160?text=Imagen+no+disponible';">` : ''}
        <div class="user-photo-card-body">
          <span class="card-badge">${card.topic || 'Apunte Personal'}</span>
          <h4 style="margin: 8px 0; color: var(--text-main); font-size: 1rem; font-weight: 700;">${card.title}</h4>
          <div style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 12px; line-height: 1.5;">${formattedNotes}</div>
          ${connectorsHTML ? `<div style="margin-bottom: 10px;">${connectorsHTML}</div>` : ''}
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

window.PhotoUploader = PhotoUploader;
