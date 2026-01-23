/* === FUNCIONES JAVASCRIPT === */
/* Mostrar popup con QRCode */
function mostrarQRCodePopup() {
  // Crear el fondo oscuro
  const overlay = document.createElement('div');
  overlay.style.position = 'fixed';
  overlay.style.top = '0';
  overlay.style.left = '0';
  overlay.style.width = '100vw';
  overlay.style.height = '100vh';
  overlay.style.background = 'rgba(0,0,0,0.6)';
  overlay.style.display = 'flex';
  overlay.style.alignItems = 'center';
  overlay.style.justifyContent = 'center';
  overlay.style.zIndex = '9999';

  // Crear el popup
  const popup = document.createElement('div');
  popup.style.background = '#fff';
  popup.style.padding = '24px';
  popup.style.borderRadius = '12px';
  popup.style.boxShadow = '0 2px 16px rgba(0,0,0,0.2)';
  popup.style.textAlign = 'center';

  // Imagen QR
  const img = document.createElement('img');
  img.src = 'images/QRCode.png';
  img.alt = 'QR Code';
  img.style.maxWidth = '300px';
  img.style.width = '100%';
  img.style.height = 'auto';

  // Botón cerrar
  const closeBtn = document.createElement('button');
  closeBtn.textContent = 'Cerrar';
  closeBtn.style.marginTop = '16px';
  closeBtn.style.padding = '8px 20px';
  closeBtn.style.border = 'none';
  closeBtn.style.background = '#a01b25';
  closeBtn.style.color = '#fff';
  closeBtn.style.borderRadius = '6px';
  closeBtn.style.cursor = 'pointer';
  closeBtn.onclick = function() {
    document.body.removeChild(overlay);
  };

  popup.appendChild(img);
  popup.appendChild(closeBtn);
  overlay.appendChild(popup);
  document.body.appendChild(overlay);
}

/* Función para compartir el enlace en móviles */
function compartirEnlace() {
  const url = "https://hatechnologiespr.github.io/CarolDianeHA/"; // Cambia esto por la URL que deseas compartir
  const title = document.title || "Business Card";
  if (navigator.share) {
    navigator.share({
      title: title,
      url: url
    }).catch(() => {
      // Si falla el share, intentar copiar solo el enlace
      copiarEnlaceAlPortapapeles(url);
    });
  } else {
    // Fallback para desktop o navegadores sin soporte
    copiarEnlaceAlPortapapeles(url);
  }
}

// Función auxiliar para copiar el enlace al portapapeles con manejo de errores
function copiarEnlaceAlPortapapeles(url) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(url)
      .then(() => {
        // alert("Enlace copiado al portapapeles");
      })
      .catch(() => {
        // Fallback para navegadores que no permiten clipboard
        copiarManual(url);
      });
  } else {
    copiarManual(url);
  }
}

// Fallback manual para copiar el enlace en navegadores antiguos o móviles
function copiarManual(url) {
  const tempInput = document.createElement('input');
  tempInput.value = url;
  document.body.appendChild(tempInput);
  tempInput.select();
  tempInput.setSelectionRange(0, 99999); // Para móviles
  try {
    document.execCommand('copy');
    // alert("Enlace copiado al portapapeles");
  } catch (err) {
    alert("No se pudo copiar el enlace. Copia manualmente: " + url);
  }
  document.body.removeChild(tempInput);
}

/* Función que muestra la lista de servicios disponibles */
/* PARA EDITAR: Cambiar el texto dentro de alert() por tus servicios */
function mostrarServicios() {
  alert("Servicios disponibles:\n\n• Chatbots\n• Automatizaciones con IA\n• Desarrollo Web\n• Aplicaciones Moviles\n• Business Intelligence (Reportes PowerBI)\n• Digital Business Cards\n• Tarjetas NFC Personalizadas");
}

/* Función para agregar contacto - Compatible con móviles */
function agregarContacto() {
  const vCardData = `BEGIN:VCARD
VERSION:3.0
FN:Carol Diane Hernández-Andaluz
N:Hernández-Andaluz;Carol Diane;;;
ORG:HA Technologies
TEL;TYPE=CELL:787-907-4295
EMAIL:HATechnologiesPR@outlook.com
URL:https://hatechnologiespr.github.io/
ADR:Puerto Rico;;;
NOTE:Servicios: Chatbots, Automatizaciones con IA, Desarrollo Web, Apps Móviles, Business Intelligence, Tarjetas Digitales y NFC
END:VCARD`;

  // Detectar si es un dispositivo móvil
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  if (isMobile) {
    // Para dispositivos móviles, crear un enlace temporal y hacer click
    const blob = new Blob([vCardData], { type: 'text/vcard;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'CarolDianeHA_Contacto.vcf';
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    
    // Limpiar después de un breve delay
    setTimeout(() => {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 100);
  } else {
    // Para desktop, usar el método tradicional
    const blob = new Blob([vCardData], { type: 'text/vcard' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'CarolDianeHA_Contacto.vcf';
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }
}
