import { Link } from 'react-router-dom';
import { useState } from 'react';
import {
  Search,
  ChevronRight,
  MessageCircleQuestion,
  SquareArrowRight,
  Settings,
  Menu,
  Plus,
  NotebookPen,
  Pencil,
  Trash,
} from 'lucide-react';

function Notes() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen((prev) => !prev);

  const [darkMode, setDarkMode] = useState(false);

  const [title, setTitle] = useState('Título');
  const [isEditingTitle, setIsEditingTitle] = useState(false);

  const [note, setNote] = useState('Anote aqui...');
  const [isEditingNote, setIsEditingNote] = useState(false);

  const [savedNotes, setSavedNotes] = useState<
    { title: string; note: string; date: string }[]
  >([]);

  const [selectedNote, setSelectedNote] = useState<null | {
    title: string;
    note: string;
    date: string;
  }>(null);

  const saveNote = () => {
    if (!title.trim()) {
      alert('Você precisa preencher um título para salvar a nota.');
      return;
    }

    const today = new Date().toLocaleDateString('pt-BR'); // ex: 26/05/2025
    const newNote = { title: title.trim(), note: note.trim(), date: today };

    setSavedNotes((prevNotes) => {
      const existingIndex = prevNotes.findIndex(
        (n) => n.title === newNote.title && n.date === newNote.date,
      );

      if (existingIndex !== -1) {
        // Atualiza a nota existente
        const updatedNotes = [...prevNotes];
        updatedNotes[existingIndex] = newNote;
        return updatedNotes;
      }

      // Cria nova nota
      return [...prevNotes, newNote];
    });

    setSelectedNote(newNote);
    setTitle('');
    setNote('');
    setIsEditingNote(false);
    setIsEditingTitle(false);
  };

  const [noteToDelete, setNoteToDelete] = useState<null | {
    title: string;
    date: string;
  }>(null);

  return (
    <>
      <main className="flex">
        {/* Menu */}
        <div
          className="flex flex-col justify-between gap-4 h-screen w-[300px] bg-cover bg-center"
          style={{
            backgroundImage: "url('/menu.png')",
          }}
        >
          <div className="flex flex-col gap-3">
            {/* Nome e Logo */}
            <div className="pt-3 flex justify-center">
              <h1 className="text-4xl text-white relative font-bold after:content-[''] after:block after:w-[68px] after:h-[2px] after:bg-white after:ml-auto">
                OrgaNotes
              </h1>
              <img src="/logo.png" alt="Logo" className="mt-2 h-8" />
            </div>
            <div className="w-full h-[1px] bg-white"></div>
            {/* Categorias */}
            <div className="px-3 mx-3 text-white bg-[#434561] flex justify-center gap-4 rounded-2xl">
              <Link to={'/Estudos'}>
                <div className="flex hover:text-[#CACCE5]  opacity-65 hover:underline transition duration-200 ease-in-out cursor-pointer px-2 py-2">
                  <h1>Estudos</h1>
                </div>
              </Link>

              <Link to={'/Calendar'}>
                <div className="flex  hover:text-[#CACCE5] opacity-65 hover:underline transition duration-200 ease-in-out cursor-pointer px-2 py-2">
                  <h1>Calendário</h1>
                </div>
              </Link>

              <Link to={'/Notes'}>
                <div className="flex hover:text-[#CACCE5] hover:underline transition duration-200 ease-in-out cursor-pointer px-2 py-2 bg-[#3B3D58] rounded-xl">
                  <h1>Notas</h1>
                </div>
              </Link>
            </div>
            <div className="w-full h-[1px] bg-white"></div>
            {/* Barra de Pesquisa */}
            <div className="px-3 py-2 mx-3 text-white bg-[#434561] flex gap-4 rounded-2xl opacity-65 items-center">
              <Search />
              <input
                type="text"
                placeholder="Pesquisar..."
                className="bg-transparent outline-none placeholder-white text-white w-full"
              />
            </div>
            <div className="w-full h-[1px] bg-white"></div>

            {/* Notas */}
            <div className="mx-3 text-white">
              <button
                onClick={toggle}
                className="px-2 flex items-center gap-2 focus:outline-none"
              >
                <ChevronRight
                  className={`transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`}
                />
                <NotebookPen />
                <h1 className="text-2xl">Notas</h1>
              </button>

              <div
                className={`transition-all duration-500 ease-in-out rounded-2xl ${
                  isOpen ? 'opacity-100 mt-2' : 'opacity-0'
                }`}
                style={{
                  maxHeight: isOpen ? '500px' : '0px',
                  overflowY: 'auto',
                  background:
                    'linear-gradient(180deg, rgba(71,72,120,0.9), rgba(122,123,194,0.7))',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  transition:
                    'max-height 0.5s ease-in-out, opacity 0.5s ease-in-out',
                }}
              >
                <div className="py-4 px-4 text-sm space-y-3">
                  {savedNotes.length === 0 ? (
                    <p className="text-gray-300 text-center">
                      Nenhuma nota salva.
                    </p>
                  ) : (
                    Object.entries(
                      savedNotes.reduce(
                        (acc, note) => {
                          if (!acc[note.date]) acc[note.date] = [];
                          acc[note.date].push(note);
                          return acc;
                        },
                        {} as Record<
                          string,
                          { title: string; note: string; date: string }[]
                        >,
                      ),
                    ).map(([date, notes], index) => (
                      <div key={index}>
                        <p className="text-xs text-gray-200 mb-1">{date}</p>
                        <ul className="space-y-1 pl-2 list-disc list-inside text-white">
                          {notes.map((noteItem, idx) => (
                            <li
                              key={idx}
                              className={`truncate cursor-pointer px-2 py-1 rounded-md transition-all duration-200 flex justify-between items-center ${
                                selectedNote?.title === noteItem.title &&
                                selectedNote?.date === noteItem.date
                                  ? 'bg-[#3b3d5c] font-semibold text-blue-300'
                                  : 'hover:text-blue-300'
                              }`}
                            >
                              <span
                                onClick={() => {
                                  setSelectedNote(noteItem);
                                  setTitle(noteItem.title);
                                  setNote(noteItem.note);
                                  setIsEditingNote(false);
                                  setIsEditingTitle(false);
                                }}
                                className="flex-1 truncate"
                              >
                                {noteItem.title}
                              </span>

                              {selectedNote?.title === noteItem.title &&
                                selectedNote?.date === noteItem.date && (
                                  <div className="flex items-center gap-2 ml-2">
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setIsEditingTitle(true);
                                      }}
                                      className="text-blue-300 hover:text-blue-400"
                                    >
                                      <Pencil size={14} />
                                    </button>
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setNoteToDelete({
                                          title: noteItem.title,
                                          date: noteItem.date,
                                        });
                                      }}
                                      className="text-red-400 hover:text-red-500"
                                    >
                                      <Trash size={14} />
                                    </button>
                                  </div>
                                )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {noteToDelete && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 px-4">
                  <div className="bg-white rounded-xl p-6 w-full max-w-sm text-center shadow-lg">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">
                      Excluir nota?
                    </h2>
                    <p className="text-sm text-gray-600 mb-6 break-words">
                      Tem certeza que deseja excluir a nota:
                      <br />
                      <span className="font-semibold text-gray-900 block mt-1 max-h-20 overflow-y-auto break-words">
                        “{noteToDelete.title}”
                      </span>
                    </p>

                    <div className="flex justify-center gap-4">
                      <button
                        onClick={() => setNoteToDelete(null)}
                        className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-800"
                      >
                        Cancelar
                      </button>
                      <button
                        onClick={() => {
                          setSavedNotes((prev) =>
                            prev.filter(
                              (n) =>
                                !(
                                  n.title === noteToDelete.title &&
                                  n.date === noteToDelete.date
                                ),
                            ),
                          );
                          setSelectedNote(null);
                          setTitle('');
                          setNote('');
                          setNoteToDelete(null);
                        }}
                        className="px-4 py-2 rounded-md bg-red-500 hover:bg-red-600 text-white"
                      >
                        Excluir
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Rodapé - Menu */}
          <div className="flex flex-col gap-2 px-5">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="bg-[#979ACB] rounded-full">
                <MessageCircleQuestion className="text-white w-5 h-5" />
              </div>
              <span className="text-white transition-all duration-300 group-hover:underline group-hover:text-[#CACCE5]">
                Suporte
              </span>
            </Link>

            <Link to="/" className="flex items-center gap-2 group">
              <div className="bg-[#979ACB] rounded-xl">
                <SquareArrowRight className="text-white w-5 h-5" />
              </div>
              <span className="text-white transition-all duration-300 group-hover:underline group-hover:text-[#CACCE5]">
                Sair
              </span>
            </Link>

            <div className="w-full h-[1px] bg-white"></div>

            <div className="flex items-center gap-2 pb-4">
              <Settings className="text-[#979ACB]" />
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="flex items-center gap-2 text-white hover:text-[#CACCE5] transition duration-300"
              >
                <span className="leading-none">Modo Noturno</span>
                <div
                  className={`w-10 h-5 rounded-full relative transition-colors duration-300 flex items-center ${
                    darkMode ? 'bg-blue-500' : 'bg-[#979ACB]'
                  }`}
                >
                  <div
                    className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-transform duration-300 ${
                      darkMode ? 'translate-x-5' : 'translate-x-0.5'
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>

        <div
          className={`${darkMode ? 'bg-[#1f2130] text-white' : 'bg-white text-black'} min-h-screen w-full`}
        >
          <div className="flex flex-col gap-2 w-full px-6 pb-7">
            <div className="flex justify-between">
              <div className="flex py-4 gap-4 items-center">
                <Menu className="w-5 h-5" />

                <div className="flex items-center gap-1">
                  <NotebookPen />
                  <span className="text-2xl">Notas</span>
                </div>
              </div>

              <div className="flex gap-3 items-center">
                <button
                  onClick={() => {
                    setTitle('');
                    setNote('');
                    setSelectedNote(null);
                    setIsEditingTitle(true);
                    setIsEditingNote(true);
                  }}
                  className="flex items-center gap-3 bg-[#434561] py-2 px-3 rounded-lg transition-all duration-300 hover:bg-[#5a5c7a] hover:shadow-md cursor-pointer"
                >
                  <span className="text-white">Adicionar Notas</span>
                  <Plus className="bg-white text-[#434561] rounded-full w-5 h-5 p-1" />
                </button>
              </div>
            </div>

            <div
              className={`flex flex-col px-10 pt-9 h-full rounded space-y-2 border ${
                darkMode
                  ? 'bg-[#2f3146] border-[#555774]'
                  : 'bg-white border-[#DADCE0]'
              }`}
            >
              {/* TÍTULO */}
              {isEditingTitle ? (
                <input
                  // ...
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  onBlur={() => setIsEditingTitle(false)}
                  autoFocus
                />
              ) : (
                <span
                  className={`text-3xl font-semibold cursor-pointer ${darkMode ? 'text-white' : 'text-black'}`}
                  onClick={() => {
                    if (selectedNote) {
                      setTitle(selectedNote.title);
                      setNote(selectedNote.note);
                      setSelectedNote(null); // sair do modo "visualização"
                    } else {
                      setIsEditingTitle(true);
                    }
                  }}
                >
                  {selectedNote ? selectedNote.title : title || 'Sem título'}
                </span>
              )}

              {/* ANOTAÇÃO COM PLACEHOLDER */}
              {isEditingNote || note ? (
                <textarea
                  // ...
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  onBlur={() => setIsEditingNote(false)}
                  placeholder="Anote aqui..."
                  autoFocus
                />
              ) : (
                <span
                  className={`cursor-pointer ${darkMode ? 'text-gray-400' : 'text-[#B1B1B1]'}`}
                  onClick={() => {
                    if (selectedNote) {
                      setTitle(selectedNote.title);
                      setNote(selectedNote.note);
                      setSelectedNote(null); // volta a editar
                    } else {
                      setIsEditingNote(true);
                    }
                  }}
                >
                  {selectedNote
                    ? selectedNote.note || 'Sem conteúdo'
                    : note || 'Anote aqui...'}
                </span>
              )}
            </div>

            <button
              onClick={saveNote}
              className={`self-start mt-4 px-4 py-2 rounded-md text-white font-medium ${
                title.trim()
                  ? 'bg-[#434561] hover:bg-[#5a5c7a]'
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
              disabled={!title.trim()}
            >
              Salvar Nota
            </button>
          </div>
        </div>
      </main>
    </>
  );
}

export default Notes;
