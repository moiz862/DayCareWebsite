import { useState } from "react";
import { useListGallery } from "@workspace/api-client-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

export default function Gallery() {
  const { data: photos, isLoading } = useListGallery();
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = ["all", "activities", "outdoor", "learning", "events", "meals"];

  const filteredPhotos = photos?.filter(
    photo => activeCategory === "all" || photo.category === activeCategory
  ) || [];

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const prevPhoto = () => setLightboxIndex(i => i !== null ? (i - 1 + filteredPhotos.length) % filteredPhotos.length : null);
  const nextPhoto = () => setLightboxIndex(i => i !== null ? (i + 1) % filteredPhotos.length : null);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") prevPhoto();
    if (e.key === "ArrowRight") nextPhoto();
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-24">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-primary">Photo Gallery</h1>
          <p className="text-xl text-muted-foreground">
            A glimpse into the joyful, creative, and engaging moments at Little Stars. Click any photo to view it in full.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map(category => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              onClick={() => setActiveCategory(category)}
              className={`rounded-full capitalize px-6 ${
                activeCategory === category
                  ? 'bg-primary hover:bg-primary/90'
                  : 'text-muted-foreground border-muted-foreground/30 hover:border-primary hover:text-primary'
              }`}
            >
              {category === "all" ? "All Photos" : category}
            </Button>
          ))}
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="aspect-square rounded-2xl bg-muted animate-pulse" />
            ))}
          </div>
        ) : filteredPhotos.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">No photos in this category yet.</div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            <AnimatePresence>
              {filteredPhotos.map((photo, i) => (
                <motion.div
                  key={photo.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="group relative aspect-square rounded-2xl overflow-hidden bg-muted cursor-pointer shadow-md hover:shadow-xl"
                  onClick={() => openLightbox(i)}
                >
                  <img
                    src={photo.url}
                    alt={photo.caption}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=800&q=80';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-end justify-between p-4">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                      <ZoomIn className="w-5 h-5 text-white" />
                    </div>
                    <div className="w-full transform translate-y-4 group-hover:translate-y-0 transition-transform text-white">
                      <p className="font-bold font-serif text-base leading-tight">{photo.caption}</p>
                      <p className="text-sm text-white/70 capitalize mt-1">{photo.category}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && filteredPhotos[lightboxIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={closeLightbox}
            onKeyDown={handleKeyDown}
            tabIndex={0}
          >
            {/* Close */}
            <button
              className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
              onClick={closeLightbox}
            >
              <X className="w-8 h-8" />
            </button>

            {/* Prev */}
            <button
              className="absolute left-4 text-white/70 hover:text-white transition-colors p-3 rounded-full hover:bg-white/10"
              onClick={(e) => { e.stopPropagation(); prevPhoto(); }}
            >
              <ChevronLeft className="w-8 h-8" />
            </button>

            {/* Image */}
            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="max-w-5xl w-full max-h-[80vh] flex flex-col items-center gap-4"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={filteredPhotos[lightboxIndex].url}
                alt={filteredPhotos[lightboxIndex].caption}
                className="max-h-[70vh] max-w-full object-contain rounded-2xl shadow-2xl"
                onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=800&q=80'; }}
              />
              <div className="text-center">
                <p className="text-white font-serif text-xl font-bold">{filteredPhotos[lightboxIndex].caption}</p>
                <p className="text-white/60 capitalize mt-1">{filteredPhotos[lightboxIndex].category}</p>
              </div>
            </motion.div>

            {/* Next */}
            <button
              className="absolute right-4 text-white/70 hover:text-white transition-colors p-3 rounded-full hover:bg-white/10"
              onClick={(e) => { e.stopPropagation(); nextPhoto(); }}
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            {/* Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/50 text-sm font-medium">
              {lightboxIndex + 1} / {filteredPhotos.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
