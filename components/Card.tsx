"use client";

import { motion } from "framer-motion";

interface CardProps {
  id: number;
  titre: string;
  artiste: string;
  date: string;
  image: string;
  onDelete: (id: number) => void;
}

export default function Card({
  id,
  titre,
  artiste,
  date,
  image,
  onDelete,
}: CardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="overflow-hidden rounded-xl bg-zinc-900"
    >
      {/* Image de couverture */}
      <img
        src={image}
        alt={`Cover de ${titre}`}
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = "/images/default-cover.jpg";
        }}
        className="h-64 w-full object-cover"
      />

      {/* Informations */}
      <div className="p-5">
        <h3 className="text-xl font-bold">
          {titre}
        </h3>

        <p className="mt-2 text-zinc-400">
          {artiste}
        </p>

        <p className="mt-1 text-sm text-zinc-500">
          {date}
        </p>

        {/* Bouton supprimer */}
        <button
          onClick={() => onDelete(id)}
          className="mt-4 rounded-lg bg-red-600 px-4 py-2 font-bold text-white transition hover:bg-red-700"
        >
          Supprimer
        </button>
      </div>
    </motion.div>
  );
}