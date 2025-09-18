import { TrashIcon, PencilIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

export default function TodoItem({ tarea, toggleCompleted, eliminarTarea, editarTarea }) { // Props desde List.jsx
  // Estados
  const [editando, setEditando] = useState(false);
  const [titulo, setTitulo] = useState(tarea.titulo);
  const [descripcion, setDescripcion] = useState(tarea.descripcion);
  const [prioridad, setPrioridad] = useState(tarea.prioridad);
  const [estado, setEstado] = useState(tarea.estado);

    // Guardamos cambios
  const guardarEdicion = () => {
    editarTarea(tarea.id, { titulo, descripcion, prioridad, estado });
    setEditando(false);
  };

  // Render
  return (
    <div className="border p-3 rounded shadow-sm bg-gray-50">
      {editando ? (
        // Modo edición
        <div className="space-y-2">
          <input // Título de la tarea
            className="w-full p-2 border rounded"
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />

          <textarea // Descripción de la tarea
            className="w-full p-2 border rounded"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />

          <select // Prioridad de la tarea
            className="w-full p-2 border rounded"
            value={prioridad}
            onChange={(e) => setPrioridad(e.target.value)}
          >
            <option value="alta">Alta</option>
            <option value="media">Media</option>
            <option value="baja">Baja</option>
          </select>

          <select // Estado de la tarea
            className="w-full p-2 border"
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
          >
            <option value="pendiente">Pendiente</option>
            <option value="en progreso">En Progreso</option>
            <option value="completado">Completado</option>
          </select>

          <div className="flex justify-end gap-2">
            <button // Botón para guardar cambios
              className="bg-green-500 text-white px-3 py-1 rounded-full"
              onClick={guardarEdicion}
            >
              Guardar
            </button>
            <button // Botón para cancelar edición
              className="bg-red-400 text-white px-3 py-1 rounded-full"
              onClick={() => setEditando(false)}
            >
              Cancelar
            </button>
          </div>
        </div>
      ) : (
        // Modo visualización
        <>
          <div className="flex items-center justify-between">
            <h3
              className={`font-bold ${
                tarea.completed ? "line-through text-gray-400" : ""
              }`}
            >
              {tarea.titulo}
            </h3>

            <div className="flex items-center gap-3">
              {/* Checkbox para marcar completada */}
              <input
                className="w-4 h-4"
                type="checkbox"
                checked={tarea.completed}
                onChange={() => toggleCompleted(tarea.id)}
              />

              {/* Botón editar */}
              <button onClick={() => setEditando(true)}>
                <PencilIcon className="w-5 h-5 text-blue-500" />
              </button>

              {/* Botón eliminar */}
              <button onClick={() => eliminarTarea(tarea.id)}>
                <TrashIcon className="w-5 h-5 text-red-500" />
              </button>
            </div>
          </div>

          {/* Descripción */}
          {tarea.descripcion && (
            <p className="text-gray-600 mt-1">{tarea.descripcion}</p>
          )}

          {/* Prioridad y estado */}
          <div className="flex justify-between mt-2 text-sm">
            <span
              className={`px-2 py-1 rounded-full text-white ${
                tarea.prioridad === "alta"
                  ? "bg-red-500"
                  : tarea.prioridad === "media"
                  ? "bg-blue-500"
                  : "bg-green-500"
              }`}
            >
              Prioridad: {tarea.prioridad}
            </span>

            <span
              className={`px-2 py-1 rounded-full ${
                tarea.estado === "pendiente"
                  ? "bg-gray-300 text-gray-700"
                  : tarea.estado === "en progreso"
                  ? "bg-blue-300 text-blue-700"
                  : "bg-green-300 text-green-700"
            
              }`}
            >
              {tarea.estado}
            </span>
          </div>
        </>
      )}
    </div>
  );
}
