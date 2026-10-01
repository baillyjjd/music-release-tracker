export default function Navbar() {
  return (
    <nav className="w-full border-b border-gray-800 bg-black p-4">
      <div className="container mx-auto flex justify-between items-center">
        <span className="text-xl font-bold tracking-tighter text-white">
          DropPlanner
        </span>
        <div className="flex gap-6 text-sm text-gray-400">
          <a href="#" className="hover:text-white transition">Dashboard</a>
          <a href="#" className="hover:text-white transition">Projets</a>
          <a href="#" className="hover:text-white transition">Profil</a>
        </div>
      </div>
    </nav>
  )
}