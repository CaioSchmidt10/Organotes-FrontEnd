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
} from 'lucide-react';

function Notes() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen((prev) => !prev);

  const [darkMode, setDarkMode] = useState(false);

  const [title, setTitle] = useState('Título');
  const [isEditingTitle, setIsEditingTitle] = useState(false);

  const [note, setNote] = useState('Anote aqui...');
  const [isEditingNote, setIsEditingNote] = useState(false);

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
                  className={`transition-transform duration-300 ${
                    isOpen ? 'rotate-90' : ''
                  }`}
                />
                <NotebookPen />
                <h1 className="text-2xl">Notas</h1>
              </button>

              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  isOpen ? 'max-h-40 opacity-100 mt-2' : 'max-h-0 opacity-0'
                } bg-[#2d2f45] rounded-xl px-4`}
              >
                <div className="py-4">
                  {/* Conteúdo adicional */}
                  <p>Conteúdo adicional do calendário.</p>
                </div>
              </div>
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
                onClick={() => console.log('Adicionar Evento clicado')}
                className="flex items-center gap-3 bg-[#434561] py-2 px-3 rounded-lg transition-all duration-300 hover:bg-[#5a5c7a] hover:shadow-md cursor-pointer"
              >
                <span className="text-white">Adicionar Notas</span>
                <Plus className="bg-white text-[#434561] rounded-full w-5 h-5 p-1" />
              </button>
            </div>
          </div>

          <div className="flex flex-col border border-[#DADCE0] px-10 pt-9 h-full rounded space-y-2">
            {/* TÍTULO */}
            {isEditingTitle ? (
              <input
                className="text-3xl font-semibold outline-none border-b border-gray-300 focus:border-black"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onBlur={() => setIsEditingTitle(false)}
                autoFocus
              />
            ) : (
              <span
                className="text-3xl font-semibold cursor-pointer"
                onClick={() => setIsEditingTitle(true)}
              >
                {title}
              </span>
            )}

            {/* ANOTAÇÃO COM PLACEHOLDER */}
            {isEditingNote || note ? (
              <textarea
                className="text-black outline-none border-b border-gray-300 focus:border-black resize-none"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                onBlur={() => setIsEditingNote(false)}
                placeholder="Anote aqui..."
                autoFocus
              />
            ) : (
              <span
                className="text-[#B1B1B1] cursor-pointer"
                onClick={() => setIsEditingNote(true)}
              >
                Anote aqui...
              </span>
            )}
          </div>
        </div>
      </main>
    </>
  );
}

export default Notes;
