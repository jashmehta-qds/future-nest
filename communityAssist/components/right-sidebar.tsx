import { motion } from "framer-motion";
import { Newspaper } from "lucide-react";

interface NewsItem {
  title: string;
  url: string;
  date: string;
}

interface RightSidebarProps {
  newsFeed: NewsItem[];
}

export function RightSidebar({ newsFeed }: RightSidebarProps) {
  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-white/20">
        <h2 className="text-xl font-bold text-black flex items-center gap-2">
          <Newspaper className="h-5 w-5" />
          Latest News
        </h2>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {newsFeed.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-black/60">
            <Newspaper className="h-12 w-12 mb-4" />
            <p className="text-center">No news available yet.</p>
            <p className="text-sm text-center mt-2">Enter a location to see relevant news.</p>
          </div>
        ) : (
          newsFeed.map((news, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="backdrop-blur-md bg-white/30 border border-white/20 rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow"
            >
              <a
                href={news.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block group"
              >
                <h3 className="text-sm font-semibold text-black group-hover:text-primary transition-colors">
                  {news.title}
                </h3>
                <p className="text-xs text-black/60 mt-1">{news.date}</p>
              </a>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
} 