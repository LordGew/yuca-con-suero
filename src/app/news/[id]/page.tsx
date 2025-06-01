"use client";

import { getNewsById } from "@/api/news";
import NavbarAuthenticated from "@/components/navbar-authenticated";
import { NewsSectionsDto } from "@/model/NewsSections";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const NewContent: React.FC = () => {
  const { id } = useParams();
  const [news, setNews] = useState<NewsSectionsDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const data = await getNewsById(Number(id));
        setNews(data);
      } catch (err: any) {
        setError(err.message || "Error loading news");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchNews();
    }
  }, [id]);

  if (loading)
    return (
      <div className="animate-pulse space-y-6 px-4 py-6">
        <div className="h-12 bg-zinc-700 rounded w-1/3"></div>
        <div className="h-[200px] md:h-[300px] bg-zinc-800 rounded"></div>
        <div className="space-y-4">
          <div className="h-4 bg-zinc-700 rounded w-2/3"></div>
          <div className="h-4 bg-zinc-700 rounded w-full"></div>
          <div className="h-4 bg-zinc-700 rounded w-5/6"></div>
        </div>
        <div className="h-10 bg-zinc-800 rounded w-1/4"></div>
      </div>
    );
  if (error) return <div className="text-red-400 p-4">Error: {error}</div>;
  if (!news) return <div className="text-yellow-400 p-4">Not Found</div>;

  return (
    <div>
      <div className="contenedor mb-4 md:mb-6">
        <NavbarAuthenticated />
      </div>

      <div className="bg-midnight text-white">
        {/* Banner Principal */}
        <div className="relative h-[300px] md:h-[500px] w-full overflow-hidden">
          <img
            src={news.img_url}
            alt="Banner"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent block px-4 md:px-10 pb-10 md:pb-16">
            <div className="contenedor absolute bottom-6 md:bottom-10 left-0 right-0">
              <h1 className="text-4xl md:text-8xl font-bold text-white mb-2">
                {news.title}
              </h1>
              <div className="text-xs md:text-2xl text-gray-400">
                {new Date(news.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}{" "}
                by <span className="text-yellow-400">{news.author}</span> ·{" "}
                <span>0 comment</span>
              </div>
            </div>
          </div>
        </div>
        {/* Botón volver a noticias */}

        {/* Contenido */}
        <div className="max-w-5xl mx-auto px-4 md:px-6 py-10 md:py-16 space-y-12">
          <div className="max-w-5xl mx-auto  pb-1">
            <button
              onClick={() => router.push("/news")} // Si tienes ruta específica
              className="text-sm text-yellow-400 hover:underline"
            >
              ← Volver a noticias
            </button>
          </div>
          {/* Botones sociales */}
          <div className="flex flex-wrap gap-3">
            <button className="bg-blue-600 px-4 py-1 rounded text-white text-sm">
              Share
            </button>
            <button className="bg-sky-400 px-4 py-1 rounded text-white text-sm">
              Tweet
            </button>
            <button className="bg-yellow-500 text-black font-bold px-3 py-1 rounded text-xs">
              0 COMMENT
            </button>
          </div>

          {/* Texto dinámico */}
          {news.sections.map((section) => (
            <div
              key={section.id}
              className={`flex flex-col ${
                section.img_url ? "md:flex-row" : ""
              } gap-6 md:gap-10 items-start`}
            >
              {/* Texto: se expande si no hay imagen */}
              <div
                className={`${
                  section.img_url ? "md:w-[55%]" : "w-full"
                } space-y-4`}
              >
                <h2 className="text-yellow-400 text-2xl md:text-4xl font-semibold">
                  {section.title}
                </h2>
                <p className="text-base md:text-lg text-justify">
                  {section.content}
                </p>
              </div>

              {/* Imagen: solo si existe */}
              {section.img_url && (
                <div className="md:w-[45%] w-full">
                  <div className="bg-zinc-900 rounded-lg overflow-hidden shadow-lg">
                    <img
                      src={section.img_url}
                      alt={section.title}
                      className="w-full h-full max-h-[400px] object-cover object-center rounded-md"
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewContent;
