"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import Navbar from "../components/Navbar";
import Card from "../components/Card";

interface Sortie {
  id: number;
  titre: string;
  artiste: string;
  date: string;
  image: string;
}

export default function Home() {
  const [recherche, setRecherche] = useState("");
  const [tri, setTri] = useState("recent");

  const [nouveauTitre, setNouveauTitre] = useState("");
  const [nouvelArtiste, setNouvelArtiste] = useState("");
  const [nouvelleDate, setNouvelleDate] = useState("");
  const [nouvelleImage, setNouvelleImage] = useState("");

  const [sorties, setSorties] = useState<Sortie[]>([]);

  // Charger les sorties sauvegardées
  useEffect(() => {
    const sauvegardes = localStorage.getItem("mes-sorties");

    if (sauvegardes) {
      setSorties(JSON.parse(sauvegardes) as Sortie[]);
    } else {
      setSorties([
        {
          id: 1,
          titre: "Album Summer Vibes",
          artiste: "L'Artiste Mystère",
          date: "12 Juin 2024",
          image: "/images/summer-vibes.jpg",
        },
        {
          id: 2,
          titre: "Single Midnight",
          artiste: "DJ Techno",
          date: "20 Juin 2024",
          image: "/images/midnight.jpg",
        },
        {
          id: 3,
          titre: "EP Retro Wave",
          artiste: "Synth Boy",
          date: "05 Juillet 2024",
          image: "/images/retro-wave.jpg",
        },
      ]);
    }
  }, []);

  // Sauvegarder les sorties
  useEffect(() => {
    localStorage.setItem("mes-sorties", JSON.stringify(sorties));
  }, [sorties]);

  // Ajouter une sortie
  const ajouterSortie = () => {
    // Vérification des champs obligatoires
    if (!nouveauTitre.trim()) {
      toast.error("Veuillez entrer un titre.");
      return;
    }

    if (!nouvelArtiste.trim()) {
      toast.error("Veuillez entrer le nom de l'artiste.");
      return;
    }

    if (!nouvelleDate.trim()) {
      toast.error("Veuillez entrer une date.");
      return;
    }

    const nouvelleSortie: Sortie = {
      id: Date.now(),
      titre: nouveauTitre.trim(),
      artiste: nouvelArtiste.trim(),
      date: nouvelleDate.trim(),
      image: nouvelleImage.trim() || "/images/default-cover.jpg",
    };

    setSorties((ancienneListe) => [
      nouvelleSortie,
      ...ancienneListe,
    ]);

    // Réinitialiser le formulaire
    setNouveauTitre("");
    setNouvelArtiste("");
    setNouvelleDate("");
    setNouvelleImage("");

    // Message de succès
    toast.success("Sortie ajoutée avec succès !");
  };

  // Supprimer une sortie
  const supprimerSortie = (id: number) => {
    const confirmation = window.confirm(
      "Voulez-vous vraiment supprimer cette sortie ?"
    );

    if (confirmation) {
      setSorties((ancienneListe) =>
        ancienneListe.filter((sortie) => sortie.id !== id)
      );

      toast.success("Sortie supprimée.");
    }
  };

  // Recherche + tri
  const sortiesAffichees = sorties
    .filter((sortie) =>
      sortie.titre
        .toLowerCase()
        .includes(recherche.toLowerCase())
    )
    .sort((a, b) => {
      if (tri === "alphabetique") {
        return a.titre.localeCompare(b.titre);
      }

      return b.id - a.id;
    });

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      {/* Système de notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#18181b",
            color: "#fff",
            border: "1px solid #27272a",
          },
        }}
      />

      <div className="mx-auto max-w-6xl px-6 py-10">
        {/* Titre */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold">
            Mes sorties
          </h1>

          <p className="mt-2 text-zinc-400">
            Retrouve toutes tes sorties musicales.
          </p>
        </div>

        {/* Recherche */}
        <input
          type="text"
          placeholder="Rechercher une sortie..."
          value={recherche}
          onChange={(e) => setRecherche(e.target.value)}
          className="mb-4 w-full rounded-lg bg-zinc-900 p-3 text-white outline-none placeholder:text-zinc-500"
        />

        {/* Tri */}
        <select
          value={tri}
          onChange={(e) => setTri(e.target.value)}
          className="mb-8 rounded-lg bg-zinc-900 p-3 text-white"
        >
          <option value="recent">
            Plus récentes
          </option>

          <option value="alphabetique">
            Ordre alphabétique
          </option>
        </select>

        {/* Formulaire d'ajout */}
        <div className="mb-10 rounded-xl bg-zinc-900 p-6">
          <h2 className="mb-5 text-2xl font-bold">
            Ajouter une sortie
          </h2>

          <div className="grid gap-4 md:grid-cols-2">
            <input
              type="text"
              placeholder="Titre"
              value={nouveauTitre}
              onChange={(e) =>
                setNouveauTitre(e.target.value)
              }
              className="rounded-lg bg-zinc-800 p-3 text-white outline-none placeholder:text-zinc-500"
            />

            <input
              type="text"
              placeholder="Artiste"
              value={nouvelArtiste}
              onChange={(e) =>
                setNouvelArtiste(e.target.value)
              }
              className="rounded-lg bg-zinc-800 p-3 text-white outline-none placeholder:text-zinc-500"
            />

            <input
              type="text"
              placeholder="Date"
              value={nouvelleDate}
              onChange={(e) =>
                setNouvelleDate(e.target.value)
              }
              className="rounded-lg bg-zinc-800 p-3 text-white outline-none placeholder:text-zinc-500"
            />

            <input
              type="text"
              placeholder="URL de l'image"
              value={nouvelleImage}
              onChange={(e) =>
                setNouvelleImage(e.target.value)
              }
              className="rounded-lg bg-zinc-800 p-3 text-white outline-none placeholder:text-zinc-500"
            />
          </div>

          <button
            onClick={ajouterSortie}
            className="mt-5 rounded-lg bg-white px-5 py-3 font-bold text-black transition hover:bg-zinc-200"
          >
            Ajouter la sortie
          </button>
        </div>

        {/* Liste des sorties */}
        <AnimatePresence mode="popLayout">
          <div className="grid gap-6 md:grid-cols-3">
            {sortiesAffichees.map((sortie) => (
              <Card
                key={sortie.id}
                id={sortie.id}
                titre={sortie.titre}
                artiste={sortie.artiste}
                date={sortie.date}
                image={sortie.image}
                onDelete={supprimerSortie}
              />
            ))}
          </div>
        </AnimatePresence>

        {/* Message si aucun résultat */}
        <AnimatePresence>
          {sortiesAffichees.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900 p-10 text-center shadow-lg"
            >
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-zinc-800">
                <span className="text-3xl">
                  🎵
                </span>
              </div>

              <h2 className="text-2xl font-bold">
                Aucune sortie trouvée
              </h2>

              <p className="mx-auto mt-3 max-w-md text-zinc-400">
                {recherche
                  ? `Aucune sortie ne correspond à « ${recherche} ».`
                  : "Tu n'as encore aucune sortie à afficher."}
              </p>

              {recherche && (
                <button
                  onClick={() => setRecherche("")}
                  className="mt-6 rounded-lg bg-white px-5 py-3 font-bold text-black transition hover:bg-zinc-200"
                >
                  Effacer la recherche
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}