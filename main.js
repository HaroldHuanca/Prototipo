document.addEventListener('DOMContentLoaded', function() {
    // Navegación entre secciones
    const navItems = document.querySelectorAll('.sidebar li');
    const contentSections = document.querySelectorAll('.content-section');
    
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const sectionId = this.getAttribute('data-section');
            
            // Remover clase active de todos los items y secciones
            navItems.forEach(navItem => navItem.classList.remove('active'));
            contentSections.forEach(section => section.classList.remove('active'));
            
            // Agregar clase active al item y sección seleccionados
            this.classList.add('active');
            document.getElementById(sectionId).classList.add('active');
        });
    });
    
    // Modal genérico
    const modal = document.getElementById('generic-modal');
    const closeBtn = document.querySelector('.close-btn');
    const cancelBtn = document.querySelector('.cancel-btn');
    
    // Funciones para manejar el modal
    function openModal(title, fields) {
        document.getElementById('modal-title').textContent = title;
        const form = document.getElementById('modal-form');
        
        // Limpiar formulario (excepto los botones de acción)
        while (form.firstChild && !form.firstChild.classList.contains('form-actions')) {
            form.removeChild(form.firstChild);
        }
        
        // Insertar campos del formulario
        const formActions = document.querySelector('.form-actions');
        fields.forEach(field => {
            const div = document.createElement('div');
            div.className = 'form-group';
            
            const label = document.createElement('label');
            label.textContent = field.label;
            label.setAttribute('for', field.id);
            
            let input;
            if (field.type === 'select') {
                input = document.createElement('select');
                field.options.forEach(option => {
                    const opt = document.createElement('option');
                    opt.value = option.value;
                    opt.textContent = option.text;
                    input.appendChild(opt);
                });
            } else {
                input = document.createElement('input');
                input.type = field.type;
            }
            
            input.id = field.id;
            input.name = field.id;
            input.placeholder = field.placeholder || '';
            input.value = field.value || '';
            
            div.appendChild(label);
            div.appendChild(input);
            form.insertBefore(div, formActions);
        });
        
        modal.style.display = 'flex';
    }
    
    function closeModal() {
        modal.style.display = 'none';
    }
    
    // Event listeners para botones de modal
    closeBtn.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', closeModal);
    
    // Cerrar modal al hacer clic fuera del contenido
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });
    
    // Configurar botones de añadir
    document.getElementById('add-venta-btn').addEventListener('click', function() {
        openModal('Nueva Venta', [
            { id: 'fecha', label: 'Fecha', type: 'date', placeholder: 'Seleccione fecha' },
            { id: 'cliente', label: 'Cliente', type: 'select', options: [
                { value: 'CLI001', text: 'Juan Pérez' },
                { value: 'CLI002', text: 'María García' }
            ]},
            { id: 'productos', label: 'Productos', type: 'text', placeholder: 'Buscar productos...' }
        ]);
    });
    
    document.getElementById('add-compra-btn').addEventListener('click', function() {
        openModal('Nueva Compra', [
            { id: 'fecha', label: 'Fecha', type: 'date', placeholder: 'Seleccione fecha' },
            { id: 'proveedor', label: 'Proveedor', type: 'select', options: [
                { value: 'PROV001', text: 'Alimentos S.A.' },
                { value: 'PROV002', text: 'Bebidas y Más' }
            ]},
            { id: 'productos', label: 'Productos', type: 'text', placeholder: 'Buscar productos...' }
        ]);
    });
    
    document.getElementById('add-producto-btn').addEventListener('click', function() {
        openModal('Nuevo Producto', [
            { id: 'codigo', label: 'Código', type: 'text', placeholder: 'Ej: PRD001' },
            { id: 'nombre', label: 'Nombre', type: 'text', placeholder: 'Nombre del producto' },
            { id: 'categoria', label: 'Categoría', type: 'text', placeholder: 'Categoría del producto' },
            { id: 'precio', label: 'Precio', type: 'number', placeholder: 'Precio unitario' },
            { id: 'existencia', label: 'Existencia', type: 'number', placeholder: 'Cantidad en inventario' }
        ]);
    });
    
    document.getElementById('add-proveedor-btn').addEventListener('click', function() {
        openModal('Nuevo Proveedor', [
            { id: 'nombre', label: 'Nombre', type: 'text', placeholder: 'Nombre del proveedor' },
            { id: 'contacto', label: 'Persona de contacto', type: 'text', placeholder: 'Nombre del contacto' },
            { id: 'telefono', label: 'Teléfono', type: 'tel', placeholder: 'Teléfono de contacto' },
            { id: 'email', label: 'Email', type: 'email', placeholder: 'Email de contacto' }
        ]);
    });
    
    document.getElementById('add-cliente-btn').addEventListener('click', function() {
        openModal('Nuevo Cliente', [
            { id: 'nombre', label: 'Nombre', type: 'text', placeholder: 'Nombre completo' },
            { id: 'telefono', label: 'Teléfono', type: 'tel', placeholder: 'Número de teléfono' },
            { id: 'email', label: 'Email', type: 'email', placeholder: 'Correo electrónico' },
            { id: 'direccion', label: 'Dirección', type: 'text', placeholder: 'Dirección del cliente' }
        ]);
    });
    
    // Manejar envío del formulario
    document.getElementById('modal-form').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Datos guardados correctamente');
        closeModal();
    });
    
    // Botones de editar y eliminar en las tablas
    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const row = this.closest('tr');
            const cells = row.querySelectorAll('td');
            
            // Dependiendo de en qué tabla estemos, mostramos diferentes campos
            if (row.closest('#ventas')) {
                openModal('Editar Venta', [
                    { id: 'fecha', label: 'Fecha', type: 'date', value: cells[1].textContent },
                    { id: 'cliente', label: 'Cliente', type: 'text', value: cells[2].textContent },
                    { id: 'total', label: 'Total', type: 'number', value: cells[3].textContent.replace('$', '') }
                ]);
            } else if (row.closest('#compras')) {
                openModal('Editar Compra', [
                    { id: 'fecha', label: 'Fecha', type: 'date', value: cells[1].textContent },
                    { id: 'proveedor', label: 'Proveedor', type: 'text', value: cells[2].textContent },
                    { id: 'total', label: 'Total', type: 'number', value: cells[3].textContent.replace('$', '') }
                ]);
            } else if (row.closest('#productos')) {
                openModal('Editar Producto', [
                    { id: 'codigo', label: 'Código', type: 'text', value: cells[0].textContent },
                    { id: 'nombre', label: 'Nombre', type: 'text', value: cells[1].textContent },
                    { id: 'categoria', label: 'Categoría', type: 'text', value: cells[2].textContent },
                    { id: 'precio', label: 'Precio', type: 'number', value: cells[3].textContent.replace('$', '') },
                    { id: 'existencia', label: 'Existencia', type: 'number', value: cells[4].textContent }
                ]);
            } else if (row.closest('#proveedores')) {
                openModal('Editar Proveedor', [
                    { id: 'id', label: 'ID', type: 'text', value: cells[0].textContent },
                    { id: 'nombre', label: 'Nombre', type: 'text', value: cells[1].textContent },
                    { id: 'contacto', label: 'Contacto', type: 'text', value: cells[2].textContent },
                    { id: 'telefono', label: 'Teléfono', type: 'tel', value: cells[3].textContent }
                ]);
            } else if (row.closest('#clientes')) {
                openModal('Editar Cliente', [
                    { id: 'id', label: 'ID', type: 'text', value: cells[0].textContent },
                    { id: 'nombre', label: 'Nombre', type: 'text', value: cells[1].textContent },
                    { id: 'telefono', label: 'Teléfono', type: 'tel', value: cells[2].textContent },
                    { id: 'email', label: 'Email', type: 'email', value: cells[3].textContent }
                ]);
            }
        });
    });
    
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            if (confirm('¿Está seguro de que desea eliminar este registro?')) {
                const row = this.closest('tr');
                row.remove();
                alert('Registro eliminado correctamente');
            }
        });
    });
});